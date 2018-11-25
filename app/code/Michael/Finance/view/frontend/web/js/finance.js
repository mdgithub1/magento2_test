/**
* ---- Product View / Fiance Popup window -----
*/
define([
    'jquery',
    'mage/dropdown'
], function ($) {
    'use strict';

      var options = {
            boxSelector: '.product-info-main',
            popupTriggerSelector: '[id=msrp-popup-1xxc]',
            popupSelector: '[id=popup-modal-finance]',
            popupOptions: {
                appendTo: 'body',
                dialogContentClass: 'active',
                closeOnMouseLeave: false,
                autoPosition: true,
                dialogClass: 'popup map-popup-wrapper',
                position: {
                    my: 'left top',
                    collision: 'fit none',
                    at: 'left bottom',
                    within: 'body'
                },
                shadowHinter: 'popup popup-pointer'
            }
        };

        /**
         * Create and open popup with Finance information.
         *
         * @param {DOMElement} elem - element
         * @param {Event} event - event object
         */
        function openPopup(elem) {
            var $elem = $(elem),
                $popup = $elem.find(options.popupSelector),
                $trigger = $elem.find(options.popupTriggerSelector);

            event.stopPropagation();

            options.popupOptions.position.of = $trigger;
            options.popupOptions.triggerTarget = $trigger;

            if(!$popup.dropdownDialog(options.popupOptions)
                     .dropdownDialog('open')) {
                          console.log('dropdownDialog: No DOM element to display');
            }
        };

        /**
         * Set listeners.
         * @param - {String} elem -  DOM element
         */
        function initListeners(elem) {
            var $trigger = $(elem).find(options.popupTriggerSelector);

            $trigger.on('click', openPopup.bind(this, elem));
        };

    initListeners(options.boxSelector);
});
