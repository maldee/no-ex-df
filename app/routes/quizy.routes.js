module.exports = app => {
  const quiz = require("../controllers/quizy.controller.js");
  
  const baseURL = "/api/quizy";

    // Posts
  app.post(baseURL+"/quizes/addQuiz", quiz.create);
    
   // Gets
   app.get(baseURL+"/setup/:amount/:category/:difficulty/:type", quiz.findAll);

};
