import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { Trophy, CheckCircle2, XCircle, Home, History } from 'lucide-react';

/**
 * QuizResult Component
 * Displays detailed results for a completed quiz attempt.
 * Shows overall score, answer review, and pass/fail status.
 */
export function QuizResult() {
  const { attemptId } = useParams();
  const { user } = useAuth();
  const { attempts, quizzes } = useQuiz();
  const navigate = useNavigate();

  const attempt = attempts.find(a => a.id === attemptId);
  const quiz = quizzes.find(q => q.id === attempt?.quizId);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
      return;
    }

    if (!attempt || attempt.studentId !== user.id) {
      navigate('/student');
      return;
    }
  }, [user, attempt, navigate]);

  if (!attempt || !quiz || !user) return null;

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const passed = percentage >= 50;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Result Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
            >
              <Trophy size={40} />
            </div>
            <h1 className="text-3xl font-semibold mb-2">Quiz Completed!</h1>
            <p className="text-gray-600">{quiz.title}</p>
          </div>

          {/* Score */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <div className="text-center">
              <p className="text-6xl font-bold mb-2" style={{ color: passed ? '#059669' : '#dc2626' }}>
                {percentage}%
              </p>
              <p className="text-xl text-gray-600">
                {attempt.score} out of {attempt.totalQuestions} correct
              </p>
              <p
                className={`mt-4 inline-block px-6 py-2 rounded-full font-medium ${
                  passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {passed ? 'Passed' : 'Failed'}
              </p>
            </div>
          </div>

          {/* Question Review */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Answer Review</h2>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const userAnswer = attempt.answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-lg p-4 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle2 size={24} className="text-green-600" />
                        ) : (
                          <XCircle size={24} className="text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-2 text-sm">
                          {userAnswer !== undefined && (
                            <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              Your answer: {question.options[userAnswer]}
                            </p>
                          )}
                          {!isCorrect && (
                            <p className="text-green-700">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          {userAnswer === undefined && (
                            <p className="text-gray-600">Not answered</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            to="/student"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Home size={20} />
            Back to Dashboard
          </Link>
          <Link
            to="/student/history"
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <History size={20} />
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}
