import db from "../utils/database.js";

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

// Mengambil data quiz dari database saat server dimulai
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
});

export const quizPage = async (req, res) => {
  try {
    totalCorrect = 0;
    await nextQuestion();
    console.log(currentQuestion);
    res.render("index.ejs", { question: currentQuestion });
  } catch (error) {
    console.error("Error rendering quiz page:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const postQuiz = async (req, res) => {
  try {
    let answer = req.body.answer.trim();
    let isCorrect = false;
    if (currentQuestion && currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
      totalCorrect++;
      console.log(totalCorrect);
      isCorrect = true;
    }
    await nextQuestion();
    res.render("index.ejs", {
      question: currentQuestion,
      wasCorrect: isCorrect,
      totalScore: totalCorrect,
    });
  } catch (error) {
    console.error("Error posting quiz:", error);
    res.status(500).send("Internal Server Error");
  }
};

async function nextQuestion() {
  return new Promise((resolve, reject) => {
    if (quiz.length === 0) {
      reject(new Error("Quiz data is empty"));
    }
    const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
    currentQuestion = randomCountry;
    resolve();
  });
}
