const sql = require("../db.js");
const jwt = require('express-jwt');


// constructor
const User = function(user) {
  this.uid = user.uid;
  this.email = user.email;
  this.password = user.password;
  this.displayName = user.displayName;
  this.photoURL = user.photoURL;
  this.emailVerified = user.emailVerified;
  this.role = user.role;
  this.token = user.token;
};


User.getAllUsers = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};

User.signUp = (user, result) => {

  sql.query("INSERT INTO user SET ?", user, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (err) {
      res.status(1062).send({
        message:
          err.message || "Already Exists"
      });
      // console.log("error: ", err);
      // result(err, null);
      // return;
    }

    console.log("created user: ", { id: res.insertId, ...user });
    result(null, { id: res.insertId, ...user });
  });
};

User.signIn = (email,password,result) => {
  console.log("User: ", email);
  sql.query(`SELECT * FROM user WHERE email = '${email}' and password ='${password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found video: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};






module.exports = User;
