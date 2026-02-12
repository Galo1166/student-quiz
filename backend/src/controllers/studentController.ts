import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import * as userModel from '../models/user.js';

export const getAllStudents = async (req: AuthRequest, res: Response) => {
  try {
    const students = await userModel.getAllStudents();
    res.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Failed to get students' });
  }
};
