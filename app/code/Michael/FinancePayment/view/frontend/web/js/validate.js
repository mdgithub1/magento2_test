require([
    'jquery',
    'jquery/ui',
    'mage/mage',
    'jquery/validate'
], function($){
    "use strict"

    $("#annual-incom input").each(function(){
        $(this).bind('keyup focusout autocompletechange change',
                  function (){
                    var e = $(this).val()
                    if($.isNumeric(e) && e >= 0) {
                      console.log('Pass');
                    } else {
                      console.log('Failed');
                    }
                  });
    });

});
