require.config({
	paths: {
		'jquery': '/lib/jquery/dist/jquery',
		'datatables.net':'/lib/datatables.net/js/jquery.dataTables',
		'datatables':'/lib/datatables.net-bs/js/dataTables.bootstrap',
		'bootstrap': '/lib/bootstrap/dist/js/bootstrap'
	},
	shim: {
		'jquery'  : { exports: '$' },
		'datatables'  : {
			deps: ['jquery','datatables.net'],
			exports: 'datatables'
		},
		'bootstrap'			:{
			deps: ['jquery'],
			exports: 'bootstrap'
		}
	}
});

require(['jquery','datatables','bootstrap'],
		function($, datatables, bootstrap){

      $('#dataTables-example').DataTable({
              responsive: true
      });

});
