var express = require('express');
var router  = express.Router();
var users   = require('../middlewares/users.js');
var multer  = require('multer');
var upload  = multer({ storage: multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/molecules/');
  },
  filename: function(req, file, cb) {
    cb(null, req.body.moleculeName + '.' + file.fieldname)
  }
}) });

function checkPermission(req) {
  if (req.session && req.session.username) {
    return(users.getUser(req.session.username).permission >= 1);
  }
  return(false);
}

/* GET requests */
router.get('/', function(req, res, next) {
  if (checkPermission(req)) {
	  res.render('portalLayout', { title: 'My Account', loggedIn: users.checkLogin(req.session) });
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
});

router.get('/uploadmolecule', function(req, res, next) {
  if (checkPermission(req)) {
    res.render('submitMolecule', { loggedIn: users.checkLogin(req.session) });
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
});

router.get('/managemysite', function(req, res, next) {
  res.render('manageMySite', { loggedIn: users.checkLogin(req.session) });
});

/* POST requests */
var moleFile = upload.fields([{ name: 'xyz', maxCount: 1 }, { name: 'pdb', maxCount: 1 }]);
router.post('/uploadmolecule', moleFile, function(req, res, next) {
	console.log(req.files);
	var usr = users.getUser(req.session.username);
	users.addMolecule({ name: req.body.moleculeName, author: usr.firstname + " " + usr.lastname })
	res.send('<script> window.alert("Submission received.\\nThank you!"); window.location = "/"; </script>');
});

module.exports = router;