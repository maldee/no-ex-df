const Quiz = require("../models/quizy/quize.model.js");

// Create and Save a new quiz
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Quize
  const quiz = new Quiz({
    id : req.body.id,
    category : req.body.category,
    type : req.body.type,
    difficulty : req.body.difficulty,
    question: req.body.question,
    correct_answer: req.body.correct_answer,
    incorrect_answers: req.body.incorrect_answers
  });

  // Save Customer in the database
  Quiz.create(quiz, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quize."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.

exports.findAll = (req, res) => {
  
  console.log("req ",req.params);
  Quiz.findByAmountCategoryDifficultyType(req.params.amount,req.params.category,req.params.difficulty,req.params.type,(err, data) => {
   if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Quize."
      });
   }else{
    
    var objectArray=[];

    for (var i in data) {
      var d = data[i];
      
      var incorrect_answers=[];
      incorrect_answers.push(d.incorrect_answers.split(","));
      var results = {
        id: d.id,
        category: d.category,
        type:d.type,
        difficulty:d.difficulty,
        question:d.question,
        correct_answer:d.correct_answer,
        incorrect_answers:d.incorrect_answers.split(",")
    };
      objectArray.push(results);
  }
    res.send({response_code: 0, results: objectArray });
   }
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
 
  console.log("hukaris ",req.params);
  Quiz.findById(req.params.quizeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.quizeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.quizeId
        });
      }
    } else res.send(data);
  });
};

// Update a Quiz identified by the quizeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Quiz.updateById(
    req.params.quizeId,
    new Quize(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Quize with id ${req.params.quizeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Quize with id " + req.params.quizeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Quiz with the specified quizeId in the request
exports.delete = (req, res) => {
  Quiz.remove(req.params.quizeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quize with id ${req.params.quizeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Quize with id " + req.params.quizeId
        });
      }
    } else res.send({ message: `Quize was deleted successfully!` });
  });
};

// Delete all Quize from the database.
exports.deleteAll = (req, res) => {
  Quiz.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Quizes."
      });
    else res.send({ message: `All Quizes were deleted successfully!` });
  });
};

exports.findAllCategories = (req, res) => {
  Quiz.getAllCategories((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
      var objectArray=[];
      var totalItemCount=data.length;

      for (var i in data) {
        var d = data[i];
        
        var results = {
          id : d.id,
          category : d.category,
      };
        objectArray.push(results);
    }
    res.send({count: totalItemCount, results: objectArray });
    
    };
  });
};

exports.findAllTypes = (req, res) => {
  Quiz.getAllTypes((err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
      var objectArray=[];
      var totalItemCount=data.length;

      for (var i in data) {
        var d = data[i];
        
        var results = {
          id : d.id,
          type : d.type,
      };
        objectArray.push(results);
    }
    res.send({count: totalItemCount, results: objectArray });
    
    };
  });
};
