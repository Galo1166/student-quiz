import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import { initializeTables } from './models/schema.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import questionRoutes from './routes/question.js';
import attemptRoutes from './routes/attempt.js';
import studentRoutes from './routes/student.js';

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Initialize database tables
try {
  await initializeTables();
  console.log('Database tables initialized');
} catch (error) {
  console.error('Failed to initialize database tables:', error);
}

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/students', studentRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
