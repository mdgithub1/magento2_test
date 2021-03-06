  /**
  * ---- 3rd part js file  -----
  * Finace option calculator
  */
  define([
      'jquery',
      'mage/dropdown'
  ], function ($) {
      'use strict';

      var plcalc = {};
      var html ='';

      plcalc.rate = 0;
      plcalc.minOrder = 0;
      plcalc.maxOrder = 0;
      plcalc.maxBeforeDeposit = 0;
      plcalc.minimumDeposit = 0;
      plcalc.depositRequired = false;
      plcalc.helper = false;
      plcalc.waiting = false;
      plcalc.retailer = '';
      plcalc.repaymentsLow = '0!6!12!24';
      plcalc.repaymentsHigh = '0!6!12!24';
      plcalc.upperBandStart = 300;
      plcalc.error = '';
      plcalc.zeroInterest = true;

      // INIT
      plcalc.make_calculator = function(items, order_total, link, link_text) {
          console.log('Started');
          if (plcalc.rate === 0) {
              plcalc.getRates(plcalc.retailer, order_total);
              setTimeout(function(){
                  plcalc.make_calculator(items, order_total, link, link_text);
              },50);
          } else {
              if (parseFloat(order_total) < parseFloat(plcalc.upperBandStart)) {
                  plcalc.repayments = plcalc.repaymentsLow.split("!");
              } else {
                  plcalc.repayments = plcalc.repaymentsHigh.split("!");
              }
              plcalc.repayment1 = parseInt(plcalc.repayments[0]);
              plcalc.repayment2 = parseInt(plcalc.repayments[1]);
              plcalc.repayment3 = parseInt(plcalc.repayments[2]);
              plcalc.repayment4 = parseInt(plcalc.repayments[3]);

              plcalc.depositRequired = false;
              plcalc.origionalAmount = parseFloat(order_total);
              plcalc.currentAmount = parseFloat(order_total);
              plcalc.make(items, order_total, link, link_text);
          }
          console.log('Ended');
      };
      plcalc.draw_to_frame = function(item_cost, quantity_input, frame) {
          if (plcalc.rate === 0) {
              plcalc.getRates(plcalc.retailer, item_cost);
              setTimeout(function(){
                  plcalc.draw_to_frame(item_cost, quantity_input, frame);
              },50);

          } else {
              var nokeyup = false;
              var am = parseFloat(item_cost)*parseInt(quantity_input.val());
              if (am >= parseInt(plcalc.maxBeforeDeposit)) {
                  plcalc.depositRequired = true;
              }
              if (quantity_input === undefined ) {
                  quantity_input = {};
                  quantity_input.val = function() {return 1;};
                  nokeyup = true;
              }
              if (quantity_input.val() === '' || quantity_input.val() === '0' ) quantity_input.val(1);
              plcalc.quantity = parseInt(quantity_input.val());
              plcalc.draw_to_frame_html(item_cost, frame, quantity_input);
              if (nokeyup===false) {
                  quantity_input.keyup(function(){
                      if (quantity_input.val() === '') quantity_input.val(0);
                      plcalc.quantity = parseInt(quantity_input.val());
                      plcalc.draw_to_frame_html(item_cost, frame);
                  });
              }
          }
      };
      plcalc.draw_to_frame_html = function(item_cost, frame, quantity_input) {
          plcalc.ca = parseFloat(item_cost) * plcalc.quantity;
          if (plcalc.ca >= parseInt(plcalc.maxBeforeDeposit)) {
              plcalc.depositRequired = true;
          } else {
              plcalc.depositRequired = false;
          }
          plcalc.errorHit = false;
          var currentDate = new Date();
          var cm = parseInt(currentDate.getMonth()) + 1;
          currentDate.setMonth(cm);
          var currentMonth = parseInt(currentDate.getMonth())+1;
          if (currentMonth<10) currentMonth = "0"+currentMonth;



          if (plcalc.ca < parseFloat(plcalc.upperBandStart)) {
              plcalc.repayments = plcalc.repaymentsLow.split("!");
          } else {
              plcalc.repayments = plcalc.repaymentsHigh.split("!");
          }
          plcalc.repayment1 = parseInt(plcalc.repayments[0]);
          plcalc.repayment2 = parseInt(plcalc.repayments[1]);
          plcalc.repayment3 = parseInt(plcalc.repayments[2]);
          plcalc.repayment4 = parseInt(plcalc.repayments[3]);
          plcalc.error = '';
          if ( plcalc.ca < parseFloat(plcalc.minOrder) ) {
              plcalc.error = 'Order total is less than minimum order amount.';
              plcalc.errorHit = true;
          }
          if ( plcalc.ca > parseFloat(plcalc.maxOrder) ) {
              plcalc.error = 'Order total is more than maximum order amount.';
              plcalc.errorHit = true;
          }
          if (plcalc.errorHit === true) {
              jQuery('#payl8r_error').html(plcalc.error);
              return;
          }
          jQuery('#plcalc').remove();
          html = '';
          html += '<div id="plcalc" class="small">';
          //html += '<img src="https://payl8r.com/frontend/img/payl8r-logo.png" alt="Payl8r logo" id="payl8r_logo"/>';
          html += '<p class="payl8r-small-title">Possbile Finance Options</p>';
          if (plcalc.depositRequired === true) {
              var tbd = parseFloat(plcalc.maxBeforeDeposit);
              //html += '<p class="payl8r-large">For purchases over £'+tbd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' we require a minimum deposit of '+plcalc.minimumDeposit*100+'%</p>';
              html += '<div style="position:relative"><dl class="payl8r-box-large payl8r-dropdown" id="payl8rDepositAmount">';
                  plcalc.ca1 = plcalc.ca;
                  var p1 = plcalc.ca1 * plcalc.minimumDeposit;
                  var p2 = plcalc.ca1 * (plcalc.minimumDeposit * 2);
                  var p3 = plcalc.ca1 * (plcalc.minimumDeposit * 3);
                  var p4 = plcalc.ca1 * (plcalc.minimumDeposit * 4);
                  var p5 = plcalc.ca1 * (plcalc.minimumDeposit * 5);
                  plcalc.ca = plcalc.ca-p1;
                  html += '<dt>';
                      html += '<li><a href="#payl8rDepositAmount"><span>£'+p1.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></span></a></li>';
                  html += '</dt>';
                  html += '<dd><ul>';
                      html += '<li><a href="#payl8rDepositAmount" total="'+p1+'" deposit="1">£'+p1.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                      html += '<li><a href="#payl8rDepositAmount" total="'+p2+'" deposit="2">£'+p2.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                      html += '<li><a href="#payl8rDepositAmount" total="'+p3+'" deposit="3">£'+p3.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                      html += '<li><a href="#payl8rDepositAmount" total="'+p4+'" deposit="4">£'+p4.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                      html += '<li><a href="#payl8rDepositAmount" total="'+p5+'" deposit="5">£'+p5.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                  html += '</ul></dd>';
              html += '</dl><input type="hidden" id="payl8r_deposit_total" name="payl8r_deposit_total" value="'+p1+'"/><input type="hidden" id="payl8r_deposit" name="payl8r_deposit" value="1"/></div>';
          }
          if (plcalc.repayment1 === 0) {
              html += '<div class="payl8r-plan plan0" months="0"><h3>Pay £<span class="current-amount0">'+parseFloat(plcalc.ca).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></h3><p class="payl8r-large payl8r-white">before '+currentDate.getDate()+'/'+currentMonth+'/'+currentDate.getFullYear()+'</p><div class="payl8r-total-box"><span class="payl8r-total-repayment-0" style="">Total repayment £'+plcalc.ca.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
          } else {
              var a0 = (((plcalc.ca * plcalc.rate) * plcalc.repayment1) + plcalc.ca) / plcalc.repayment1;
              var a0t = a0.toFixed(2) * plcalc.repayment1;
              html += '<div class="payl8r-plan plan0" months="'+plcalc.repayment1+'"><h3>£<span class="current-amount'+plcalc.repayment1+'">'+a0.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment1+' months</p><div class="payl8r-total-box"><span class="payl8r-total-repayment-'+plcalc.repayment1+'" style="">Total repayment £'+a0t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
          }
          if (plcalc.zeroInterest === false) {
              var a3 = (((plcalc.ca * plcalc.rate) * plcalc.repayment2) + plcalc.ca) / plcalc.repayment2;
              var a3t = a3.toFixed(2) * plcalc.repayment2;
              var a6 = (((plcalc.ca * plcalc.rate) * plcalc.repayment3) + plcalc.ca) / plcalc.repayment3;
              var a6t = a6.toFixed(2) * plcalc.repayment3;
              var a9 = (((plcalc.ca * plcalc.rate) * plcalc.repayment4) + plcalc.ca) / plcalc.repayment4;
              var a9t = a9.toFixed(2) * plcalc.repayment4;
          } else {
              var a3 = plcalc.ca / plcalc.repayment2;
              var a3t = plcalc.ca ;
              var a6 = plcalc.ca / plcalc.repayment3;
              var a6t = plcalc.ca;
              var a9 = plcalc.ca / plcalc.repayment4;
              var a9t = plcalc.ca;
          }
          html += '<div class="payl8r-plan plan3" months="'+plcalc.repayment2+'"><h3>£<span class="current-amount'+plcalc.repayment2+'">'+a3.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment2+' months</p><div class="payl8r-total-box"><span class="payl8r-total-repayment-'+plcalc.repayment2+'" style="">Total repayment £'+a3t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
          html += '<div class="payl8r-plan plan6" months="'+plcalc.repayment3+'"><h3>£<span class="current-amount'+plcalc.repayment3+'">'+a6.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment3+' months</p><div class="payl8r-total-box"><span class="payl8r-total-repayment-'+plcalc.repayment3+'" style="">Total repayment £'+a6t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
          html += '<div class="payl8r-plan plan9" months="'+plcalc.repayment4+'"><h3>£<span class="current-amount'+plcalc.repayment4+'">'+a9.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment4+' months</p><div class="payl8r-total-box"><span class="payl8r-total-repayment-'+plcalc.repayment4+'" style="">Total repayment £'+a9t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
          html += '<p id="payl8r_error" class="payl8r-large">'+plcalc.error+'</p>';
          html += '</div>';
          frame.html(html);
          jQuery(".payl8r-dropdown dt a").click(function() {
              jQuery(".payl8r-dropdown dd ul").toggle();
          });

          jQuery(".payl8r-dropdown dd ul li a").click(function() {
              plcalc.ca = parseInt(plcalc.ca1) - parseInt(jQuery(this).attr('total'));
              var text = jQuery(this).html();
              jQuery(".payl8r-dropdown dt a span").html(text);
              jQuery(".payl8r-dropdown dd ul").hide();
              if (plcalc.zeroInterest === false) {
                  var a3 = (((plcalc.ca * plcalc.rate) * plcalc.repayment2) + plcalc.ca) / plcalc.repayment2;
                  var a3t = a3.toFixed(2) * plcalc.repayment2;
                  var a6 = (((plcalc.ca * plcalc.rate) * plcalc.repayment3) + plcalc.ca) / plcalc.repayment3;
                  var a6t = a6.toFixed(2) * plcalc.repayment3;
                  var a9 = (((plcalc.ca * plcalc.rate) * plcalc.repayment4) + plcalc.ca) / plcalc.repayment4;
                  var a9t = a9.toFixed(2) * plcalc.repayment4;
              } else {
                  var a3 = plcalc.ca / plcalc.repayment2;
                  var a3t = plcalc.ca;
                  var a6 = plcalc.ca / plcalc.repayment3;
                  var a6t = plcalc.ca;
                  var a9 = plcalc.ca / plcalc.repayment4;
                  var a9t = plcalc.ca;
              }
              if (plcalc.repayment1 === 0) {
                  jQuery('.current-amount'+plcalc.repayment1).html(plcalc.ca.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                  jQuery('.payl8r-total-repayment-'+plcalc.repayment1).html('Total repayment £'+plcalc.ca.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              } else {
                  var a0 = (((plcalc.ca * plcalc.rate) * plcalc.repayment1) + plcalc.ca) / plcalc.repayment1;
                  var a0t = a0.toFixed(2) * plcalc.repayment1;
                  jQuery('.current-amount'+plcalc.repayment1).html(a0.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                  jQuery('.payl8r-total-repayment-'+plcalc.repayment1).html('Total repayment £'+a0t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              }

              jQuery('.current-amount'+plcalc.repayment2).html(a3.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.payl8r-total-repayment-'+plcalc.repayment2).html('Total repayment £'+a3t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

              jQuery('.current-amount'+plcalc.repayment3).html(a6.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.payl8r-total-repayment-'+plcalc.repayment3).html('Total repayment £'+a6t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

              jQuery('.current-amount'+plcalc.repayment4).html(a9.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.payl8r-total-repayment-'+plcalc.repayment4).html('Total repayment £'+a9t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

              var selected = jQuery('.payl8r-plan.payl8r-selected').attr('months');
              if (plcalc.zeroInterest === false) {
                  jQuery('#payl8r_total').val('£' + jQuery('.payl8r-total-repayment-'+selected).html());
              }
              jQuery('#payl8r_payment_per_month').val('£' + jQuery('.current-amount'+selected).html());
              jQuery('#payl8r_deposit_total').val('£' + parseInt(jQuery(this).attr('total')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('#payl8r_deposit').val(jQuery(this).attr('deposit'));
              if (!jQuery('.payl8r-plan.payl8r-selected').length) selected = '0';
              if (plcalc.zeroInterest === false) {
                  jQuery('#payl8r_ttp span').html(jQuery('.payl8r-total-repayment-'+selected).html());
              }
          });

          function getSelectedValue(id) {
              return jQuery("#" + id).find("dt a span.value").html();
          }
          jQuery('.payl8r-plan').hover(function(){
              jQuery('.payl8r-plan').removeClass('payl8r-selected');
              jQuery(this).addClass('payl8r-selected');
          });
          jQuery(document).bind('click', function(e) {
              var $clicked = jQuery(e.target);
              if (! $clicked.parents().hasClass("payl8r-dropdown"))
                  jQuery(".payl8r-dropdown dd ul").hide();
          });
      };
      plcalc.make = function(items, order_total, link, link_text){
          plcalc.error = '';
          if ( parseFloat(order_total) < parseFloat(plcalc.minOrder) ) {
              plcalc.error = 'Order total is less than minimum order amount.';
          }
          if ( parseFloat(order_total) > parseFloat(plcalc.maxOrder) ) {
              plcalc.error = 'Order total is more than maximum order amount.';
          }
          if (parseInt(order_total) >= parseInt(plcalc.maxBeforeDeposit)) {
              plcalc.depositRequired = true;
          }
          if (items !== null) items = plcalc.makeItemsText(items);

          var html = plcalc.formatHtml(items, order_total, link, link_text);

          jQuery('#plcalc').remove();
          jQuery("body").append(html);

          jQuery('#payl8r_close').click(function(){
              jQuery('#plcalc').remove();
          });

          jQuery('.payl8r-plan').click(function(){

              jQuery('#payl8r_plan').val(jQuery(this).attr('months'));
              jQuery('#payl8r_payment_per_month').val('£' + jQuery('.current-amount'+jQuery(this).attr('months')).html());
              if (plcalc.zeroInterest === false) {
                  jQuery('#payl8r_total').val('£' + jQuery('.payl8r-total-repayment-'+jQuery(this).attr('months')).html());
              }
              jQuery('.payl8r-plan').removeClass('payl8r-selected');
              jQuery(this).addClass('payl8r-selected');
              jQuery('#payl8r_calc_confirm').prop('disabled', false);
              if (plcalc.zeroInterest === false) {
                  jQuery('#payl8r_ttp span').html(jQuery('.payl8r-total-repayment-'+jQuery(this).attr('months')).html());
              }
          });

          jQuery(".payl8r-dropdown dt a").click(function() {
              jQuery(".payl8r-dropdown dd ul").toggle();
          });

          jQuery(".payl8r-dropdown dd ul li a").click(function() {
              var text = jQuery(this).html();
              jQuery(".payl8r-dropdown dt a span").html(text);
              jQuery(".payl8r-dropdown dd ul").hide();
              plcalc.currentAmount = parseInt(plcalc.origionalAmount) - parseInt(jQuery(this).attr('total'));
              if (plcalc.zeroInterest === false) {
                  var a3 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment2) + plcalc.currentAmount) / plcalc.repayment2;
                  var a3t = a3.toFixed(2) * plcalc.repayment2;
                  var a6 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment3) + plcalc.currentAmount) / plcalc.repayment3;
                  var a6t = a6.toFixed(2) * plcalc.repayment3;
                  var a9 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment4) + plcalc.currentAmount) / plcalc.repayment4;
                  var a9t = a9.toFixed(2) * plcalc.repayment4;
              } else {
                  var a3 = plcalc.currentAmount / plcalc.repayment2;
                  var a3t = a3.toFixed(2) * plcalc.repayment2;
                  var a6 = plcalc.currentAmount / plcalc.repayment3;
                  var a6t = a6.toFixed(2) * plcalc.repayment3;
                  var a9 = plcalc.currentAmount / plcalc.repayment4;
                  var a9t = a9.toFixed(2) * plcalc.repayment4;
              }
              if (plcalc.repayment1 === 0 || plcalc.zeroInterest === true) {
                  jQuery('.current-amount0, .payl8r-total-repayment-0').html(plcalc.currentAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              } else {
                  var a0 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment1) + plcalc.currentAmount) / plcalc.repayment1;
                  var a0t = a0.toFixed(2) * plcalc.repayment1;
                  jQuery('.current-amount'+plcalc.repayment1).html(a0.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                  jQuery('.payl8r-total-repayment-'+plcalc.repayment1).html(a0t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              }

              jQuery('.current-amount'+plcalc.repayment2).html(a3.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.payl8r-total-repayment-'+plcalc.repayment2).html(a3t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.current-amount'+plcalc.repayment3).html(a6.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.payl8r-total-repayment-'+plcalc.repayment3).html(a6t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.current-amount'+plcalc.repayment4).html(a9.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('.payl8r-total-repayment-'+plcalc.repayment4).html(a9t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              var selected = jQuery('.payl8r-plan.payl8r-selected').attr('months');
              if (plcalc.zeroInterest === false) {
                  jQuery('#payl8r_total').val('£' + jQuery('.payl8r-total-repayment-'+selected).html());
              }
              jQuery('#payl8r_payment_per_month').val('£' + jQuery('.current-amount'+selected).html());
              jQuery('#payl8r_deposit_total').val('£' + parseInt(jQuery(this).attr('total')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
              jQuery('#payl8r_deposit').val(jQuery(this).attr('deposit'));
              if (!jQuery('.payl8r-plan.payl8r-selected').length) selected = '0';
              if (plcalc.zeroInterest === false) {
                  jQuery('#payl8r_ttp span').html(jQuery('.payl8r-total-repayment-'+selected).html());
              }
          });

          function getSelectedValue(id) {
              return jQuery("#" + id).find("dt a span.value").html();
          }

          jQuery(document).bind('click', function(e) {
              var $clicked = jQuery(e.target);
              if (! $clicked.parents().hasClass("payl8r-dropdown"))
                  jQuery(".payl8r-dropdown dd ul").hide();
          });

          jQuery('.payl8r-helper-button').click(function() {
              if (plcalc.helper === false) {
                  jQuery(this).addClass('payl8r-selected');
                  setTimeout(function(){
                      plcalc.helper = true;
                  },100);
              }
          });
          jQuery('#plcalc').click(function() {
              if (jQuery('.payl8r-helper-button').hasClass('payl8r-selected') && plcalc.helper === true)
                  jQuery('.payl8r-helper-button').removeClass('payl8r-selected');
                  plcalc.helper = false;
          });
      };

      // Format text for description
      plcalc.makeItemsText = function(items) {
          var i = 0;
          var itemstext = "";
          for (;items[i];) {
              itemstext += items[i] + "<br>";
              i++;
          }
          return itemstext;
      };

      // Format HTML for rendering
      plcalc.formatHtml = function(itemstext, order_total, link, link_text) {
          if (plcalc.zeroInterest === true) {
              plcalc.intRate = 0;
              plcalc.APR = 0;
          } else {
              plcalc.intRate = plcalc.rate * 100;
              plcalc.APR = plcalc.intRate * 12;
          }
          var html = '<div id="plcalc">';
              html += '<div id="payl8r_close"></div>';
              html += '<img src="https://payl8r.com/frontend/img/payl8r-logo.png" alt="Payl8r logo" id="payl8r_logo"/>';
              html += '<form class="payl8r-window" action="'+link+'" method="post">';
                  if (itemstext !== null) {
                      html += '<table><tr>';
                          html += '<td>Description</td>';
                          html += '<td class="payl8r-grey">'+itemstext+'</td>';
                      html += '</tr><tr>';
                          html += '<td>Order total</td>';
                          html += '<td class="payl8r-blue">£' + order_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
                      html += '</tr></table>';
                  }
                  if (plcalc.depositRequired === true) {
                      var tbd = parseFloat(plcalc.maxBeforeDeposit);
                      //html += '<p class="payl8r-large">For purchases over £'+tbd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' we require a minimum deposit of '+plcalc.minimumDeposit*100+'%</p>';
                      html += '<div style="position:relative"><dl class="payl8r-box-large payl8r-dropdown" id="payl8rDepositAmount">';
                          var p1 = order_total * plcalc.minimumDeposit;
                          var p2 = order_total * (plcalc.minimumDeposit * 2);
                          var p3 = order_total * (plcalc.minimumDeposit * 3);
                          var p4 = order_total * (plcalc.minimumDeposit * 4);
                          var p5 = order_total * (plcalc.minimumDeposit * 5);
                          plcalc.currentAmount = plcalc.currentAmount-p1;
                          html += '<dt>';
                              html += '<li><a href="#payl8rDepositAmount"><span>£'+p1.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></span></a></li>';
                          html += '</dt>';
                          html += '<dd><ul>';
                              html += '<li><a href="#payl8rDepositAmount" total="'+p1+'" deposit="1">£'+p1.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                              html += '<li><a href="#payl8rDepositAmount" total="'+p2+'" deposit="2">£'+p2.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                              html += '<li><a href="#payl8rDepositAmount" total="'+p3+'" deposit="3">£'+p3.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                              html += '<li><a href="#payl8rDepositAmount" total="'+p4+'" deposit="4">£'+p4.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                              html += '<li><a href="#payl8rDepositAmount" total="'+p5+'" deposit="5">£'+p5.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' <small>deposit</small></a></li>';
                          html += '</ul></dd>';
                          var helpertext = "For purchases over £150.00 we require a minimum deposit of 10%.  Please select an amount. The deposit will be taken from your card when you confirm the order. If your order or application does not complete the deposit will not be charged.";
                      html += '</dl><input type="hidden" id="payl8r_deposit_total" name="payl8r_deposit_total" value="'+p1+'"/><input type="hidden" id="payl8r_deposit" name="payl8r_deposit" value="1"/><div id="payl8r_deposit_helper" class="payl8r-helper-button">?<div class="payl8r-helper-text">'+helpertext+'</div></div></div>';
                  }
                  html += '<p id="payl8r_error" class="payl8r-large">'+plcalc.error+'</p>';
                  html += '<input type="hidden" value="" id="payl8r_plan" name="payl8r_plan" />';
                  html += '<input type="hidden" value="" id="payl8r_payment_per_month" name="payl8r_payment_per_month" />';
                  html += '<input type="hidden" value="" id="payl8r_total" name="payl8r_total" />';

                  html += '<div><div class="payl8r-half">';
                      var helpertextplan = 'Please select a plan that you find the most affordable. You can change the plan at anytime within the first 14 days, if you need longer to pay, just get in touch.';
                      html += '<div style="position: relative;"><p class="payl8r-large" style="margin:15px 0 20px;">Choose a plan</p><div id="payl8r_plan_helper" class="payl8r-helper-button">?<div class="payl8r-helper-text">'+helpertextplan+'</div></div></div>';
                      var currentDate = new Date();
                      var cm = parseInt(currentDate.getMonth()) + 1;
                      currentDate.setMonth(cm);
                      var currentMonth = parseInt(currentDate.getMonth())+1;
                      if (currentMonth<10) currentMonth = "0"+currentMonth;
                      if (plcalc.repayment1 === 0 || plcalc.zeroInterest === true) {
                          html += '<div class="payl8r-plan plan0" months="0"><h3>Pay £<span class="current-amount0">'+parseFloat(plcalc.currentAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></h3><p class="payl8r-large payl8r-white">before '+currentDate.getDate()+'/'+currentMonth+'/'+currentDate.getFullYear()+'</p><div class="payl8r-total-box">interest 0% (0% APR)<span class="payl8r-total-repayment-0" style="display:none;">'+plcalc.currentAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
                      } else {
                          var a0 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment1) + plcalc.currentAmount) / plcalc.repayment1;
                          var a0t = a0.toFixed(2) * plcalc.repayment1;
                          html += '<div class="payl8r-plan plan0" months="'+plcalc.repayment1+'"><h3>£<span class="current-amount'+plcalc.repayment1+'">'+a0.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment1+' months</p><div class="payl8r-total-box">interest '+plcalc.intRate+'% p.m. ('+plcalc.APR+'% APR)<span class="payl8r-total-repayment-'+plcalc.repayment1+'" style="display:none;">'+a0t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
                      }
                      if (plcalc.zeroInterest === false) {
                          var a3 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment2) + plcalc.currentAmount) / plcalc.repayment2;
                          var a3t = a3.toFixed(2) * plcalc.repayment2;
                      } else {
                          var a3 = plcalc.currentAmount / plcalc.repayment2;
                          var a3t = a3.toFixed(2) * plcalc.repayment2;
                      }
                      html += '<div class="payl8r-plan plan3" months="'+plcalc.repayment2+'"><h3>£<span class="current-amount'+plcalc.repayment2+'">'+a3.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment2+' months</p><div class="payl8r-total-box">interest '+plcalc.intRate+'% p.m. ('+plcalc.APR+'% APR)<span class="payl8r-total-repayment-'+plcalc.repayment2+'" style="display:none;">'+a3t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
                      if (plcalc.zeroInterest === false) {
                          var a6 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment3) + plcalc.currentAmount) / plcalc.repayment3;
                          var a6t = a6.toFixed(2) * plcalc.repayment3;
                      } else {
                          var a6 = plcalc.currentAmount / plcalc.repayment3;
                          var a6t = a6.toFixed(2) * plcalc.repayment3;
                      }

                      html += '<div class="payl8r-plan plan6" months="'+plcalc.repayment3+'"><h3>£<span class="current-amount'+plcalc.repayment3+'">'+a6.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment3+' months</p><div class="payl8r-total-box">interest '+plcalc.intRate+'% p.m. ('+plcalc.APR+'% APR)<span class="payl8r-total-repayment-'+plcalc.repayment3+'" style="display:none;">'+a6t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
                      if (plcalc.zeroInterest === false) {
                          var a9 = (((plcalc.currentAmount * plcalc.rate) * plcalc.repayment4) + plcalc.currentAmount) / plcalc.repayment4;
                          var a9t = a3.toFixed(2) * plcalc.repayment4;
                      } else {
                          var a9 = plcalc.currentAmount / plcalc.repayment4;
                          var a9t = a9.toFixed(2) * plcalc.repayment4;
                      }

                      html += '<div class="payl8r-plan plan9" months="'+plcalc.repayment4+'"><h3>£<span class="current-amount'+plcalc.repayment4+'">'+a9.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span> / month</h3><p class="payl8r-large payl8r-white">for '+plcalc.repayment4+' months</p><div class="payl8r-total-box">interest '+plcalc.intRate+'% p.m. ('+plcalc.APR+'% APR)<span class="payl8r-total-repayment-'+plcalc.repayment4+'" style="display:none;">'+a9t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></div></div>';
                  html += '</div>';
                  html += '<div class="payl8r-half">';
                      var helpertexttotal = 'This is the total amount that you will have pay on the plan that have you selected. You will not be charged any direct debit fees if you miss a payment.';
                      html += '<div style="position: relative;"><p class="payl8r-large payl8r-ttp" style="position: relative;">Total</p><div id="payl8r_total_helper" class="payl8r-helper-button">?<div class="payl8r-helper-text">'+helpertexttotal+'</div></div></div>';
                      html += '<h2 id="payl8r_ttp">£<span>'+plcalc.currentAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</span></h2>';
                      //html += '<p class="payl8r-grey">interest '+(plcalc.rate*100)+'% per month ('+((plcalc.rate*100)*12)+'% APR)</p>';
                      if (link_text===null) link_text = 'Continue';
                      html += '<input type="submit" value="'+link_text+'" class="payl8r-btn" id="payl8r_calc_confirm" disabled />';
                  html += '</div><div style="clear:both;"></div></div>';
              html += '</form>';
          html += '</div>';
          return html;
      };

      // Get rates from Payl8r rates API
      plcalc.getRates = function(retailer,item_cost) {
          if (retailer === '') {
              var query = "https://payl8r.com/getrates";
          } else {
              var query = "https://payl8r.com/getrates?retailer="+retailer;
          }

          if (plcalc.waiting===false) {
              plcalc.waiting = true;
              jQuery.get(query).always(function(v) {
                  v = v.split(',');
                  plcalc.rate = v[0];
                  plcalc.minOrder = v[1];
                  plcalc.maxBeforeDeposit = v[2];
                  plcalc.minimumDeposit = v[3];
                  plcalc.maxOrder = v[4];
                  if (retailer !== '' && typeof v[5] !== 'undefined' && v[5] !== '') {
                      plcalc.repaymentsHigh = v[5];
                      plcalc.repaymentsLow = v[6];
                      plcalc.upperBandStart = v[7];
                  }
                  plcalc.waiting = false;
                  if (parseFloat(item_cost) < parseFloat(plcalc.upperBandStart)) {
                      plcalc.repayments = plcalc.repaymentsLow.split("!");
                  } else {
                      plcalc.repayments = plcalc.repaymentsHigh.split("!");
                  }
                  plcalc.repayment1 = parseInt(plcalc.repayments[0]);
                  plcalc.repayment2 = parseInt(plcalc.repayments[1]);
                  plcalc.repayment3 = parseInt(plcalc.repayments[2]);
                  plcalc.repayment4 = parseInt(plcalc.repayments[3]);
              });
          }
      };

      // Listener to automatically update iframe height depending on inner content
      window.addEventListener("message", pl_iframe_heightUpdate, false);
      plcalc.prevHeight = jQuery('[name="payl8r"]').height();
      function pl_iframe_heightUpdate (event) {
          var origin = event.origin || event.originalEvent.origin;
          if (origin !== "https://payl8r.com") return;
          if (plcalc.prevHeight !== jQuery('[name="payl8r"]').height()) jQuery('[name="payl8r"]').height(event.data);
      }
      // Example of draw to frame
      $(document).ready(function () {
          plcalc.retailer = '';
          plcalc.draw_to_frame($("#example_amount").val(), $('#example_value'), $('#example_frame'));

          $(document).on("change keyup", "#example_amount", function () {
              plcalc.draw_to_frame_html($(this).val(), $("#example_frame"));
          });
      });
});
