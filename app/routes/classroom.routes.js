module.exports = app => {
  const videos = require("../controllers/classroom.controller.js");

  const baseURL = "/api/classroom";

  // Posts
  app.post(baseURL+"/videos/addVideo", videos.create);

   // Gets
  app.get(baseURL+"/videos", videos.findAll);

  app.get(baseURL+"/videos/grades", videos.findAllGrades);

  app.get(baseURL+"/videos/subjects", videos.findAllSubjects);

  app.get(baseURL+"/videos/teachers", videos.findAllTeachers);

  // Retrieve a single video with videosid
  app.get(baseURL+"/videos/:id", videos.findOne);

  // Retrieve a single quize with videosid
  app.get(baseURL+"/videos/:grade/:subject/:page", videos.findByGradeSubjectPage);

  app.get(baseURL+"/videos/count/:grade/:subject", videos.findByGradeSubjectCount);

   // Retrieve a single quize with videosid
   app.get(baseURL+"/videos/:grade/:subject", videos.findByGradeSubject);

  
};
