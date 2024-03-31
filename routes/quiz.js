import express from 'express';
import { postQuiz, quizPage } from '../controllers/quizController.js';
const router = express.Router();




router.get('/main', quizPage)
router.post('/submit', postQuiz)


export default router

// module.exports = router;