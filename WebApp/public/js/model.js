var pg = require('pg');
var db = require('./db_config');
var conString = "postgres://" + db.username + ":" + db.password + "@localhost/moleplay";
var results = [];

// username - string
// pass - string
// fname - string
// lname - string
// email - string
// affil - string
// phone - string
// cb - function(err, result) (true/false)
// tested
function addUser(username, pass, fname, lname, email, affil, phone, cb){
  results = false;
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("INSERT INTO Users (username, pass, fname, lname, email, affil, phone) VALUES ($1,$2,$3,$4,$5,$6,$7)", [username,pass,fname,lname,email,affil,phone], function(err, result){  
      done();{
        if (err){
          return console.error("error adding the new user " + username, err);
        }
      }
      if (result === undefined) cb('error adding user', undefined);
      else cb(undefined, result.rowCount === 1);
      cb(err,result);
    });
  });
}

// username - string
// cb - function(error,result)
// tested
function getUserByUsername(username, cb){
  results = [];
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("SELECT * FROM Users WHERE username = $1", [username], function(err, result){
      done();{
        if (err){
          return console.error(("error querying for username: " + username), err);
        }
      }
      if (result.rows[0] !== undefined){
        cb(undefined, result.rows[0]);
      }
    });
  });
}

// userId - int
// cb - function(error,result)
// tested
function getUserByUserId(userId, cb){
  results = [];
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("SELECT * FROM Users WHERE uid = $1", [userId], function(err, result){
      done();{
        if (err){
          return console.error("error querying for userId " + userId,err);
        }
      }
      if (result.rows[0] === undefined) cb("no results from querying for userId: " + userId, undefined)
      else cb(undefined,result.rows[0]);
    });
  });
}