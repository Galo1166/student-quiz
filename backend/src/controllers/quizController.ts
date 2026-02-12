import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import * as quizModel from '../models/quiz.js';
import * as questionModel from '../models/question.js';

export const createQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, duration_minutes, passing_score } = req.body;

    if (!title || !duration_minutes) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const quiz = await quizModel.createQuiz(
      title,
      description,
      req.userId,
      duration_minutes,
      passing_score || 70
    );

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

export const getQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await quizModel.getQuizById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = await questionModel.getQuestionsByQuiz(id);

    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => ({
        ...q,
        options: await questionModel.getOptionsByQuestion(q.id),
      }))
    );

    res.json({ ...quiz, questions: questionsWithOptions });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ error: 'Failed to get quiz' });
  }
};

export const getAllQuizzes = async (req: AuthRequest, res: Response) => {
  try {
    const quizzes = await quizModel.getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error('Get all quizzes error:', error);
    res.status(500).json({ error: 'Failed to get quizzes' });
  }
};

export const getMyQuizzes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const quizzes = await quizModel.getQuizzesByAdmin(req.userId);
    res.json(quizzes);
  } catch (error) {
    console.error('Get my quizzes error:', error);
    res.status(500).json({ error: 'Failed to get quizzes' });
  }
};

export const updateQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, duration_minutes, passing_score } = req.body;

    if (!title || !duration_minutes) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const quiz = await quizModel.getQuizById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.admin_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updated = await quizModel.updateQuiz(id, title, description, duration_minutes, passing_score || 70);
    res.json(updated);
  } catch (error) {
    console.error('Update quiz error:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

export const deleteQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await quizModel.getQuizById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.admin_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await quizModel.deleteQuiz(id);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};
