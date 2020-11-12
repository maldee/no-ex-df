const sql = require("../db.js");

// constructor
const Author = function(author) {
  this.id = author.id;
  this.username = author.username;
  this.email = author.email;
  this.password = author.password;
  this.profile_photo = author.profile_photo;
 
};


Author.getAllAuthors = result => {
  sql.query("SELECT * FROM blog_author", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("author: ", res);
    result(null, res);
  });
};


module.exports = Author;
