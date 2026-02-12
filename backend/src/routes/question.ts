import express from 'express';
import {
  createQuestion,
  addOption,
  updateQuestion,
  deleteQuestion,
  deleteOption,
} from '../controllers/questionController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createQuestion);
router.post('/options', authMiddleware, adminMiddleware, addOption);
router.put('/:id', authMiddleware, adminMiddleware, updateQuestion);
router.delete('/:id', authMiddleware, adminMiddleware, deleteQuestion);
router.delete('/options/:id', authMiddleware, adminMiddleware, deleteOption);

export default router;
