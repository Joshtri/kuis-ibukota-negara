import db from "../utils/database.js"


let quiz = [];
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }

});

let totalCorrect = 0;
let currentQuestion = {};


// export const quizPage = async(req,res)=>{
//   totalCorrect = 0;
//   await nextQuestion();
//   console.log(currentQuestion);
//   res.render("index.ejs", { question: currentQuestion });
// }

// export const postQuiz = async (req,res)=>{
//   // POST a new post

//   let answer = req.body.answer.trim();
//   let isCorrect = false;
//   if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
//     totalCorrect++;
//     console.log(totalCorrect);
//     isCorrect = true;
//   }

//   nextQuestion();
//   res.render("index.ejs", {
//     question: currentQuestion,
//     wasCorrect: isCorrect,
//     totalScore: totalCorrect,
//   });

// }

export const quizPage = async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  
  // Pastikan currentQuestion tidak undefined sebelum melewatkan ke template
  if (currentQuestion) {
    res.render("index.ejs", { question: currentQuestion });
  } else {
    res.status(500).send("Error: No question available.");
  }
};

export const postQuiz = async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  
  if (currentQuestion && currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  
  // Pastikan currentQuestion tidak undefined sebelum melewatkan ke template
  if (currentQuestion) {
    res.render("index.ejs", {
      question: currentQuestion,
      wasCorrect: isCorrect,
      totalScore: totalCorrect,
    });
  } else {
    res.status(500).send("Error: No question available.");
  }
};



async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}


