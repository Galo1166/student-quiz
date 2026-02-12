# Student Quiz Backend

Node.js + Express + PostgreSQL backend for the Student Quiz Application.

## Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Copy `.env.example` to `.env` and update with your PostgreSQL credentials:
```bash
cp .env.example .env
```

2. Update `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_quiz
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

3. Install dependencies:
```bash
npm install
```

### Database Setup

Create a PostgreSQL database:
```bash
createdb student_quiz
```

The backend will automatically create all tables on startup.

### Running the Server

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID with questions
- `POST /api/quizzes` - Create new quiz (admin only)
- `PUT /api/quizzes/:id` - Update quiz (admin only)
- `DELETE /api/quizzes/:id` - Delete quiz (admin only)
- `GET /api/quizzes/admin/my-quizzes` - Get current admin's quizzes

### Questions
- `POST /api/questions` - Create question (admin only)
- `POST /api/questions/options` - Add option to question (admin only)
- `PUT /api/questions/:id` - Update question (admin only)
- `DELETE /api/questions/:id` - Delete question (admin only)
- `DELETE /api/questions/options/:id` - Delete option (admin only)

### Quiz Attempts
- `POST /api/attempts/start` - Start quiz attempt
- `POST /api/attempts/answer` - Submit answer
- `POST /api/attempts/submit` - Submit quiz
- `GET /api/attempts/:id` - Get attempt result
- `GET /api/attempts` - Get all attempts by current student
- `GET /api/attempts/quiz/:quiz_id` - Get all attempts for quiz (admin only)

### Students
- `GET /api/students` - Get all students (admin only)

## Project Structure

```
src/
├── config/          # Configuration files
├── models/          # Database models
├── controllers/     # Route controllers
├── routes/          # Route definitions
├── middleware/      # Custom middleware
└── index.ts         # Main entry point
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT secret key
- `CORS_ORIGIN` - CORS allowed origin

## Technologies

- **Express.js** - Web framework
- **PostgreSQL** - Database
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing
