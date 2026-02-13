import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { ArrowLeft, Calendar, Trophy, Filter } from 'lucide-react';

/**
 * ViewResults Component
 * Displays all student quiz attempts and results for administrators.
 * Allows filtering by quiz and sorting by completion date.
 */
export function ViewResults() {
  const { user } = useAuth();
  const { attempts, quizzes } = useQuiz();
  const navigate = useNavigate();

  const [selectedQuiz, setSelectedQuiz] = useState<string>('all');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const filteredAttempts = selectedQuiz === 'all'
    ? attempts
    : attempts.filter(a => a.quizId === selectedQuiz);

  const sortedAttempts = [...filteredAttempts].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Back button: Returns to admin dashboard */}
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Student Results</h1>
              <p className="text-gray-600">View all quiz attempts and scores</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-600" />
            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Quizzes</option>
              {quizzes.map(quiz => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            Results ({sortedAttempts.length})
          </h2>

          {sortedAttempts.length === 0 ? (
            <div className="text-center py-12">
              <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No quiz attempts yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Quiz</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Percentage</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAttempts.map(attempt => {
                    const quiz = quizzes.find(q => q.id === attempt.quizId);
                    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    const passed = percentage >= 50;

                    return (
                      <tr key={attempt.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {attempt.studentName.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{attempt.studentName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium">{quiz?.title || 'Unknown Quiz'}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={16} />
                            <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium">
                            {attempt.score} / {attempt.totalQuestions}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Trophy size={16} className={passed ? 'text-green-600' : 'text-red-600'} />
                            <span className="font-semibold">{percentage}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {passed ? 'Passed' : 'Failed'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
