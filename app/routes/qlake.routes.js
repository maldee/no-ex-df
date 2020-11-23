module.exports = app => {
  const qlake = require("../controllers/qlake.controller.js");

  const baseURL = "/api/qlake";

  
  app.post(baseURL+"/addQuestion", qlake.create);
  app.post(baseURL+"/addCategory", qlake.createCategory);
  app.get(baseURL+"/categories", qlake.findAllCategories);
  app.get(baseURL+"/questions", qlake.findAllPosts);
  
  app.get(baseURL+"/questions/mostPopular", qlake.findLatestPosts);
  app.get(baseURL+"/questions/:id", qlake.findById);
  app.get(baseURL+"/questions/q/:q", qlake.searchPost);
  app.get(baseURL+"/questions/byCategory/list/:category", qlake.findByCategory);

  app.get(baseURL+"/authors/", qlake.findAllAuthors);
  

  
};
