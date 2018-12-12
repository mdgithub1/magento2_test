var config = {
    map: {
        "*": {
            calendarjs: "Michael_FinancePayment/js/calendar",
            validatejs: "Michael_FinancePayment/js/validate"
        }
    },
    shim: {
      'calendarjs': {
          deps: ['jquery']
        },
      'validatejs': {
          deps: ['jquery',
                 'mage/mage'
          ]
        }
    }
};
