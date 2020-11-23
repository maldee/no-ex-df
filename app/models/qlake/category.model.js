const sql = require("../db.js");

// constructor
const Category = function(category) {
  this.id = category.id;
  this.category_name = category.category_name;
  this.category_image = category.category_image;
  this.category_english_name = category.category_english_name;
 
};


Category.getAll = result => {
  sql.query("SELECT * FROM qlake_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};

Category.create = (category, result) => {

  sql.query("INSERT INTO qlake_category SET ?", category, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created video: ", { id: res.insertId, ...category });
    result(null, { id: res.insertId, ...category });
  });
};


module.exports = Category;
