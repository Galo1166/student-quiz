import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz, type Question } from '../context/QuizContext';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

/**
 * ManageQuestions Component
 * Allows administrators to add, edit, and delete questions for a specific quiz.
 * Displays a form to create/edit questions with multiple choice options.
 */
export function ManageQuestions() {
  const { quizId } = useParams();
  const { user } = useAuth();
  const { quizzes, addQuestion, updateQuestion, deleteQuestion } = useQuiz();
  const navigate = useNavigate();

  const quiz = quizzes.find(q => q.id === quizId);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    if (!quiz) {
      navigate('/admin');
      return;
    }
  }, [user, quiz, navigate]);

  if (!quiz) return null;

  /**
   * Resets the question form to initial state
   * Clears form data and closes add/edit form
   */
  const resetForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
    setEditingQuestion(null);
    setShowAddForm(false);
  };

  /**
   * Loads question data into form for editing
   * Populates form fields with selected question details
   */
  const handleEdit = (question: Question) => {
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
    });
    setEditingQuestion(question.id);
    setShowAddForm(false);
  };

  /**
   * Saves new or updated question to quiz
   * Validates question and options before saving
   * Shows success/error toast messages
   */
  const handleSave = () => {
    if (!formData.question.trim()) {
      toast.error('Question text is required');
      return;
    }

    if (formData.options.some(opt => !opt.trim())) {
      toast.error('All options must be filled');
      return;
    }

    if (editingQuestion) {
      updateQuestion(quiz.id, editingQuestion, formData);
      toast.success('Question updated successfully');
    } else {
      addQuestion(quiz.id, formData);
      toast.success('Question added successfully');
    }

    resetForm();
  };

  /**
   * Deletes a question from the quiz with confirmation
   * Shows confirmation dialog before deletion
   */
  const handleDelete = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(quiz.id, questionId);
      toast.success('Question deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">{quiz.title}</h1>
              <p className="text-gray-600">Manage quiz questions</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Add Question
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Form */}
        {(showAddForm || editingQuestion) && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text *
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your question here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer Options *
                </label>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={formData.correctAnswer === index}
                        onChange={() => setFormData({ ...formData, correctAnswer: index })}
                        className="w-4 h-4"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[index] = e.target.value;
                          setFormData({ ...formData, options: newOptions });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Select the radio button to mark the correct answer
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Save size={20} />
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            Questions ({quiz.questions.length})
          </h2>

          {quiz.questions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No questions added yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={20} />
                Add Your First Question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-medium text-lg flex-1">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(question)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          optIndex === question.correctAnswer
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            optIndex === question.correctAnswer
                              ? 'border-green-600 bg-green-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {optIndex === question.correctAnswer && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className={optIndex === question.correctAnswer ? 'font-medium' : ''}>
                          {option}
                        </span>
                        {optIndex === question.correctAnswer && (
                          <span className="ml-auto text-sm text-green-600 font-medium">
                            Correct Answer
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
