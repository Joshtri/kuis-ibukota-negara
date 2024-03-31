import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import quizRoute from "./routes/quiz.js";

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.use('/', quizRoute)
// POST a new post
// app.post("/submit", (req, res) => {
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
// });

// async function nextQuestion() {
//   const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
//   currentQuestion = randomCountry;
// }

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
