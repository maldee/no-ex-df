const sql = require("../db.js");

// constructor
const Post = function(post) {
  this.qid = post.qid;
  this.author = post.author;
  this.question = post.question;
  this.slug = post.slug;
  this.content = post.content;
  this.category_name = post.category_name;
  this.category_english_name = post.category_english_name;
  this.tags = post.tags;
  this.asked = post.asked;
  this.views = post.views;
  this.status = post.status;
  
};


Post.getAll = result => {
  sql.query("SELECT * FROM qlake_post", (err, res) => {
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
	
  sql.query(`SELECT * FROM qlake_post ORDER BY likes DESC LIMIT 5`, (err, res) => {
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
	
  sql.query(`SELECT * FROM qlake_post WHERE slug = '${slug}'`, (err, res) => {
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

Post.getById = (qid, result) => {
	
  sql.query(`SELECT * FROM qlake_post WHERE qid = '${qid}'`, (err, res) => {
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
	
  sql.query(`SELECT * FROM qlake_post WHERE category_english_name = '${category}'`, (err, res) => {
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
	sql.query(`SELECT * FROM qlake_post WHERE slug LIKE '${searched}%' OR slug LIKE '%${searched}' OR slug LIKE '%${searched}%'`, (err, res) => {
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
  sql.query("INSERT INTO qlake_post SET ?", post, (err, res) => {
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
