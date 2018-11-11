/**
* Overwrite updateBaseImage()
* to load an image even if eventName is undefined
*/
define([
  'jquery'
], function($){
    'use strict';

    return function(SwatchRendererPatch) {
      $.widget('mage.SwatchRenderer', SwatchRendererPatch, {

          updateBaseImage: function (images, context, isInProductView, eventName) {
              var gallery = context.find(this.options.mediaGallerySelector).data('gallery');
              // original version:
              // if (eventName === undefined) {
              if (eventName === undefined && gallery !== undefined) {
              //end of modifivaion
                    this.processUpdateBaseImage(images, context, isInProductView, gallery);
              } else {
                    context.find(this.options.mediaGallerySelector).on('gallery:loaded', function (loadedGallery) {
                        loadedGallery = context.find(this.options.mediaGallerySelector).data('gallery');
                        this.processUpdateBaseImage(images, context, isInProductView, loadedGallery);
                    }.bind(this));
              }
          }
      });

      return $.mage.SwatchRenderer;
    };
});
