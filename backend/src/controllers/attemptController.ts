import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import * as attemptModel from '../models/attempt.js';
import * as answerModel from '../models/answer.js';
import * as questionModel from '../models/question.js';
import * as quizModel from '../models/quiz.js';

export const startQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { quiz_id } = req.body;

    if (!quiz_id) {
      return res.status(400).json({ error: 'Quiz ID is required' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const quiz = await quizModel.getQuizById(quiz_id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const attempt = await attemptModel.createQuizAttempt(quiz_id, req.userId);

    res.status(201).json(attempt);
  } catch (error) {
    console.error('Start quiz error:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
};

export const submitAnswer = async (req: AuthRequest, res: Response) => {
  try {
    const { attempt_id, question_id, answer_text, selected_option_id } = req.body;

    if (!attempt_id || !question_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const attempt = await attemptModel.getAttemptById(attempt_id);
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    if (attempt.student_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const answer = await answerModel.createAnswer(
      attempt_id,
      question_id,
      answer_text || null,
      selected_option_id || null
    );

    res.status(201).json(answer);
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { attempt_id } = req.body;

    if (!attempt_id) {
      return res.status(400).json({ error: 'Attempt ID is required' });
    }

    const attempt = await attemptModel.getAttemptById(attempt_id);
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    if (attempt.student_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const submitted = await attemptModel.submitAttempt(attempt_id);
    await gradeAttempt(attempt_id);

    res.json(submitted);
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

export const getAttempt = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const attempt = await attemptModel.getAttemptById(id);
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    if (attempt.student_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const answers = await answerModel.getAnswersByAttempt(id);

    res.json({ ...attempt, answers });
  } catch (error) {
    console.error('Get attempt error:', error);
    res.status(500).json({ error: 'Failed to get attempt' });
  }
};

export const getAttemptsByStudent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const attempts = await attemptModel.getAttemptsByStudent(req.userId);
    res.json(attempts);
  } catch (error) {
    console.error('Get attempts error:', error);
    res.status(500).json({ error: 'Failed to get attempts' });
  }
};

export const getAttemptsByQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { quiz_id } = req.params;

    const quiz = await quizModel.getQuizById(quiz_id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.admin_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const attempts = await attemptModel.getAttemptsByQuiz(quiz_id);
    res.json(attempts);
  } catch (error) {
    console.error('Get attempts error:', error);
    res.status(500).json({ error: 'Failed to get attempts' });
  }
};

const gradeAttempt = async (attempt_id: string) => {
  const attempt = await attemptModel.getAttemptById(attempt_id);
  if (!attempt) return;

  const answers = await answerModel.getAnswersByAttempt(attempt_id);
  const questions = await questionModel.getQuestionsByQuiz(attempt.quiz_id);

  let totalScore = 0;
  let totalPoints = 0;

  for (const question of questions) {
    totalPoints += question.points;
    const answer = answers.find((a) => a.question_id === question.id);

    if (answer) {
      if (question.question_type === 'true_false' || question.question_type === 'multiple_choice') {
        if (answer.selected_option_id) {
          const options = await questionModel.getOptionsByQuestion(question.id);
          const selectedOption = options.find((o) => o.id === answer.selected_option_id);

          if (selectedOption?.is_correct) {
            totalScore += question.points;
            await answerModel.updateAnswer(answer.id, true, question.points);
          } else {
            await answerModel.updateAnswer(answer.id, false, 0);
          }
        }
      }
    }
  }

  await attemptModel.gradeAttempt(attempt_id, totalScore, totalPoints);
};
