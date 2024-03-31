import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


// import pg from "pg";
import quizRoute from "./routes/quiz.js";

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set path views
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs"); // Menggunakan mesin template EJS, bisa disesuaikan dengan yang lain jika Anda menggunakan yang lain

//static files.
app.use(express.static("public"));


//routes.
app.use('/', quizRoute)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
