module.exports = app => {
  const chatbits = require("../controllers/chatbits.controller.js");

  const baseURL = "/api/chatbits";

  

  app.get(baseURL+"/categories", chatbits.findAllCategories);
  app.get(baseURL+"/posts", chatbits.findAllPosts);
  app.get(baseURL+"/situations", chatbits.findAllSituations);
  app.get(baseURL+"/posts/:searched", chatbits.findByEnglishPhrase);

  
};