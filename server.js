const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const multer  = require('multer');
var upload = multer();

app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
const errorHandler = require('./app/helper/error-handler');
app.use(errorHandler);

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to deeflow" });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/chatbits.routes.js")(app);
require("./app/routes/classroom.routes.js")(app);
require("./app/routes/blog.routes.js")(app);
require("./app/routes/quizy.routes.js")(app);
require("./app/routes/qlake.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
