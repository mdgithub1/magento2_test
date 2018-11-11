var config = {
    map: {
        '*': {
            loaderPatch: 'Michael_SwatchPatch/js/loaderPatch',
        }
    },
    'config':{
        'mixins': {
            'Magento_Swatches/js/swatch-renderer': {
                'Michael_SwatchPatch/js/swatch-renderer-patch':true
            }
        }
    }
};
