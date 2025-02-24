<?php

use Mpdf\Tag\Em;

/**
 * Address Controller is used for handling addresses
 *  
 * @package YoCoach
 * @author Fatbit Team
 */
class BillingsController extends DashboardController
{

    /**
     * Initialize 
     * 
     * @param string $action
     */
    public function __construct(string $action)
    {
        if (!User::offlineSessionsEnabled()) {
            FatUtility::dieJsonError(Label::getLabel('MSG_MODULE_NOT_ENABLED'));
        }

        \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
        parent::__construct($action);
        $this->_template->addCss(['css/lc_switch.css']);
    }

    function getDomainUrl()
    {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        return $protocol . $domainName;
    }

    public function setBillings()
    {
        $userId = $this->siteUserId;
        $user = User::getAttributesById($userId, ['user_id', 'user_email', 'user_username', 'user_membership_level', 'auto_renew', 'membership_expiry']);

        if (!$user) {
            FatUtility::dieJsonError(Label::getLabel('MSG_USER_NOT_FOUND'));
        }

        $billingPlans = BillingPlan::getAllPlans();

        // Pass data to view
        $this->set("user", $user);
        $this->set("plans", $billingPlans);

        $this->_template->render(false, false);
    }

    function setAutoRenew()
    {
        $userEmail = FatApp::getPostedData('userEmail', FatUtility::VAR_STRING, '');
        $membershipLevel = FatApp::getPostedData('membershipLevel', FatUtility::VAR_INT, 0);
        $autoRenew = FatApp::getPostedData('autoRenew', FatUtility::VAR_INT, 0);
        $user = User::getByEmail($userEmail);
        $subscriptionId = $user['subscription_id'] ?? '';
        // echo !$autoRenew; exit;

        try {
            $subscription = \Stripe\Subscription::update(
                $subscriptionId,
                [
                    'cancel_at_period_end' => !$autoRenew,
                    'metadata' => [
                        'membership_level' => $membershipLevel,
                        'customer_email' => $userEmail,
                        'autoRenew' => $autoRenew,
                        'actionType' => 'setAutoRenew',
                    ]
                ],
            );
            echo 'Subscription updated successfully.';
            exit;
        } catch (\Exception $e) {
            // Handle error appropriately
            error_log('Error updating subscription: ' . $e->getMessage());
        }
    }

    function handleMembership()
    {
        $userEmail = FatApp::getPostedData('userEmail', FatUtility::VAR_STRING, '');
        $membershipLevel = FatApp::getPostedData('membershipLevel', FatUtility::VAR_INT, 0);
        $autoRenew = FatApp::getPostedData('autoRenew');
        $actionType = FatApp::getPostedData('actionType');

        $user = User::getByEmail($userEmail);

        if ($actionType == 'cancel') {
            $subscriptionId = $user['subscription_id'] ?? '';
            try {
                $subscription = \Stripe\Subscription::retrieve($subscriptionId);
                $canceledSubscription = $subscription->cancel();

                $_SESSION['after_subscription'] = "true";
                $_SESSION['confirm_msg'] = "Subscription canceled successfully. Status: " . $canceledSubscription->status;
                $url = MyUtility::makeUrl('Account', 'profileInfo');
                FatApp::redirectUser($url);
                exit;
            } catch (Exception $e) {
                echo 'Error cancelling subscription: ' . $e->getMessage();
                exit;
            }
        }

        if ($actionType == 'upgrade' || $actionType == 'downgrade') {
            $new_plan_id = $this->getPriceIdForMembershipLevel($membershipLevel);
            $subscriptionId = $user['subscription_id'] ?? '';
            $subscription = \Stripe\Subscription::retrieve($subscriptionId);
            try {
                $updatedSubscription = \Stripe\Subscription::update(
                    $subscriptionId,
                    [
                        'items' => [
                            [
                                'id' => $subscription->items->data[0]->id,
                                'plan' => $new_plan_id,
                            ],
                        ],
                        'cancel_at_period_end' => !$autoRenew,
                        'metadata' => [
                            'customer_email' => $userEmail,
                            'actionType' => $actionType,
                            'membership_level' => $membershipLevel,
                            'autoRenew' => $autoRenew,
                        ]
                    ]
                );

                $txt = $actionType == 'upgrade' ? 'up' : 'down';
                $_SESSION['after_subscription'] = "true";
                $_SESSION['confirm_msg'] = "Your membership has been " . $txt . "graded successfully.";
                $url = MyUtility::makeUrl('Account', 'profileInfo');
                FatApp::redirectUser($url);

                exit;
            } catch (Exception $e) {
                echo 'Error cancelling subscription: ' . $e->getMessage();
                exit;
            }
        }

        if ($actionType == 'create') {
            if (!$user) {
                FatUtility::dieJsonError(Label::getLabel('MSG_USER_NOT_FOUND'));
            }

            $price_id = $this->getPriceIdForMembershipLevel($membershipLevel);
            if (!$price_id) {
                FatUtility::dieJsonError(Label::getLabel('MSG_INVALID_MEMBERSHIP_LEVEL'));
            }

            try {
                // Create checkout session
                $checkoutSession = \Stripe\Checkout\Session::create([
                    'payment_method_types' => ['card'],
                    'customer_email' => $user['user_email'],
                    'line_items' => [[
                        'price' => $price_id,
                        'quantity' => 1,
                    ]],
                    'mode' => 'subscription',
                    'success_url' => $this->getDomainUrl() . MyUtility::makeUrl('Billings', 'handlePaymentSuccess'),
                    'cancel_url' => $this->getDomainUrl() . MyUtility::makeUrl('Billings', 'handlePaymentCancel'),
                    'metadata' => [
                        'membership_level' => $membershipLevel,
                        'autoRenew' => $autoRenew,
                        'actionType' => 'create',
                        'customer_email' => $userEmail,
                    ],
                ]);

                // Log the action in the database
                $this->logMembershipAction($user['user_id'], "Purchased Level {$membershipLevel} Membership");

                // Return the checkout session ID to proceed with payment
                $url = $checkoutSession->url;
                FatApp::redirectUser($url);
            } catch (Exception $e) {
                echo 'Error: ' . $e->getMessage();
                exit;
            }
        }
    }

    function handlePaymentSuccess()
    {
        $_SESSION['after_subscription'] = "true";
        $_SESSION['confirm_msg'] = "Thank you for your purchase! Your membership has been upgraded successfully.";
        $url = MyUtility::makeUrl('Account', 'profileInfo');
        FatApp::redirectUser($url);
    }

    function handlePaymentCancel()
    {
        $_SESSION['after_subscription'] = "true";
        $_SESSION['confirm_msg'] = "Your membership has been cancelled.";
        $url = MyUtility::makeUrl('Account', 'profileInfo');
        FatApp::redirectUser($url);
    }

    function getPriceIdForMembershipLevel($level)
    {
        // Map membership level to Stripe price IDs
        $billingPlans = BillingPlan::getAllPlans();
        $prices = [];
        foreach ($billingPlans as $key => $billing) {
            $prices[$key + 1] = $billing['price_id'];
        }
        return $prices[$level] ?? null;
    }

    function logMembershipAction($userId, $action)
    {
        // Insert log into the membership_logs table
        $query = "INSERT INTO membership_logs (user_id, action, timestamp) VALUES (?, ?, NOW())";
    }
}
