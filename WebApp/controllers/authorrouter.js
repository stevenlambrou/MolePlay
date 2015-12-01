var express = require('express');
var router  = express.Router();
var path = require('path');
var join = require("path").join;


function homepage(req, res){
	//res.render('homepage')
}
function uploadMolecule(req, res){
	console.log("uploaded molecule");
	//do something
}
/* GET home page. */
router.post('/uploadMolecule', uploadMolecule);


module.exports = router;