var express = require('express');
var router = express.Router();

/* Dashboard */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Tables*/
router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Tables' });
});

/*Forms*/
router.get('/forms', function(req, res, next) {
  res.render('forms', { title: 'Forms' });
});

/*UI Elements*/
router.get('/panels-wells', function(req, res, next) {
  res.render('panels-wells', { title: 'Panels and Wells' });
});
router.get('/buttons', function(req, res, next) {
  res.render('buttons', { title: 'Buttons' });
});
router.get('/notifications', function(req, res, next) {
  res.render('notifications', { title: 'Notifications' });
});
router.get('/typography', function(req, res, next) {
  res.render('typography', { title: 'Typography' });
});
router.get('/icons', function(req, res, next) {
  res.render('icons', { title: 'Icons' });
});
router.get('/grid', function(req, res, next) {
  res.render('grid', { title: 'Grid' });
});



module.exports = router;
