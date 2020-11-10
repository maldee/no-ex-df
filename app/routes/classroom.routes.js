module.exports = app => {
  const videos = require("../controllers/classroom.controller.js");

  const baseURL = "/api/classroom";

  // Create a new videos
  app.post(baseURL+"/videos", videos.create);

  // Retrieve all videos
  app.get(baseURL+"/videos", videos.findAll);

  // Retrieve a single video with videosid
  app.get(baseURL+"/videos/:id", videos.findOne);

  // Retrieve a single quize with videosid
  app.get(baseURL+"/videos/:grade/:subject/:page", videos.findByGradeSubjectPage);

   // Retrieve a single quize with videosid
   app.get(baseURL+"/videos/:grade/:subject", videos.findByGradeSubject);

  
};
