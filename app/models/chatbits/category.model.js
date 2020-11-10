const sql = require("../db.js");

// constructor
const ChatBits_Category = function(category) {
  this.id = category.id;
  this.category = category.category;
 
};


ChatBits_Category.getAll = result => {
  sql.query("SELECT * FROM chatbits_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};


module.exports = ChatBits_Category;
