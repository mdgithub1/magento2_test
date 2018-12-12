require([
    "jquery"
    ], function($){
        "usestrict";

          $('#paymentmethod_addDob').datepicker({
              showsTime: false,
              hideIfNoPrevNext: false,
              buttonText: "Select Date",
              dateFormat:'dd/mm/yy',
              changeYear: true,
              changeMonth: true,
              yearRange: "-100:+0",
              showAnim: "slideDown"
          });
        }
    );
