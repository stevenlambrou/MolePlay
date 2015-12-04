var express = require('express');
var session = require('express-session');
var router  = express.Router();
var app     = express();

var sesh;
var users = [];

function checkLoginStatus(req) {
  sesh = req.session;
  var loginStatus = false;
  if (sesh.username) {
    loginStatus = (sesh.password === users[sesh.username]);
  }
  return loginStatus;
}

/* GET routes */
router.get('/', function(req, res, next) {
  var loginStatus = checkLoginStatus(req);
  res.render('index', { title: 'Index', currentpage: '/index', loggedIn: loginStatus });
});

router.get('/playwithmolecules', function(req, res, next) {
  var loginStatus = checkLoginStatus(req);
  res.render('playWithMolecules', { title: 'Play With Molecules', currentpage: '/playwithmolecules', loggedIn: loginStatus });
});

router.get('/createaccount', function(req, res, next) {
  var loginStatus = checkLoginStatus(req);
  res.render('createAccount', { title: 'Create An Account', currentpage: '/createaccount', loggedIn: loginStatus });
});

router.get('/login', function(req, res, next) {
  sesh = req.session;
  if (sesh.username && sesh.password === users[sesh.username]) {
    //session.store.destroy(req.sessionID);
    req.session.destroy(); // TODO: needs err callback
    req.sessionStore.destroy(req.sessionID);
    res.send('<script> window.alert("You have been logged out."); \
    window.location = "/" </script>')
  } else {
  res.render('logIn', { title: 'Log In', currentpage: '/login', message: '' });
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
  sesh = req.session;
  if (req.body.password === req.body.password2) {
    sesh.username = req.body.username;
    sesh.password = req.body.password;
    users[sesh.username] = sesh.password;
    res.send('<script> window.alert("Thank you for signing up with MolePlay!"); window.location = "/"; </script>');
  } else {
    res.send('<script> window.alert("Passwords do not match!"); \
      window.history.back(); </script>');
  }
});

router.post('/login', function(req, res, next) {
  sesh = req.session;
  if (users[req.body.username] === req.body.password) {
    sesh.username = req.body.username;
    sesh.password = req.body.password;
    res.send('<script> window.alert("Welcome back to MolePlay!"); \
      window.location = "/"; </script>');
  } else {
    res.send('<script> window.alert("Username or password does not match any known user\nPlease try again"); </script>');
  }
});

module.exports = router;
