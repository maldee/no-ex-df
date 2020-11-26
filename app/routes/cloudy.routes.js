module.exports = app => {
  const cloudy = require("../controllers/cloudy.controller.js");

  const baseURL = "/api/cloudy";

   // Posts
  // app.post(baseURL+"/phrases/addPhrase", cloudy.create);

  app.get(baseURL+"/products", cloudy.findAllProducts);
  app.get(baseURL+"/products/:id", cloudy.findByProductId);

  
};
