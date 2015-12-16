var express = require('express');
var router  = express.Router();
var users   = require('../middlewares/users.js');

function checkPermission(req) {
  if (req.session && req.session.username) {
    return(users.getUser(req.session.username).permission >= 4);
  }
  return(false);
}

function homepage(req, res, next) {
  if (checkPermission(req)) {
    res.render('adminPortal');
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
}

router.get('/reviewMolecules', function(req, res, next) {
  res.render('reviewmolecules');
});


/* GET routes */
router.get('/', homepage);

module.exports = router;
