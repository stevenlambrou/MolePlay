var pg = require('pg');
var db = require('./db_config');
var conString = "postgres://" + db.username + ":" + db.password + "@localhost/moleplay";

// cb gets (undefined,true) on success, (err,undefined) on failure
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
      else cb(undefined, true);
    });
  });
}

// cb gets (undefined,true) on success, (err,undefined) on failure
// username - string
// password - string
// cb - function(error, result)
function isValidLogin(username, password, cb){
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("SELECT * FROM Users WHERE username = $1 and password = $2", [username, password], function(err, result){
      done();{
        if (err){
          return console.error("invalid username or password", err);
        }
      }
      if (result.rows[0] !== undefined){
        cb(undefined, result.rows[0]);
      }
      else {
        cb("could not find username: " + username, undefined);
      }
    });
  });
}

// cb gets (undefined,molecule) on success, (err,undefined) on failure
// name - string
// cb - function(error,result)
function getMoleculeByName(name, cb){
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("SELECT * FROM Molecules WHERE name = $1", [name], function(err, result){
      done();{
        if (err){
          return console.error("error querying for moleclule name: " + name, err);
        }
      }
      if (result.rows[0] !== undefined){
        cb(undefined, result.rows);
      }
      else {
        cb("no results were found querying for molecule name: " + name, undefined);
      }
    });
  });
}

// cb gets (undefined,true) on success, (err,undefined) on failure
// uid - int (userId to promote)
// desiredRole - int (role to be given)
// cb - function(error, result)
function promoteUser(uid, desiredRole, cb){
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("UPDATE Roles SET permission = $1 WHERE uid = $2", [desiredRole,uid], function(err, result){
      done();{
        if (err){
          return console.error(("error updating userId: " + uid), err);
        }
      }
      if (result.rows[0] !== undefined){
        cb(undefined, true);
      }
      else {
        cb(("could not find username: " + username), undefined);
      }
    });
  });
}

// cb gets (undefined, molecules) on success, (err, undefined) on failure
// username - string
// cb - function(error, result)
function getMoleculesByUsername(username, cb){
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
        cb(undefined, result.rows);
      }
      else {
        cb("could not find username: " + username, undefined);
      }
    });
  });
}

// cb gets (undefined, true) on success, (err, undefined) on failure
// title - string
// siteId - int (site for playlist)
// durations - int (seconds per molecule)
// cb - function(error, result)
function createPlaylist(title, siteId, durations, cb){
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("INSERT INTO Playlists (mids, title, sid, durations) VALUES ('', $1, $2, $3)", [title, siteId, durations], function(err, result){
      done();{
        if (err){
          return console.error(("error querying for username: " + username), err);
        }
      }
      if (result !== undefined){
        cb(undefined, true);
      }
      else {
        cb("could not add playlist: " + title, undefined);
      }
    });
  });
}

// cb gets (undefined, playlist) on success, (error, undefined) on failure
// pid - int (playlistId)
// cb - function(error, result)
function getPlaylistById(pid, cb){
  pg.connect(conString, function(err, client, done){
    if (err){
      return console.error("error connecting to the database", err);
    }
    client.query("SELECT * FROM Playlists WHERE username = $1", [pid], function(err, result){
      done();{
        if (err){
          return console.error(("error querying for playlistId: " + pid), err);
        }
      }
      if (result.rows[0] !== undefined){
        cb(undefined, result.rows[0]);
      }
      else {
        cb("could not find playlistId: " + pid, undefined);
      }
    });
  });
}

// cb gets (undefined, true) on success, (err, undefined) on failure
// pid - int (playlistId)
// mid - int (moleculeId)
// cb - function(error, result)
function addMoleculeToPlaylist(pid, mid, cb){
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
      else {
        cb("could not find username: " + username, undefined);
      }
    });
  });
}

// cb gets (undefined, true) on success, (err, undefined) on failure
// pid - int (playlistId)
// mids - list(int) (order of moleculeIds)
//
function updatePlaylistOrder(pid, mids, cb){
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
      } else {
        cb("could not find username: " + username, undefined);
      }
    });
  });
}

// cb gets (undefined, pending_molecules) on success, (err, undefined) on failure
// cb - function(error, result)
function getPendingMolecules(cb){
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
      else {
        cb("could not find username: " + username, undefined);
      }
    });
  });
}

// cb gets (undefined, user) on success, (err, undefined) on failure
// username - string
// cb - function(error,result)
// tested
function getUserByUsername(username, cb){
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
      else {
        cb("could not find username: " + username, undefined);
      }
    });
  });
}

// cb gets (undefined, user) on success, (err, undefined) on failure
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