const sql = require("../db.js");

// constructor
const User = function(user) {
  this.id = user.id;
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.profile_photo = user.profile_photo;
 
};


User.getAllUsers = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


module.exports = User;
