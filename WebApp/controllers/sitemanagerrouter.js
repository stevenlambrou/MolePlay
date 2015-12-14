var express = require('express');
var router  = express.Router();
var users   = require('../middlewares/users.js');

function checkPermission(req) {
  if (req.session && req.session.username) {
    return(users.getUser(req.session.username).permission >= 3);
  }
  return(false);
}

function homepage(req, res, next) {
  if (checkPermission(req)) {
    res.render('manageMySite');
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
}

/* GET routes */
router.get('/', homepage);

router.get('/playwithmolecules', function(req, res, next) {
  res.render('playWithMolecules');
});

router.get('/createPlaylist', function(req, res, next) {
  res.render('createPlaylist');
});

module.exports = router;
