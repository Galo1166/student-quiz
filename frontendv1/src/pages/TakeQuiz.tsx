import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { Clock, ChevronLeft, ChevronRight, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function TakeQuiz() {
  const { quizId } = useParams();
  const { user } = useAuth();
  const { quizzes, submitQuizAttempt } = useQuiz();
  const navigate = useNavigate();

  const quiz = quizzes.find(q => q.id === quizId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasAutoSubmitted = useRef(false);
  const answersRef = useRef(answers);

  // Keep answersRef in sync with answers state
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
      return;
    }

    if (!quiz) {
      navigate('/student');
      return;
    }

    setTimeLeft(quiz.duration * 60);
    hasAutoSubmitted.current = false;
  }, [user, quiz, navigate]);

  // Timer countdown effect - only manages the countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft === 0 || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return null;
        const newTime = prev - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  // Separate effect to handle when time expires
  useEffect(() => {
    if (timeLeft !== 0 || !quiz || !user || hasAutoSubmitted.current || isSubmitted) return;

    hasAutoSubmitted.current = true;
    setIsSubmitted(true);

    let score = 0;
    quiz.questions.forEach(q => {
      if (answersRef.current[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const attemptId = submitQuizAttempt({
      quizId: quiz.id,
      studentId: user.id,
      studentName: user.name,
      answers: answersRef.current,
      score,
      totalQuestions: quiz.questions.length,
    });

    toast.error('Time expired! Quiz submitted automatically.');
    navigate(`/student/quiz-result/${attemptId}`);
  }, [timeLeft, quiz, user, submitQuizAttempt, navigate, isSubmitted]);

  if (!quiz || !user) return null;

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    if (isSubmitted || hasAutoSubmitted.current) return;
    setIsSubmitted(true);
    hasAutoSubmitted.current = true;
    
    let score = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const attemptId = submitQuizAttempt({
      quizId: quiz.id,
      studentId: user.id,
      studentName: user.name,
      answers,
      score,
      totalQuestions: quiz.questions.length,
    });

    toast.success('Quiz submitted successfully!');
    navigate(`/student/quiz-result/${attemptId}`);
  };

  const minutes = timeLeft ? Math.floor(timeLeft / 60) : 0;
  const seconds = timeLeft ? timeLeft % 60 : 0;
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{quiz.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeLeft && timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              <Clock size={20} />
              <span className="font-semibold">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Time Warning */}
      {timeLeft && timeLeft < 300 && timeLeft > 0 && (
        <div className="bg-orange-50 border-b border-orange-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-orange-700">
            <AlertCircle size={20} />
            <span className="font-medium">Less than 5 minutes remaining! Make sure to submit your answers.</span>
          </div>
        </div>
      )}

      {/* Question */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <p className="text-lg mb-6">{question.question}</p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  answers[question.id] === index
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[question.id] === index
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {answers[question.id] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="flex gap-3">
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Send size={20} />
                Submit Quiz
              </button>
            ) : (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
                >
                  Submit Early
                </button>
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(quiz.questions.length - 1, prev + 1))}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-medium text-gray-700 mb-4">Question Navigator</p>
          <div className="grid grid-cols-10 gap-2">
            {quiz.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`aspect-square rounded-lg text-sm font-medium transition ${
                  currentQuestion === index
                    ? 'bg-blue-600 text-white'
                    : answers[q.id] !== undefined
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
