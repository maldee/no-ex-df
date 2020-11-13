
const User = require("../models/users/user.model.js");


const baseURL = "/api/users";

// Retrieve all 
exports.findAllUsers = (req, res) => {
  User.getAllUsers((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    }else{ 
      var objectArray=[];
      for (var i in data) {
        var d = data[i];
        
        var totalItemCount=data.length;
      
        var results = {
         uid :d.uid,
         username :d.username,
         password :d.password,
         firstName :d.firstName,
         lastName :d.lastName,
         role :d.role,
         token :d.token,
         email :d.email,
         displayName :d.displayName,
         photoURL :d.photoURL,
         emailVerified :d.emailVerified,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.signIn = (req, res) => {
 
  User.signIn(req.params.email,req.params.password,(err, data) => {
    console.log("User: ", req.params.email);
    if (err){
      res.status(500).send({
        message:
          err.message || "User not found"
      });
    }else{ 
      var objectArray=[];
      for (var i in data) {
        var d = data[i];
        
        var totalItemCount=data.length;
      
        var results = {
         uid :d.uid,
         email :d.email,
         password :d.password,
         displayName :d.displayName,
         photoURL :d.photoURL,
         emailVerified :d.emailVerified,
         role :d.role,
         token :d.token, 
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};


exports.signUp = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = new User({
    
    email : req.body.email,
    password :req.body.password,
    displayName :req.body.displayName,
    photoURL : req.body.photoURL,
    emailVerified :req.body.emailVerified,
    role : req.body.role,
    token :req.body.token, 
  });

  // Save Customer in the database
  User.signUp(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "User registration failed"
      });
    else res.send(data);
  });
};





