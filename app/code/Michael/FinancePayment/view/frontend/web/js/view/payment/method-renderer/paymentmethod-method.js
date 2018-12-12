/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'Magento_Checkout/js/view/payment/default',
    ],
    function(Component) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Michael_FinancePayment/payment/paymentmethod'
            },

            initialize: function () {
                        this._super();
                        // component initialization logic
                        return this;
                    },

            /** Returns send check to info */
            getMailingAddress: function() {

                return window.checkoutConfig.payment.checkmo.mailingAddress;
            },

            /**
            * Get value of instruction field.
            * @returns {String}
            */
            getInstructions: function () {

                return window.checkoutConfig.payment.instructions[this.item.method];
            },


            /**
            * Get additional data from the payment on finance
            *
            * @returns {Array}
            */
            getData: function () {
                // JQMigrate problem in Safari
                var $ = jQuery.noConflict();

                return {
                  'method': this.item.method,
                  'additional_data': {
                    'addDob': $('#paymentmethod_addDob').val(),
                    'incom': $('#paymentmethod_incom').val()
                  }
                };
            },

        });
    }
);
