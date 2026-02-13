import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { ArrowLeft, Calendar, Trophy, FileText } from 'lucide-react';

/**
 * QuizHistory Component
 * Displays all quiz attempts for the current student.
 * Shows scores, dates, and completion status for each quiz.
 */
export function QuizHistory() {
  const { user } = useAuth();
  const { attempts, quizzes } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
    }
  }, [user, navigate]);

  const userAttempts = attempts
    .filter(a => a.studentId === user?.id)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Back button: Returns to student dashboard */}
            <Link
              to="/student"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Quiz History</h1>
              <p className="text-gray-600">View all your past quiz attempts</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userAttempts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Quiz History</h2>
            <p className="text-gray-600 mb-6">You haven't completed any quizzes yet</p>
            {/* Link to return to dashboard and take a quiz */}
            <Link
              to="/student"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Take Your First Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userAttempts.map(attempt => {
              const quiz = quizzes.find(q => q.id === attempt.quizId);
              if (!quiz) return null;

              const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
              const passed = percentage >= 50;

              return (
                <div key={attempt.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                          <span className="ml-1">{new Date(attempt.completedAt).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={16} />
                          <span>{attempt.totalQuestions} questions</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Trophy size={20} className={passed ? 'text-green-600' : 'text-red-600'} />
                          <span className="font-semibold">{percentage}%</span>
                        </div>
                        <span className="text-gray-600">
                          {attempt.score} / {attempt.totalQuestions} correct
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </div>
                    {/* Link to view detailed results and answer review for this quiz attempt */}
                    <Link
                      to={`/student/quiz-result/${attempt.id}`}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
