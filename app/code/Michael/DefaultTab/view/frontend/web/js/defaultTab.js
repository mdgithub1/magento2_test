/**
* ---- Product View -----
* Changes the default TAB to required one
*
*/
define([
    "jquery"
], function ($){
      "use strict";

      // --- CONFIG: Label and Content IDs of the tab to make active
      var $labeTabID = 'tab-label-relatedproducts';
      var $contentTabID = 'relatedproducts';
      
      //default Magento active element
      var $current = 'div[class="data item title active"]'
      // --- end config

      // elements for JQ based on IDs
      var $label = '[id="' + $labeTabID + '"]';
      var $content = '[id="' + $contentTabID + '"]';


      if ($($label).length && $($content.length)) {
        _makeActive($label, $content, $current);
      } else {
        console.log('Not related products');
      }

      function _makeActive(label, content, current){
      // Manipulate attributes and classes in Tabs section

        $(current).next('div').attr({
            "aria-hidden": "true",
            "style": "display:none"
        });

        $(current).first().removeClass('active');
        $(current).first().attr({
            "aria-selected": "false",
            "aria-expanded": "false"
        });

        $(label).addClass('active').attr({
            "aria-selected": "true",
            "aria-expanded": "true"
            //"style": "display:block"
        });

        $(content).addClass('active').attr({
            "aria-hidden": "false",
            "style": "display:block"
        });
      }
    }
)
