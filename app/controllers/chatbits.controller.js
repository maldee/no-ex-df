const ChatBits_Category = require("../models/chatbits/category.model.js");
const ChatBits_Post = require("../models/chatbits/post.model.js");
const ChatBits_Situation = require("../models/chatbits/situation.model.js");

const baseURL = "/api/chatbits";

// Retrieve all 
exports.findAllCategories = (req, res) => {
  ChatBits_Category.getAll((err, data) => {

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
          id : d.id,
          category : d.category,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findAllPosts = (req, res) => {
  ChatBits_Post.getAll((err, data) => {

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
         
          id : d.id,
          english_phrase : d.english_phrase,
          sinhala_phrase : d.sinhala_phrase,
          singlish_phrase : d.singlish_phrase,
          note : d.note,
          categories : d.categories,
          situations : d.situations,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findAllSituations = (req, res) => {
  ChatBits_Situation.getAll((err, data) => {

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
          id : d.id,
          situation : d.situation,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findByEnglishPhrase = (req, res) => {
  ChatBits_Post.search(req.params.searched,(err, data) => {

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
         
          id : d.id,
          english_phrase : d.english_phrase,
          sinhala_phrase : d.sinhala_phrase,
          singlish_phrase : d.singlish_phrase,
          note : d.note,
          categories : d.categories,
          situations : d.situations,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};








