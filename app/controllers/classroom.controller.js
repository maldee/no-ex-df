const Video = require("../models/classroom/video.model.js");

function getYouTubeId(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}


// Create and Save a new video
exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Video
  const video = new Video({
    id : req.body.id,
    title : req.body.title,
    description : req.body.description,
    grade : req.body.grade,
    subject: req.body.subject,
    teacher: req.body.teacher,
    link: req.body.link,
 
  });

  // Save Customer in the database
  Video.create(video, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Videos."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.

exports.findByGradeSubjectPage = (req, res) => {
  
  console.log("req ",req.params);

  var totalCount = 0;

  Video.getCount(req.params.grade,req.params.subject,(err, data) => {
    if (err){
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving Video."
       });
    }else{
     
     
        totalCount=data.length;
        getVideosByGradeSubject(totalCount);
      
      console.log("total Count is :::  ",totalCount);
    }
  });

  
  function getVideosByGradeSubject(totalCount){
    Video.findByGradeSubjectPage(req.params.grade,req.params.subject,req.params.page,(err, data) => {
      if (err){
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving Video."
         });
      }else{
       
       var objectArray=[];
   
       for (var i in data) {
         var d = data[i];
         
         var itemPerPage = 10;
         var totalItemCount=data.length;
         var page= parseInt(req.params.page);
        
         var tPages=Math.ceil(totalCount/itemPerPage);
         
         
        var youtubeVideoId=getYouTubeId(d.link);
       
         var results = {
           id : d.id,
           title : d.title,
           description : d.description,
           grade : d.grade,
           subject: d.subject,
           teacher: d.teacher,
           link: youtubeVideoId,
       };
         objectArray.push(results);
     }
       res.send({totalPages: tPages,count: totalItemCount,page: page, results: objectArray });
      }
     });
  }
 
};

exports.findByGradeSubject = (req, res) => {
  
  console.log("req ",req.params);


  Video.findByGradeSubject(req.params.grade,req.params.subject,(err, data) => {
   if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Video."
      });
   }else{
    
    var objectArray=[];

    for (var i in data) {
      var d = data[i];
      
    
      var totalItemCount=data.length;
      var youtubeVideoId=getYouTubeId(d.link);
    
      var results = {
        id : d.id,
        title : d.title,
        description : d.description,
        grade : d.grade,
        subject: d.subject,
        teacher: d.teacher,
        link: youtubeVideoId,
    };
      objectArray.push(results);
  }
    res.send({count: totalItemCount, results: objectArray });
   }
  });
};


// Find a single Customer with a customerId
exports.findOne = (req, res) => {
 
  console.log("hukaris ",req.params);
  Video.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Video.getAll((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
      var objectArray=[];
      for (var i in data) {
        var d = data[i];
        
        var itemPerPage = 5;
        var totalItemCount=data.length;
        var page= Math.floor((totalItemCount + itemPerPage - 1) / itemPerPage);
        var youtubeVideoId=getYouTubeId(d.link);
      
      
      
        var results = {
          id : d.id,
          title : d.title,
          description : d.description,
          grade : d.grade,
          subject: d.subject,
          teacher: d.teacher,
          link: youtubeVideoId,
      };
        objectArray.push(results);
    }
    res.send({count: totalItemCount,page: page, results: objectArray });
    
    };
  });
};


exports.findAllGrades = (req, res) => {
  Video.getAllGrades((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
      var objectArray=[];
      var totalItemCount=data.length;

      for (var i in data) {
        var d = data[i];
        
        var results = {
          id : d.id,
          grade : d.grade,
      };
        objectArray.push(results);
    }
    res.send({count: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findAllSubjects = (req, res) => {
  Video.getAllSubjects((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
      var objectArray=[];
      var totalItemCount=data.length;
      for (var i in data) {
        var d = data[i];
        
        var results = {
          id : d.id,
          subject : d.subject,
      };
        objectArray.push(results);
    }
    res.send({count: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findAllTeachers = (req, res) => {
  Video.getAllTeachers((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
      var objectArray=[];
      var totalItemCount=data.length;
      for (var i in data) {
        var d = data[i];
        
        var results = {
          id : d.id,
          teacher : d.teacher,
      };
        objectArray.push(results);
    }
    res.send({count: totalItemCount, results: objectArray });
    
    };
  });
};




