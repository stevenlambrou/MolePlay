exports = module.exports = {};

// In place of db for demo
var users = [];
users['author'] = { permission: '1',
                  username: 'author',
                  email: 'author@moleplay.com',
                  firstname: 'Crafty',
                  lastname: 'Mole',
                  phone: '911',
                  affiliation: 'Merck Pharmaceuticals',
                  password: 'test' };
users['sitemanager'] = { permission: '3',
                  username: 'sitemanager',
                  email: 'sitemanager@moleplay.com',
                  firstname: 'Tricky',
                  lastname: 'Badger',
                  phone: '1234567890',
                  affiliation: 'Sun Microsystems',
                  password: 'test' };
users['globaladmin'] = { permission: '4',
                  username: 'globaladmin',
                  email: 'globaladmin@moleplay.com',
                  firstname: 'Squinty',
                  lastname: 'Beaver',
                  phone: 'No',
                  affiliation: 'Veridian Dynamics',
                  password: 'test' };

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