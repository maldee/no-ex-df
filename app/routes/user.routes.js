module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const baseURL = "/api/user";

  
  // app.post(baseURL+"/signUp", user.signUp);
  app.post(baseURL+"/signUp", user.signUp);

  app.get(baseURL+"/signIn/:email/:password", user.signIn);
  app.get(baseURL+"/users/", user.findAllUsers);
  

  
};
