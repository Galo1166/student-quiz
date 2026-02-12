import express from 'express';
import {
  startQuiz,
  submitAnswer,
  submitQuiz,
  getAttempt,
  getAttemptsByStudent,
  getAttemptsByQuiz,
} from '../controllers/attemptController.js';
import { authMiddleware, adminMiddleware, studentMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/start', authMiddleware, studentMiddleware, startQuiz);
router.post('/answer', authMiddleware, studentMiddleware, submitAnswer);
router.post('/submit', authMiddleware, studentMiddleware, submitQuiz);
router.get('/:id', authMiddleware, getAttempt);
router.get('/', authMiddleware, studentMiddleware, getAttemptsByStudent);
router.get('/quiz/:quiz_id', authMiddleware, adminMiddleware, getAttemptsByQuiz);

export default router;
