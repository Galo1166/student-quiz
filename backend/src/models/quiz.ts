import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  admin_id: string;
  duration_minutes: number;
  passing_score: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export const createQuiz = async (
  title: string,
  description: string,
  admin_id: string,
  duration_minutes: number,
  passing_score: number
): Promise<Quiz> => {
  const id = uuidv4();
  const result = await query(
    'INSERT INTO quizzes (id, title, description, admin_id, duration_minutes, passing_score) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, title, description, admin_id, duration_minutes, passing_score]
  );
  return result.rows[0];
};

export const getQuizById = async (id: string): Promise<Quiz | null> => {
  const result = await query('SELECT * FROM quizzes WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const getAllQuizzes = async (): Promise<Quiz[]> => {
  const result = await query('SELECT * FROM quizzes WHERE is_active = true ORDER BY created_at DESC');
  return result.rows;
};

export const getQuizzesByAdmin = async (admin_id: string): Promise<Quiz[]> => {
  const result = await query('SELECT * FROM quizzes WHERE admin_id = $1 ORDER BY created_at DESC', [admin_id]);
  return result.rows;
};

export const updateQuiz = async (id: string, title: string, description: string, duration_minutes: number, passing_score: number): Promise<Quiz> => {
  const result = await query(
    'UPDATE quizzes SET title = $1, description = $2, duration_minutes = $3, passing_score = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
    [title, description, duration_minutes, passing_score, id]
  );
  return result.rows[0];
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await query('DELETE FROM quizzes WHERE id = $1', [id]);
};
