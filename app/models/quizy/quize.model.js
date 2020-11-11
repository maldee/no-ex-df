const sql = require("../db.js");

// constructor
const Quiz = function(quiz) {
  this.id = quiz.id;
  this.category = quiz.category;
  this.type = quiz.type;
  this.difficulty = quiz.difficulty;
  this.question=quiz.question;
  this.correct_answer=quiz.correct_answer;
  this.incorrect_answers=quiz.incorrect_answers;
};

Quiz.create = (newQuiz, result) => {
	
  sql.query("INSERT INTO quizy_quiz SET ?", newQuiz, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created quiz: ", { id: res.insertId, ...newQuiz });
    result(null, { id: res.insertId, ...newQuiz });
  });
};

Quiz.findById = (quizId, result) => {
	
  sql.query(`SELECT * FROM quizy_quiz WHERE id = ${quizId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found quiz: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Quiz.findByAmountCategoryDifficultyType = (amount,category,difficulty,type, result) => {
	
  sql.query(`SELECT * FROM quizy_quiz WHERE category = '${category}' and difficulty = '${difficulty}' and type = '${type}' limit ${amount}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found quiz: ", res.length);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Quiz.getAll = result => {
  sql.query("SELECT * FROM quizy_quiz", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("quizes: ", res);
    result(null, res);
  });
};

Quiz.getAllCategories = result => {
  sql.query("SELECT * FROM quizy_quiz_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("quizes: ", res);
    result(null, res);
  });
};

Quiz.getAllTypes = result => {
  sql.query("SELECT * FROM quizy_quiz_type", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("quizes: ", res);
    result(null, res);
  });
};

Quiz.updateById = (id, quiz, result) => {
  sql.query(
    "UPDATE quizy_quiz SET category = ?, type = ?, question = ?,correct_answer = ?,incorrect_answers = ? WHERE id = ?",
    [quiz.category, quiz.type, quiz.question,quiz.correct_answer, quiz.incorrect_answers],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated quiz: ", { id: id, ...quiz });
      result(null, { id: id, ...quiz });
    }
  );
};

Quiz.remove = (id, result) => {
  sql.query("DELETE FROM quizy_quiz WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted quiz with id: ", id);
    result(null, res);
  });
};

Quiz.removeAll = result => {
  sql.query("DELETE FROM quizy_quiz", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} quizes`);
    result(null, res);
  });
};

module.exports = Quiz;
