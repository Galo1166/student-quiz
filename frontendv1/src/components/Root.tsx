import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from '../context/AuthContext';
import { QuizProvider } from '../context/QuizContext';

export function Root() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Outlet />
        <Toaster position="top-right" />
      </QuizProvider>
    </AuthProvider>
  );
}
