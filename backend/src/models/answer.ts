import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';

export interface Answer {
  id: string;
  attempt_id: string;
  question_id: string;
  answer_text: string | null;
  selected_option_id: string | null;
  is_correct: boolean | null;
  points_earned: number;
  created_at: Date;
}

export const createAnswer = async (
  attempt_id: string,
  question_id: string,
  answer_text: string | null,
  selected_option_id: string | null
): Promise<Answer> => {
  const id = uuidv4();
  const result = await query(
    'INSERT INTO answers (id, attempt_id, question_id, answer_text, selected_option_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, attempt_id, question_id, answer_text, selected_option_id]
  );
  return result.rows[0];
};

export const getAnswersByAttempt = async (attempt_id: string): Promise<Answer[]> => {
  const result = await query('SELECT * FROM answers WHERE attempt_id = $1', [attempt_id]);
  return result.rows;
};

export const updateAnswer = async (
  id: string,
  is_correct: boolean,
  points_earned: number
): Promise<Answer> => {
  const result = await query(
    'UPDATE answers SET is_correct = $1, points_earned = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [is_correct, points_earned, id]
  );
  return result.rows[0];
};
