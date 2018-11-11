/**
* ---- Product View -----
* Force the click event on the first swatch (colour)
* to load the first available images.
* Default in M2: is placeholder
*/
define([
    "jquery",
    "domReady!"
], function ($){
      "use strict";

      $('[data-role="swatch-options"]').on('swatch.initialized', function () {
          var $id = $(this).find('.swatch-attribute.color .swatch-option').first().attr('id');

          if ($id.length >= 1) {
              $(this).find('.swatch-attribute.color .swatch-option').first().trigger('click');
          } else {
              console.log('loaderPatch: No input data.');
          }
        });
    }
)
