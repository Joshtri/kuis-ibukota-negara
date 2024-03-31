import db from "../utils/database.js";

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

export const quizPage = async (req, res) => {
  try {
    totalCorrect = 0;

    // Mengambil data quiz dari database
    const result = await db.query("SELECT * FROM capitals");
    if (result.rows.length > 0) {
      quiz = result.rows;
    } else {
      console.error("Error: Quiz data is empty");
    }

    // Menentukan pertanyaan berikutnya setelah data quiz diambil
    await nextQuestion();

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

      // console.log(totalCorrect);

      isCorrect = true;
    }
    await nextQuestion();

    res.render("index.ejs", {
      question: currentQuestion,
      wasCorrect: isCorrect,
      totalScore: totalCorrect,
    });

  } 
  
  catch (error) {
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
