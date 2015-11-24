var express = require('express');
var router  = express.Router();

/* GET users listing. */
// TODO: all functions defined here require login/session
router.get('/', function(req, res, next) {
  res.render('myAccount', { title: 'My Account' });
});

router.get('/applyforsitemanager', function(req, res, next) {
  res.render('applyForSiteManager', { title: 'Apply For Site Manager Position' });
});

router.get('/submitmolecule', function(req, res, next) {
  // TODO: requires login/session
  res.render('submitMolecule', { title: 'Submit A Molecule' });
});

router.get('/managemysite', function(req, res, next) {
  // TODO: only for Local Delegates and up - check login/session first
  res.render('manageMySite', { title: 'Manage My Site' });
});

router.get('/createplaylist', function(req, res, next) {
  // TODO: only for Local Delegates and up - check login/session
  res.render('createPlaylist', { title: 'Create Playlist' });
});

router.get('/editplaylist', function(req, res, next) {
  // TODO: same permissions as createplaylist
  res.render('editPlaylist', { title: 'Edit Playlist' });
});

router.get('/adminportal', function(req, res, next) {
  // TODO: only for Global Admin - check login/session
  res.render('adminPortal', { title: 'Admin Portal' });
});

router.get('/moleculesubmissions', function(req, res, next) {
  res.render('moleculeSubmissions', { title: 'Molecule Submissions' });
});

router.get('/reviewsitemanagerapplications', function(req, res, next) {
  res.render('reviewSiteManagerApplications', { title: 'Review Site Manager Site Applications'});
});

module.exports = router;
