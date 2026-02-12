import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  student_id: string;
  started_at: Date;
  submitted_at: Date | null;
  score: number | null;
  total_points: number | null;
  status: 'in_progress' | 'submitted' | 'graded';
  created_at: Date;
  updated_at: Date;
}

export const createQuizAttempt = async (quiz_id: string, student_id: string): Promise<QuizAttempt> => {
  const id = uuidv4();
  const result = await query(
    'INSERT INTO quiz_attempts (id, quiz_id, student_id, started_at, status) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING *',
    [id, quiz_id, student_id, 'in_progress']
  );
  return result.rows[0];
};

export const getAttemptById = async (id: string): Promise<QuizAttempt | null> => {
  const result = await query('SELECT * FROM quiz_attempts WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const getAttemptsByStudent = async (student_id: string): Promise<QuizAttempt[]> => {
  const result = await query('SELECT * FROM quiz_attempts WHERE student_id = $1 ORDER BY created_at DESC', [student_id]);
  return result.rows;
};

export const getAttemptsByQuiz = async (quiz_id: string): Promise<QuizAttempt[]> => {
  const result = await query('SELECT * FROM quiz_attempts WHERE quiz_id = $1 ORDER BY created_at DESC', [quiz_id]);
  return result.rows;
};

export const submitAttempt = async (id: string): Promise<QuizAttempt> => {
  const result = await query(
    'UPDATE quiz_attempts SET submitted_at = CURRENT_TIMESTAMP, status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    ['submitted', id]
  );
  return result.rows[0];
};

export const gradeAttempt = async (id: string, score: number, total_points: number): Promise<QuizAttempt> => {
  const result = await query(
    'UPDATE quiz_attempts SET score = $1, total_points = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
    [score, total_points, 'graded', id]
  );
  return result.rows[0];
};
