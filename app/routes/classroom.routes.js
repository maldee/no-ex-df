module.exports = app => {
  const videos = require("../controllers/classroom.controller.js");

  const baseURL = "/api/classroom";

  // Retrieve all videos
  app.get(baseURL+"/videos", videos.findAll);

  app.get(baseURL+"/videos/addVideo", videos.create);

  app.get(baseURL+"/videos/grades", videos.findAllGrades);

  app.get(baseURL+"/videos/subjects", videos.findAllSubjects);

  app.get(baseURL+"/videos/teachers", videos.findAllTeachers);

  // Retrieve a single video with videosid
  app.get(baseURL+"/videos/:id", videos.findOne);

  // Retrieve a single quize with videosid
  app.get(baseURL+"/videos/:grade/:subject/:page", videos.findByGradeSubjectPage);

   // Retrieve a single quize with videosid
   app.get(baseURL+"/videos/:grade/:subject", videos.findByGradeSubject);

  
};
