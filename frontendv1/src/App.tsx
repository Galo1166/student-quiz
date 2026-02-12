import { BrowserRouter, Routes, Route } from 'react-router';
import { Root } from './components/Root';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { TakeQuiz } from './pages/TakeQuiz';
import { QuizResult } from './pages/QuizResult';
import { QuizHistory } from './pages/QuizHistory';
import { CreateQuiz } from './pages/CreateQuiz';
import { ManageQuestions } from './pages/ManageQuestions';
import { ViewResults } from './pages/ViewResults';
import { ManageStudents } from './pages/ManageStudents';
import { NotFound } from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/take-quiz/:quizId" element={<TakeQuiz />} />
          <Route path="student/quiz-result/:attemptId" element={<QuizResult />} />
          <Route path="student/history" element={<QuizHistory />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-quiz" element={<CreateQuiz />} />
          <Route path="admin/manage-questions/:quizId" element={<ManageQuestions />} />
          <Route path="admin/view-results" element={<ViewResults />} />
          <Route path="admin/manage-students" element={<ManageStudents />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
