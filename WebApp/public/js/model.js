var pg = require('../pg');
var conString = "postgres://postgres:postgres@localhost/moleplay";

function addUser(username, pass, fname, lname, email, affil, phone){

}


function getUser(userId){

}

// pg.connect(conString, function(err, client, done) {

//   if (err) {
//     return console.error('error fetching client from pool', err);
//   }
//   client.query('SELECT $1::int AS number', ['1'], function(err, result) {
//     done();
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].number);
//   });

// });