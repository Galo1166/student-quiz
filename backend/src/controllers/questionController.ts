import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import * as questionModel from '../models/question.js';
import * as quizModel from '../models/quiz.js';

export const createQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const { quiz_id, question_text, question_type, points, order_num } = req.body;

    if (!quiz_id || !question_text || !question_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const quiz = await quizModel.getQuizById(quiz_id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.admin_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const question = await questionModel.createQuestion(
      quiz_id,
      question_text,
      question_type,
      points || 1,
      order_num || 1
    );

    res.status(201).json(question);
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

export const addOption = async (req: AuthRequest, res: Response) => {
  try {
    const { question_id, option_text, is_correct, order_num } = req.body;

    if (!question_id || !option_text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const question = await questionModel.getQuestionById(question_id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const option = await questionModel.createOption(
      question_id,
      option_text,
      is_correct || false,
      order_num || 1
    );

    res.status(201).json(option);
  } catch (error) {
    console.error('Add option error:', error);
    res.status(500).json({ error: 'Failed to add option' });
  }
};

export const updateQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { question_text, question_type, points, order_num } = req.body;

    if (!question_text || !question_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const question = await questionModel.getQuestionById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const quiz = await quizModel.getQuizById(question.quiz_id);
    if (quiz?.admin_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updated = await questionModel.updateQuestion(id, question_text, question_type, points || 1, order_num || 1);
    res.json(updated);
  } catch (error) {
    console.error('Update question error:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
};

export const deleteQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const question = await questionModel.getQuestionById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const quiz = await quizModel.getQuizById(question.quiz_id);
    if (quiz?.admin_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await questionModel.deleteQuestion(id);
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

export const deleteOption = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await questionModel.deleteOption(id);
    res.json({ message: 'Option deleted successfully' });
  } catch (error) {
    console.error('Delete option error:', error);
    res.status(500).json({ error: 'Failed to delete option' });
  }
};
