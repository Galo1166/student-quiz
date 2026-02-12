import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';

export const errorHandler = (err: any, req: AuthRequest, res: Response, next: NextFunction) => {
  console.error(err);

  if (err.message === 'Not Found') {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(500).json({ error: 'Internal server error' });
};
