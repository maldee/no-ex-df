const sql = require("../db.js");
const jwt = require('express-jwt');


// constructor
const Product = function(product) {
  this.id = product.id;
  this.title = product.title;
  this.image = product.image;
  this.description = product.description;
  this.price = product.price;
};


Product.getAllProducts = result => {
  sql.query("SELECT * FROM cloudy_product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Product: ", res);
    result(null, res);
  });
};

Product.getProductById = (productId, result) => {
	console.log("product id "+productId);
  sql.query(`SELECT * FROM cloudy_product WHERE id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};





module.exports = Product;
