var pg = require('pg');
var db = require('./db_config');
var conString = "postgres://" + db.username + ":" + db.password + "@localhost/moleplay";
var results = [];


// returns boolean
function addUser(username, pass, fname, lname, email, affil, phone){
  addUserHelper(username, pass, fname, lname, email, affil, phone);
  return results;
}

function addUserHelper(username, pass, fname, lname, email, affil, phone){
  results = false;
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    var query = client.query("INSERT INTO Users (username, pass, fname, lname, email, affil, phone) VALUES ($1,$2,$3,$4,$5,$6,$7)", [username,pass,fname,lname,email,affil,phone], function(err, result){
      if (err){
        done();
        return console.error("error adding the new user " + username, err);
      }
    });
    query.on('end', function(){
      done();
      results = true;
    });
  });
}

function getUserByUsername(username){
  getUserByUsernameHelper(username);
  return results[0];
}

function getUserByUsernameHelper(username){
  results = [];
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    var query = client.query("SELECT * FROM Users WHERE username = $1", [username], function(err, result){
      if (err){
        done();
        return console.error(("error querying for username: " + username), err);
      }
    });
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function(){
      done();
      return results[0];
    });
  });
}

function getUserByUserId(userId){
  getUserByUserIdHelper(userId);
  return results[0];
}

function getUserByUserIdHelper(userId){
  results = [];
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    var query = client.query("SELECT * FROM Users WHERE uid = $1", [userId], function(err, result){
      if (err){
        done();
        return console.error(("error querying for userId: " + userId), err);
      }
    });
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function(){
      done();
    });
  });
}