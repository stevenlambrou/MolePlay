var express = require('express');
var session = require('express-session');
var users   = require('../middlewares/users.js')
var router  = express.Router();
var app     = express();

/* GET routes */
router.get('/', function(req, res, next) {
  var loginStatus = users.checkLogin(req.session);
  res.render('index', { title: 'Index', currentpage: '/index', loggedIn: loginStatus });
});

router.get('/playwithmolecules', function(req, res, next) {
  var loginStatus = users.checkLogin(req.session);
  res.render('playWithMolecules', { title: 'Play With Molecules', currentpage: '/playwithmolecules', loggedIn: loginStatus });
});

router.get('/createaccount', function(req, res, next) {
  var loginStatus = users.checkLogin(req.session);
  res.render('createAccount', { title: 'Create An Account', currentpage: '/createaccount', loggedIn: loginStatus });
});

router.get('/login', function(req, res, next) {
  if (users.checkLogin(req.session)) {
    //session.store.destroy(req.sessionID);
    req.session.destroy(); // TODO: needs err callback
    req.sessionStore.destroy(req.sessionID);
    res.send('<script> window.alert("You have been logged out."); \
    window.location = "/" </script>')
  } else {
  res.render('logIn', { title: 'Log In', currentpage: '/login', message: '' });
  }
});

router.get('/myaccauth', function(req, res, next) {
  var permission = '';
  if (req.session.username) {
    permission = users.getUser(req.session.username).permission || '';
  }
  switch(permission) {
    case 'author':
      res.redirect('/author/');
      break;
    case 'sitemanager':
      res.redirect('/sitemanager/');
      break;
    case 'globalmanager':
      res.redirect('/globaladmin/');
      break;
    default:
      res.send('<script> window.alert("You are not logged in"); \
        window.history.back(); </script>');
  }
});

router.get('/devsitemap', function(req, res, next) {
  res.render('devsitemap', { title: 'devsitemap', currentpage: '/devsitemap' });
});


/* POST routes */
router.post('/playwithmolecules', function(req, res, next) {
  res.render('playWithMolecules', { title: 'Play With ' + req.body.search, currentpage: '/playwithmolecules' });
});

router.post('/createaccount', function(req, res, next) {
  // Do stuff!
  // res.send('<h3>The site is not accepting applications at this time.\n')
  if (req.body.password === req.body.password2) {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    var user = { permission: req.body.permission,
                  username: req.body.username,
                  email: req.body.email,
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  phone: req.body.phonenumber,
                  affiliation: req.body.affiliation,
                  password: req.body.password };
    console.log(user);
    users.addUser(user);
    res.send('<script> window.alert("Thank you for signing up with MolePlay!"); window.location = "/"; </script>');
  } else {
    res.send('<script> window.alert("Passwords do not match!"); \
      window.history.back(); </script>');
  }
});

router.post('/login', function(req, res, next) {
  if (users.getUser(req.body.username).password === req.body.password) {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    res.send('<script> window.alert("Welcome back to MolePlay!"); \
      window.location = "/"; </script>');
  } else {
    res.send('<script> window.alert("Username or password does not match any known user\\nPlease try again"); window.history.back(); </script>');
  }
});

module.exports = router;
