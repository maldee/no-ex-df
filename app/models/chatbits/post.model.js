const sql = require("../db.js");

// constructor
const ChatBits_Post = function(post) {
  this.id = post.id;
  this.english_phrase = post.english_phrase;
  this.sinhala_phrase = post.sinhala_phrase;
  this.singlish_phrase = post.singlish_phrase;
  this.note = post.note;
  this.categories = post.categories;
  this.situation = post.situation;
};


ChatBits_Post.getAll = result => {
  sql.query("SELECT * FROM chatbits_post", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("post: ", res);
    result(null, res);
  });
};

ChatBits_Post.search = (searched, result) => {
	
  sql.query(`SELECT * FROM chatbits_post WHERE english_phrase LIKE '${searched}%' OR english_phrase LIKE '%${searched}' OR english_phrase LIKE '%${searched}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("post: ", res);
    result(null, res);
  });
};

module.exports = ChatBits_Post;
