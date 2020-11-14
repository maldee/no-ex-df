const Category = require("../models/blog/category.model.js");
const Post = require("../models/blog/post.model.js");
const Author = require("../models/blog/author.model.js");

const baseURL = "/api/blog";

function getYouTubeId(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}

// Create and Save a new video
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("kimba "+req.body.title);
    var url=baseURL+"/post/"+req.body.slug;

  // Create a Video
  const post = new Post({
    id : req.body.id,
    author : req.body.author,
    url : url,
    title : req.body.title,
    slug : req.body.slug,
    image : req.body.image,
    content : req.body.content,
    read_time : req.body.read_time,
    likes : req.body.likes,
    category_name : req.body.category_name,
    tags : req.body.tags,
    publish : req.body.publish,
    category_english_name : req.body.category_english_name,
  });

  // Save Customer in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.send(data);
  });
};

exports.createCategory = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("kimba "+req.body.title);
    var url=baseURL+"/posts/"+req.body.slug;

  // Create a Video
  const category = new Category({
    id : req.body.id,
    category_name : req.body.category_name,
    category_image : req.body.category_image,
    category_english_name : req.body.category_english_name,
  });

  // Save Customer in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.send(data);
  });
};

// Retrieve all 
exports.findAllCategories = (req, res) => {
  Category.getAll((err, data) => {

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
          category_name : d.category_name,
          category_image : d.category_image,
          category_english_name : d.category_english_name,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findAllPosts = (req, res) => {
  Post.getAll((err, data) => {

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
          author : d.author,
          url : d.url,
          title : d.title,
          slug : d.slug,
          image : d.image,
          content : d.content,
          read_time : d.read_time,
          likes : d.likes,
          category_name : d.category_name,
          tags : d.tags,
          publish : d.publish,
          category_english_name : d.category_english_name,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findAllAuthors = (req, res) => {
  Author.getAllAuthors((err, data) => {

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
          username : d.username,
          email : d.email,
          password : d.password,
          profile_photo : d.profile_photo,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findLatestPosts = (req, res) => {
  Post.getLatestPosts((err, data) => {

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
          author : d.author,
          url : d.url,
          title : d.title,
          slug : d.slug,
          image : d.image,
          content : d.content,
          read_time : d.read_time,
          likes : d.likes,
          category_name : d.category_name,
          tags : d.tags,
          publish : d.publish,
          category_english_name : d.category_english_name,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findBySlug = (req, res) => {
  Post.getBySlug(req.params.slug,(err, data) => {

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
          author : d.author,
          url : d.url,
          title : d.title,
          slug : d.slug,
          image : d.image,
          content : d.content,
          read_time : d.read_time,
          likes : d.likes,
          category_name : d.category_name,
          tags : d.tags,
          publish : d.publish,
          category_english_name : d.category_english_name,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};

exports.searchPost = (req, res) => {
  Post.searchPost(req.params.q,(err, data) => {

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
          author : d.author,
          url : d.url,
          title : d.title,
          slug : d.slug,
          image : d.image,
          content : d.content,
          read_time : d.read_time,
          likes : d.likes,
          category_name : d.category_name,
          tags : d.tags,
          publish : d.publish,
          category_english_name : d.category_english_name,
         
      };
        objectArray.push(results);
    }
    res.send({dataCount: totalItemCount, results: objectArray });
    
    };
  });
};











