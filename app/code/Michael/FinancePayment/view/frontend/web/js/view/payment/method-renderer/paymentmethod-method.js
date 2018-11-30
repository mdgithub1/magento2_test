/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'Magento_Checkout/js/view/payment/default'
    ],
    function(Component) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Michael_FinancePayment/payment/paymentmethod'
            },

            /** Returns send check to info */
            getMailingAddress: function() {

                return window.checkoutConfig.payment.checkmo.mailingAddress;
            },

        });
    }
);
