var express = require('express');
var session = require('express-session')
var router  = express.Router();

var online = [];

/* GET routes */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/playwithmolecules', function(req, res, next) {
  // TODO: create .post('/playwithmolecules') to service search fn
  res.render('playWithMolecules', { title: 'Play With Molecules' });
});

router.get('/createaccount', function(req, res, next) {
  // TODO: need something like .post('createaccount') for new account forms
  res.render('createAccount', { title: 'Create An Account' });
});

router.get('/login', function(req, res, next) {
  // TODO: .post('/login') or .post('/auth') for login credentials
  res.render('logIn', { title: 'Log In' });
});

router.get('/devsitemap', function(req, res, next) {
  res.render('devsitemap', { title: 'devsitemap' });
});


/* POST routes */
router.post('/playwithmolecules', function(req, res, next) {
  res.render('playWithMolecules', { title: 'Play With ' + req.body.search });
});

router.post('/createaccount', function(req, res, next) {
  // Do stuff!
  res.send('The site is not accepting applications at this time.')
});

router.post('/login', function(req, res, next) {
  
});

module.exports = router;
