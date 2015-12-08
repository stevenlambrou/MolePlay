var express = require('express');
var router  = express.Router();
var path = require('path');
var join = require('path').join;


function homepage(req, res){
	res.render('portalLayout', { title: 'My Account' });
}

function uploadMolecule(req, res){
	console.log("uploaded molecule");
	//do something
}

/* GET home page. */
router.get('/', homepage);

router.post('/uploadMolecule', uploadMolecule);

module.exports = router;