<style>
    .current-plan {
        border-color: #047573;
        border-width: 2px;
    }
</style>

<input type="hidden" id="confirm_msg" value="<?php echo isset($_SESSION['confirm_msg']) ? $_SESSION['confirm_msg'] : ''; ?>" />

<?php
unset($_SESSION['after_subscription']);
unset($_SESSION['confirm_msg']);
?>

<div class="content-panel__head">
    <div class="d-flex align-items-center justify-content-between">
        <h5>Manage Plans & Billing</h5>
    </div>
</div>

<div class="container">
    <form id="planFrm" action="<?php echo MyUtility::makeUrl('Billings', 'handleMembership'); ?>" method="post">
        <div class="row justify-content-center g-4 p-4">
            <?php
            $user_membership_level = $user['user_membership_level'] ?? 0;
            $user_autoRenew = $user['auto_renew'] ?? 0;
            foreach ($plans as $level => $plan) {
            ?>
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="card billing-card text-left shadow-sm h-120 d-flex flex-column align-items-start
                    <?php if ($plan['plan_level'] == $user_membership_level) echo 'current-plan'; ?>">
                        <div class="mb-3" id="planLevel">
                            <h3><?php echo $plan['plan_name']; ?></h3>
                            <?php if ($plan['plan_level'] == $user['user_membership_level']) { ?>
                                <div class="current-badge">Current</div>
                            <?php } ?>
                        </div>
                        <div class="d-flex align-items-center">
                            <h1 class="mt-2 mb-4">$<?php echo $plan['plane_price']; ?></h1>
                            <div class="mt-2 ml-2"> / 30 Days</div>
                        </div>
                        <div class="auto-new d-flex align-items-center identify-renew" data-flg-level="<?php echo $plan['plan_level']; ?>">
                            <label class="mb-3 pr-3">Auto Renew</label>
                            <input type="checkbox" name="auto-renew" class="renew-switch-radio mt-2" data-current="<?php echo $plan['plan_level'] == $user_membership_level ? 'yes' : 'no'; ?>"
                                <?php if ($plan['plan_level'] == $user_membership_level && $user_autoRenew == 1) echo 'checked'; ?>>
                        </div>
                        <?php if ($plan['plan_level'] == $user_membership_level) { ?>
                            <div>
                                <div class="mt-2 expiry-date">
                                    <label>Expiry Date: </label>
                                    <div id="ex_date"><?php echo $user['membership_expiry']; ?></div>
                                </div>
                            </div>

                            <div>
                                <div class="mt-4 expiry-date">
                                    <label>Renewal Date: </label>
                                    <div id="renewal_date">
                                        <?php
                                        if ($user_autoRenew == 1) echo $user['membership_expiry'];
                                        else echo 'N/A';
                                        ?></div>
                                </div>
                            </div>
                        <?php } ?>

                        <div class="ml-6 mt-2 billing-btn-wrap">
                            <?php if ($user_membership_level == 0) { ?>
                                <button type="button" class="btn btn--bordered color-black btn--sm billing-btn" data-level="<?php echo $plan['plan_level']; ?>">Subscribe</a>
                                <?php } elseif ($user_membership_level < $plan['plan_level']) { ?>
                                <button type="button" class="btn btn--bordered color-primary btn--sm billing-upgrade" data-level="<?php echo $plan['plan_level']; ?>">Upgrade</a>
                                <?php } elseif ($user_membership_level > $plan['plan_level']) { ?>
                                <button type="button" class="btn btn--third btn--sm billing-downgrade" data-level="<?php echo $plan['plan_level']; ?>">Downgrade</a>
                                <?php } else if ($plan['plan_level'] == $user_membership_level) { ?>
                                <button type="button" class="btn btn--bordered color-white bg-primary btn-sm billing-cancel" data-level="<?php echo $plan['plan_level']; ?>">Cancel</button>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            <?php } ?>
            <input type="hidden" name="autoRenew" id="autoRenew" value="0" />
            <input type="hidden" name="membershipLevel" id="membershipLevel" value="0" />
            <input type="hidden" name="userEmail" id="userEmail" value="<?php echo $user['user_email']; ?>" />
            <input type="hidden" name="actionType" id="actionType" value="create" />
        </div>
    </form>
</div>

<script>
    $(document).ready(function() {
        var confirm_msg = $('#confirm_msg').val();
        if (confirm_msg != '') {
            fcom.success(confirm_msg);
        }

        $(".renew-switch-radio").lc_switch();

        let user_membership_level = <?php echo $user_membership_level; ?>;
        let user_autoRenew = <?php echo $user_autoRenew; ?>;

        $('input[name="auto-renew"]').on('lcs-statuschange', function(event, state) {
            current = $(this).data('current');
            userEmail = $('#userEmail').val();
            if (current == 'no') return;

            status = $(this).closest('.lcs_wrap').find('.lcs_switch').hasClass("lcs_on");

            if (status == 'true') {
                autoRenew = 0;
            } else {
                autoRenew = 1;
            }

            console.log(status, autoRenew);
            // return;
            if (confirm('Could you please confirm it?')) {
                fcom.ajax(fcom.makeUrl('Billings', 'setAutoRenew'), {
                    'autoRenew': autoRenew,
                    'userEmail': userEmail
                }, function(response) {
                    if (autoRenew == 1) {
                        $('#renewal_date').html($('#ex_date').html());
                    } else {
                        $('#renewal_date').html('N/A');
                    }
                    fcom.success('Auto renew updated successfully.');
                })
            } else {
                if (autoRenew === 1) {
                    // Switch was turned ON, turning it OFF
                    $this.lc_switch('off');
                } else {
                    // Switch was turned OFF, turning it ON
                    $this.lc_switch('on');
                }
            }
        });


        $(".billing-btn, .billing-upgrade, .billing-downgrade").click(function() {
            let level = $(this).data("level");
            status = $(this).closest('.billing-card').find('.lcs_switch').hasClass("lcs_on");

            if ($(this).hasClass('billing-upgrade')) {
                $('#actionType').val('upgrade');
            } else if ($(this).hasClass('billing-downgrade')) {
                $('#actionType').val('downgrade');
            } else if ($(this).hasClass('billing-btn')) {
                $('#actionType').val('create');
            }

            if (status == 'true') {
                autoRenew = 1;
            } else {
                autoRenew = 0;
            }
            $('#autoRenew').val(autoRenew);

            let membershipLevel = $(this).data("level");
            $('#membershipLevel').val(membershipLevel);

            // Confirm selected level and auto renew status
            let planCondition = confirm("Could you please confirm it?");
            if (planCondition) {
                $('#planFrm').submit();
            }
        });

        $(".billing-cancel").click(function() {
            $("#actionType").val("cancel");
            let level = $(this).data("level");

            // Confirm cancel current level
            let cancelCondition = confirm("Could you please confirm it?");
            if (cancelCondition) {
                $('#planFrm').submit();
            }
        })
    });
</script>