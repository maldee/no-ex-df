module.exports = app => {
  const blog = require("../controllers/blog.controller.js");

  const baseURL = "/api/blog";

  
  app.post(baseURL+"/addPost", blog.create);
  app.post(baseURL+"/addCategory", blog.createCategory);
  app.get(baseURL+"/categories", blog.findAllCategories);
  app.get(baseURL+"/posts", blog.findAllPosts);
  
  app.get(baseURL+"/posts/mostPopular", blog.findLatestPosts);
  app.get(baseURL+"/posts/:slug", blog.findBySlug);
  app.get(baseURL+"/authors/", blog.findAllAuthors);
  

  
};
