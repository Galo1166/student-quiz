import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (name: string, email: string, password: string, role: 'admin' | 'student'): Promise<User> => {
  const id = uuidv4();
  const result = await query(
    'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, name, email, password, role]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const getAllStudents = async (): Promise<User[]> => {
  const result = await query('SELECT id, name, email, created_at FROM users WHERE role = $1', ['student']);
  return result.rows;
};
