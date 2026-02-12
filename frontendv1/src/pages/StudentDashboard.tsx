import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { LogOut, Clock, BookOpen, History, FileText } from 'lucide-react';

export function StudentDashboard() {
  const { user, logout } = useAuth();
  const { quizzes, attempts } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userAttempts = attempts.filter(a => a.studentId === user?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold">{user?.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{quizzes.length}</p>
                <p className="text-gray-600">Available Quizzes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{userAttempts.length}</p>
                <p className="text-gray-600">Completed Quizzes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <History size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {userAttempts.length > 0
                    ? Math.round(
                        userAttempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) /
                          userAttempts.length
                      )
                    : 0}%
                </p>
                <p className="text-gray-600">Average Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/student/history"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <History size={32} className="mb-3" />
            <p className="text-sm opacity-90 mb-1">View your</p>
            <p className="text-xl font-semibold">Quiz History</p>
          </Link>
        </div>

        {/* Available Quizzes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Available Quizzes</h2>
          
          {quizzes.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No quizzes available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{quiz.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText size={16} />
                      <span>{quiz.questions.length} questions</span>
                    </div>
                  </div>

                  <Link
                    to={`/student/take-quiz/${quiz.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Start Quiz
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
