const sql = require("../db.js");

// constructor
const Answer = function(post) {
  this.id = post.id;
  this.qid = post.qid;
  this.author = post.author;
  this.answer = post.answer;
  
};


Answer.getAll = result => {
  sql.query("SELECT * FROM qlake_answer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("post: ", res);
    result(null, res);
  });
};


Answer.getById = (qid, result) => {
	
  sql.query(`SELECT * FROM qlake_answer WHERE qid = '${qid}'`, (err, res) => {
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

Answer.getAllAnswersById = (qid, result) => {
	
  sql.query(`SELECT * FROM qlake_answer WHERE qid = '${qid}'`, (err, res) => {
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

    if(res.length==0){
      console.log("found video: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Answer.searchPost = (searched, result) => {
	sql.query(`SELECT * FROM qlake_answer WHERE slug LIKE '${searched}%' OR slug LIKE '%${searched}' OR slug LIKE '%${searched}%'`, (err, res) => {
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

Answer.create = (post, result) => {
	console.log("posttttttttt "+post.author);
  sql.query("INSERT INTO qlake_answer SET ?", post, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created video: ", { id: res.insertId, ...post });
    result(null, { id: res.insertId, ...post });
  });
};



module.exports = Answer;
