exports = module.exports = {};

// In place of db for demo
var users = [];

function checkLogin (sesh) {
  var loginStatus = false;
  if (sesh.username) {
    loginStatus = (users[sesh.username].password === sesh.password);
  }
  return(loginStatus);
}

function addUser (userObj) {
  users[userObj.username] = userObj
}

function getUser (username) {
  return(users[username]);
}

module.exports = { checkLogin: checkLogin,
                    addUser: addUser,
                    getUser: getUser };