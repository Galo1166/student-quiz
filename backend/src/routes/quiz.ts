import express from 'express';
import {
  createQuiz,
  getQuiz,
  getAllQuizzes,
  getMyQuizzes,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuiz);
router.post('/', authMiddleware, adminMiddleware, createQuiz);
router.get('/admin/my-quizzes', authMiddleware, adminMiddleware, getMyQuizzes);
router.put('/:id', authMiddleware, adminMiddleware, updateQuiz);
router.delete('/:id', authMiddleware, adminMiddleware, deleteQuiz);

export default router;
