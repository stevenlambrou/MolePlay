
var express = require('express');
var router  = express.Router();
var path = require('path');


function homepage(req, res){
	res.render('index');
}
function playWithMolecules(req, res){
	res.render('playwithmolecules');
}
function createAccount(req,res){
	res.render('createaccount');
}


router.get('/', homepage);
router.get('/createAccount', createAccount);


module.exports = router;
// router.get('/playwithmolecules', function(req, res, next) {
//   // TODO: create .post('/playwithmolecules') to service search fn
//   res.render('playWithMolecules', { title: 'Play With Molecules' });
// });

// router.get('/createaccount', function(req, res, next) {
//   // TODO: need something like .post('createaccount') for new account forms
//   res.render('createAccount', { title: 'Create An Account' });
// });

// router.get('/login', function(req, res, next) {
//   // TODO: .post('/login') or .post('/auth') for login credentials
//   res.render('logIn', { title: 'Log In' });
// });