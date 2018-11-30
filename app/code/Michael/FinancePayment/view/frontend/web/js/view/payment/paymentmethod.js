/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'paymentmethod',
                component: 'Michael_FinancePayment/js/view/payment/method-renderer/paymentmethod-method'
            }
        );

        return Component.extend({});
    }
);
