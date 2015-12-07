var express = require('express');
var router  = express.Router();

function homepage(req, res, next) {
  res.render('managerLayout');
}

/* GET routes */
router.get('/', homepage);

module.exports = router;