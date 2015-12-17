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
  res.render('playWithMolecules', { loggedIn: users.checkLogin(req.session) });
});

router.get('/manageSchedule', function(req, res, next) {
  if (checkPermission(req)) {
    res.render('manageSchedule');
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
});

router.get('/viewPlaylists', function(req, res, next) {
  if (checkPermission(req)) {
    res.render('viewPlaylists', { loggedIn: users.checkLogin(req.session), playlists: JSON.stringify(users.getPlaylists()) });
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
});

router.get('/createplaylist', function(req, res, next) {
  if (checkPermission(req)) {
    res.render('createPlaylist', { loggedIn: users.checkLogin(req.session), molecules: JSON.stringify(users.getMolecules()) });
  } else {
    res.send('<script> window.alert("You do not have permission to view this page"); window.location = "/"; </script>');
  }
});

router.post('/createplaylist', function(req, res, next) {
  // Store molecules in playlist array
  var moles = JSON.parse(req.body.list);
  for (var i=0; i<moles.length; i++) {
    moles[i].time = req.body.time[i];
  }
  var playlist = { title: req.body.playlistname, molecules: moles };
  console.log(req.body);
  console.log(playlist);
  users.addPlaylist(playlist);
  res.render('createPlaylist', { loggedIn: users.checkLogin(req.session), molecules: JSON.stringify(users.getMolecules()) });
  console.log(users.getPlaylists());
});

module.exports = router;
