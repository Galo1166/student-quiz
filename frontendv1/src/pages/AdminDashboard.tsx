import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { LogOut, Plus, BookOpen, Users, BarChart3, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const { quizzes, deleteQuiz, attempts } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteQuiz = (quizId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteQuiz(quizId);
      toast.success('Quiz deleted successfully');
    }
  };

  const totalStudents = new Set(attempts.map(a => a.studentId)).size;
  const totalAttempts = attempts.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-600">Admin Panel</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{quizzes.length}</p>
                <p className="text-gray-600">Total Quizzes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{totalStudents}</p>
                <p className="text-gray-600">Active Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{totalAttempts}</p>
                <p className="text-gray-600">Total Attempts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {totalAttempts > 0
                    ? Math.round(
                        attempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) /
                          totalAttempts
                      )
                    : 0}%
                </p>
                <p className="text-gray-600">Avg. Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/create-quiz"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <Plus size={32} className="mb-3" />
            <p className="text-sm opacity-90 mb-1">Create New</p>
            <p className="text-xl font-semibold">Quiz</p>
          </Link>

          <Link
            to="/admin/view-results"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <BarChart3 size={32} className="mb-3" />
            <p className="text-sm opacity-90 mb-1">View</p>
            <p className="text-xl font-semibold">Student Results</p>
          </Link>

          <Link
            to="/admin/manage-students"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <Users size={32} className="mb-3" />
            <p className="text-sm opacity-90 mb-1">Manage</p>
            <p className="text-xl font-semibold">Students</p>
          </Link>
        </div>

        {/* Quizzes List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Quizzes</h2>
            <Link
              to="/admin/create-quiz"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Create Quiz
            </Link>
          </div>

          {quizzes.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No quizzes created yet</p>
              <Link
                to="/admin/create-quiz"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={20} />
                Create Your First Quiz
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {quizzes.map(quiz => {
                const quizAttempts = attempts.filter(a => a.quizId === quiz.id);
                const avgScore = quizAttempts.length > 0
                  ? Math.round(
                      quizAttempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) /
                        quizAttempts.length
                    )
                  : 0;

                return (
                  <div key={quiz.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>{quiz.questions.length} questions</span>
                          <span>{quiz.duration} minutes</span>
                          <span>{quizAttempts.length} attempts</span>
                          {quizAttempts.length > 0 && <span>Avg. Score: {avgScore}%</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link
                          to={`/admin/manage-questions/${quiz.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Manage Questions"
                        >
                          <Edit size={20} />
                        </Link>
                        <button
                          onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Quiz"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
