const sql = require("../db.js");

// constructor
const Video = function(video) {
  this.id = video.id;
  this.title = video.title;
  this.description = video.description;
  this.grade = video.grade;
  this.subject=video.subject;
  this.teacher=video.teacher;
  this.link=video.link;
 
};

Video.create = (newVideo, result) => {
	
  sql.query("INSERT INTO classroom_video SET ?", newVideo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created video: ", { id: res.insertId, ...newVideo });
    result(null, { id: res.insertId, ...newVideo });
  });
};

Video.findById = (videoId, result) => {
	
  sql.query(`SELECT * FROM classroom_video WHERE id = ${videoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found video: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Video.findByGradeSubject = (grade,subject, result) => {
 
  sql.query(`SELECT * FROM classroom_video WHERE grade = '${grade}' and subject = '${subject}' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
     
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Video.findByGradeSubjectPage = (grade,subject,page, result) => {
 
  var perPage=10;
  var soffset = (page - 1) * perPage;
  var offset = Number(soffset);

  console.log("perpage: ",perPage);
  console.log("offset: ",offset);

 
  sql.query(`SELECT * FROM classroom_video WHERE grade = '${grade}' and subject = '${subject}' LIMIT ${perPage} OFFSET ${offset} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
     
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Video.getAll = result => {
  sql.query("SELECT * FROM classroom_video", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("videos: ", res);
    result(null, res);
  });
};

Video.getCount = (grade,subject, result) =>{
  sql.query(`SELECT * FROM classroom_video WHERE grade = '${grade}' and subject = '${subject}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }else{
      console.log("videos: ", res);
      result(null, res);
    }

    
  });

};




module.exports = Video;
