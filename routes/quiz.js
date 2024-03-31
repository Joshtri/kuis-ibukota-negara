import express from 'express';
import { postQuiz, quizPage } from '../controllers/quizController.js';
const router = express.Router();




router.get('/', quizPage)
router.post('/submit', postQuiz)


router.get('/test',(req,res)=>{
    res.render('test');
})
export default router

// module.exports = router;