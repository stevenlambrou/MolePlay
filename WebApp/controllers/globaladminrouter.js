var express = require('express');
var router  = express.Router();

function homepage(req, res, next) {
  res.render('adminLayout');
}

/* GET routes */
router.get('/', homepage);

module.exports = router;