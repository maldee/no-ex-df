module.exports = app => {
  const quiz = require("../controllers/quizy.controller.js");
  
  const baseURL = "/api/quizy";

   // Retrieve a single quize with videosid
   app.get(baseURL+"/setup/:amount/:category/:difficulty/:type", quiz.findAll);

};
