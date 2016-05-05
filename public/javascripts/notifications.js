require.config({
	paths: {
		'jquery': '/lib/jquery/dist/jquery',
    'bootstrap': '/lib/bootstrap/dist/js/bootstrap'
	},
	shim: {
		'jquery'    : { exports: '$' },
    'bootstrap' : { deps: ['jquery'], exports: 'bootstrap'}
	}
});

require(['jquery', 'bootstrap'],
function($, bootstrap){


});
