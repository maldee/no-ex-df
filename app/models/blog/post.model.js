const sql = require("../db.js");

// constructor
const Post = function(post) {
  this.id = post.id;
  this.author = post.author;
  this.url = post.url;
  this.title = post.title;
  this.slug = post.slug;
  this.image = post.image;
  this.content = post.content;
  this.read_time = post.read_time;
  this.likes = post.likes;
  this.category_name = post.category_name;
  this.tags = post.tags;
  this.publish = post.publish;
  this.category_english_name = post.category_english_name;
  
};


Post.getAll = result => {
  sql.query("SELECT * FROM blog_post", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("post: ", res);
    result(null, res);
  });
};

Post.getLatestPosts =  result => {
	
  sql.query(`SELECT * FROM blog_post ORDER BY likes DESC LIMIT 5`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Post.getBySlug = (slug, result) => {
	
  sql.query(`SELECT * FROM blog_post WHERE slug = '${slug}'`, (err, res) => {
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

Post.getByCategory = (category, result) => {
	
  sql.query(`SELECT * FROM blog_post WHERE category_name = '${category}'`, (err, res) => {
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

Post.searchPost = (searched, result) => {
	sql.query(`SELECT * FROM blog_post WHERE slug LIKE '${searched}%' OR slug LIKE '%${searched}' OR slug LIKE '%${searched}%'`, (err, res) => {
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

Post.create = (post, result) => {
	console.log("posttttttttt "+post.author);
  sql.query("INSERT INTO blog_post SET ?", post, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created video: ", { id: res.insertId, ...post });
    result(null, { id: res.insertId, ...post });
  });
};



module.exports = Post;
