var express = require('express');
var router  = express.Router();
var multer  = require('multer');
var users   = require('../middlewares/users.js');

function checkPermission(req) {
  if (req.session && req.session.username) {
    return(users.getUser(req.session.username).permission >= 1);
  }
  return(false);
}

function homepage(req, res){
  if (checkPermission(req)) {
	  res.render('portalLayout', { title: 'My Account' });
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
}

function uploadMolecule(req, res){
	console.log("uploaded molecule");
	console.log(req.files);
	res.send('<script> window.alert("woo"); window.location = "/"; </script>');
}

/* GET home page. */
router.get('/', homepage);

router.get('/uploadmolecule', function(req, res, next) {
  if (checkPermission(req)) {
    res.render('submitMolecule');
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
})

router.post('/uploadmolecule', uploadMolecule);

module.exports = router;