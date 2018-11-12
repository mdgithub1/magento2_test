/**
* ---- Navbar -----
* Add class 'active' to active submenu
* if submenu has not assign 'active' class
* Default in M2: no 'active' class between top menu and second submenu
*/
define([
    "jquery"
], function ($){
      "use strict";
      $('[data-action="navigation"]').on('mouseenter mouseleave', function() {
          $(this).find('.submenu .has-active').first().addClass('active');
      });
    }
)
