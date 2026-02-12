import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'short_answer' | 'true_false';
  points: number;
  order_num: number;
  created_at: Date;
  updated_at: Date;
}

export interface Option {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  order_num: number;
}

export const createQuestion = async (
  quiz_id: string,
  question_text: string,
  question_type: 'multiple_choice' | 'short_answer' | 'true_false',
  points: number,
  order_num: number
): Promise<Question> => {
  const id = uuidv4();
  const result = await query(
    'INSERT INTO questions (id, quiz_id, question_text, question_type, points, order_num) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, quiz_id, question_text, question_type, points, order_num]
  );
  return result.rows[0];
};

export const getQuestionsByQuiz = async (quiz_id: string): Promise<Question[]> => {
  const result = await query('SELECT * FROM questions WHERE quiz_id = $1 ORDER BY order_num', [quiz_id]);
  return result.rows;
};

export const getQuestionById = async (id: string): Promise<Question | null> => {
  const result = await query('SELECT * FROM questions WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const updateQuestion = async (
  id: string,
  question_text: string,
  question_type: string,
  points: number,
  order_num: number
): Promise<Question> => {
  const result = await query(
    'UPDATE questions SET question_text = $1, question_type = $2, points = $3, order_num = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
    [question_text, question_type, points, order_num, id]
  );
  return result.rows[0];
};

export const deleteQuestion = async (id: string): Promise<void> => {
  await query('DELETE FROM questions WHERE id = $1', [id]);
};

export const createOption = async (
  question_id: string,
  option_text: string,
  is_correct: boolean,
  order_num: number
): Promise<Option> => {
  const id = uuidv4();
  const result = await query(
    'INSERT INTO options (id, question_id, option_text, is_correct, order_num) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, question_id, option_text, is_correct, order_num]
  );
  return result.rows[0];
};

export const getOptionsByQuestion = async (question_id: string): Promise<Option[]> => {
  const result = await query('SELECT id, option_text, is_correct, order_num FROM options WHERE question_id = $1 ORDER BY order_num', [question_id]);
  return result.rows;
};

export const deleteOption = async (id: string): Promise<void> => {
  await query('DELETE FROM options WHERE id = $1', [id]);
};
