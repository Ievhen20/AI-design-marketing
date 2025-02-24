<?php

/**
 * Membership Controller
 *  
 * @package YoCoach
 * @author Fatbit Team
 */
class MembershipController extends MyAppController
{

    /**
     * Initialize Membership
     * 
     * @param string $action
     */
    public function __construct(string $action)
    {
        \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
        parent::__construct($action);
    }

    /**
     * Render Group Classes|Packages
     */
    public function index()
    {
        $this->_template->render();
    }

    function webhook()
    {
        // echo "Membership webhook action";
        // exit;
        $db = FatApp::getDb();
        $event = \Stripe\Event::constructFrom(
            json_decode(file_get_contents('php://input'), true)
        );


        if ($event->type == 'checkout.session.completed') {
            $session = $event->data->object;
            $userEmail = $session->customer_email;
            $subscriptionId = $session->subscription;
            $expire_date = !empty($session->expires_at)?$session->expires_at: "";
            if($expire_date != ""){
                $expire_date = date("Y-m-d H:i:s", $session->expires_at);
            } else {
                $expire_date = date("Y-m-d H:i:s", strtotime("+30 days"));
            }

            $membershipLevel = $session->metadata->membership_level ?? 0;
            $autoRenew = $session->metadata->autoRenew ?? 0;
            $actionType = $session->metadata->actionType ?? '';

            $this->handleCreateOrUpdateMembershipOnDB($userEmail, $subscriptionId, $membershipLevel, $autoRenew, $actionType, $expire_date);
            $this->handleSetAutoRenew($session);
        }

        if ($event->type == 'customer.subscription.updated') {
            $session = $event->data->object;
            $actionType = $session->metadata->actionType ?? '';
            
            $expire_date = !empty($session->current_period_end)?$session->current_period_end: "";
            if($expire_date != ""){
                $expire_date = date("Y-m-d H:i:s", $session->current_period_end);
            } else {
                $expire_date = date("Y-m-d H:i:s", strtotime("+30 days"));
            }

            if ($actionType == 'setAutoRenew') {
                $this->handleAutoRenewOnDB($session);
            }

            if ($actionType == 'upgrade' || $actionType == 'downgrade') {

                $session = $event->data->object;
                $userEmail = $session->metadata->customer_email ?? '';
                $subscriptionId = $session->id;

                $membershipLevel = $session->metadata->membership_level ?? 0;
                $autoRenew = $session->metadata->autoRenew ?? 0;

                $this->handleCreateOrUpdateMembershipOnDB($userEmail, $subscriptionId, $membershipLevel, $autoRenew, $actionType, $expire_date);
            }
        }

        if ($event->type == 'customer.subscription.deleted') {
            $session = $event->data->object;
            $userEmail = $session->metadata->customer_email;
            $user = User::getByEmail($userEmail);

            $this->handleCancelSubscriptionOnDB($user);
        }
    }

    private function handleSetAutoRenew($session)
    {
        // print_r($session->metadata); 
        $autoRenew = $session->metadata->autoRenew ?? 1;
        $userEmail = $session->metadata->customer_email ?? '';

        if ($autoRenew == 0) {
            $subscriptionId = $session->subscription;
            try {
                $subscription = \Stripe\Subscription::update(
                    $subscriptionId,
                    [
                        'cancel_at_period_end' => true,
                        'metadata' => [
                            'actionType' => 'setAutoRenew',
                            'customer_email' => $userEmail,
                            'autoRenew' => $autoRenew,
                        ]
                    ],
                );
            } catch (\Exception $e) {
                // Handle error appropriately
                error_log('Error updating subscription: ' . $e->getMessage());
            }
        }
    }

    private function handleCreateOrUpdateMembershipOnDB($userEmail, $subscriptionId, $membershipLevel, $autoRenew, $actionType, $expire_date)
    {
        $db = FatApp::getDb();
        $user = User::getByEmail($userEmail);

        if ($user) {
            $userId = $user['user_id'];

            $updateSuccess = $db->updateFromArray(
                'tbl_users',
                ['subscription_id' => $subscriptionId, 'user_membership_level' => $membershipLevel, 'auto_renew' => $autoRenew, 'membership_expiry' => $expire_date],
                ['smt' => 'user_id = ?', 'vals' => [$userId]]
            );

            if ($actionType == 'create') {
                if (!$db->insertFromArray('tbl_logs', ['user_id' => $userId, 'msg' =>  date('Y-m-d H:i:s') . ' Purchased Level ' . $membershipLevel . ' Membership' . ' expiry_date: ' . $expire_date, 'updated' => date('Y-m-d H:i:s')])) {
                    $db->rollbackTransaction();
                    return false;
                }
            } else {
                $txt = $actionType == 'upgrade' ? ' Up' : ' Down';
                if (!$db->insertFromArray('tbl_logs', ['user_id' => $userId, 'msg' =>  date('Y-m-d H:i:s') . $txt . 'graded to Level ' . $membershipLevel . ' Membership, ' . ' expiry_date:: . ' . $expire_date, 'updated' => date('Y-m-d H:i:s')])) {
                    $db->rollbackTransaction();
                    return false;
                }
            }
        }

        return $updateSuccess;
    }

    private function handleAutoRenewOnDB($session)
    {
        $userEmail = $session->metadata->customer_email ?? '';
        $autoRenew = $session->metadata->autoRenew ?? 0;

        $db = FatApp::getDb();
        $user = User::getByEmail($userEmail);

        if ($user) {
            $userId = $user['user_id'];

            $updateSuccess = $db->updateFromArray(
                'tbl_users',
                ['auto_renew' => $autoRenew],
                ['smt' => 'user_id = ?', 'vals' => [$userId]]
            );

            $txt = $autoRenew == 0 ? 'disabled' : 'enabled';
            if (!$db->insertFromArray('tbl_logs', ['user_id' => $userId, 'msg' =>  date('Y-m-d H:i:s') . ' Auto-renew ' . $txt, 'updated' => date('Y-m-d H:i:s')])) {
                $db->rollbackTransaction();
                return false;
            }
        }

        return $updateSuccess;
    }


    private function handleCancelSubscriptionOnDB($user)
    {
        $db = FatApp::getDb();

        if ($user) {
            $userId = $user['user_id'];

            $updateSuccess = $db->updateFromArray(
                'tbl_users',
                ['subscription_id' => '', 'user_membership_level' => 0, 'auto_renew' => 0, 'membership_expiry' => 0],
                ['smt' => 'user_id = ?', 'vals' => [$userId]]
            );
            $db->insertFromArray('tbl_logs', ['user_id' => $userId, 'msg' => $userEmail . ' cancelled subscription ' . $user['subscription_id'], 'updated' => date('Y-m-d H:i:s')]);
        }

        return $updateSuccess;
    }
}
