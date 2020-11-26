
const Product = require("../models/cloudy/cloudy.model.js");


const baseURL = "/api/cloudy";

// Retrieve all 
exports.findAllProducts = (req, res) => {
  Product.getAllProducts((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    }else{ 
      var objectArray=[];
      for (var i in data) {
        var d = data[i];
        
        var totalItemCount=data.length;
      
        var results = {
         id :d.id,
         title :d.title,
         description :d.description,
         image :d.image,
         price :d.price,
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findByProductId = (req, res) => {
  Product.getProductById(req.params.id,(err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });

    }else{ 
      console.log("fuck "+data.length);
      var objectArray=[];
      
      for (var i in data) {
        var d = data[i];
        
        var totalItemCount=data.length;
      
        var results = {
         id :d.id,
         title :d.title,
         description :d.description,
         image :d.image,
         price :d.price,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

