var config = {
    map: {
        '*': {
            finance: 'Michael_Finance/js/finance',
            dropdownDialog: "mage/dropdown",
            calculator: 'Michael_Finance/js/pl-calculator',
        }
    },
    shim: {
      'finance': {
          deps: ['jquery']
        },
       'calculator': {
          deps: ['jquery']
       }
    }
};
