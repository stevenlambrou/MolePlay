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

function homepage(req, res){
  if (checkPermission(req)) {
	  res.render('portalLayout', { title: 'My Account' });
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
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

var moleFile = upload.fields([{ name: 'xyz', maxCount: 1 }, { name: 'jmol', maxCount: 1 }]);
router.post('/uploadmolecule', moleFile, function(req, res, next) {
	console.log("uploaded molecule");
	console.log(req.files);
	res.send('<script> window.alert("Submission received!\\nThank you!"); window.location = "/"; </script>');
});

module.exports = router;