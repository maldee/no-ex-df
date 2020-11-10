const sql = require("../db.js");

// constructor
const ChatBits_Situation = function(situaion) {
  this.id = situaion.id;
  this.situation = situaion.situation;
 
};


ChatBits_Situation.getAll = result => {
  sql.query("SELECT * FROM chatbits_situation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("situation: ", res);
    result(null, res);
  });
};




module.exports = ChatBits_Situation;
