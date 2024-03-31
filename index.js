import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


// import pg from "pg";
import quizRoute from "./routes/quiz.js";

const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set path views
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs"); // Menggunakan mesin template EJS, bisa disesuaikan dengan yang lain jika Anda menggunakan yang lain

//static files.
app.use(express.static("public"));


//routes.
app.use('/', quizRoute)


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
