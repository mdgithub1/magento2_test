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
