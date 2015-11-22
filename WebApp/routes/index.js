var express = require('express');
var jade    = require('jade');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('devsitemap', { title: 'Navigation'});
    // res.render('index', { title: 'Index' });
});

module.exports = router;
