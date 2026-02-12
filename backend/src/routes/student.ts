import express from 'express';
import { getAllStudents } from '../controllers/studentController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getAllStudents);

export default router;
