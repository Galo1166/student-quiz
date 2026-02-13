import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { ArrowLeft, Users, Mail, Calendar, BarChart3 } from 'lucide-react';

/**
 * ManageStudents Component
 * Displays a list of all registered students with their quiz statistics.
 * Shows the number of quiz attempts and average scores for each student.
 */
export function ManageStudents() {
  const { user } = useAuth();
  const { attempts } = useQuiz();
  const navigate = useNavigate();

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const studentUsers = users.filter((u: any) => u.role === 'student');
    setStudents(studentUsers);
  }, [user, navigate]);

  /**
   * Calculates statistics for a specific student
   * Returns total quiz attempts and average score percentage
   */
  const getStudentStats = (studentId: string) => {
    const studentAttempts = attempts.filter(a => a.studentId === studentId);
    const totalAttempts = studentAttempts.length;
    const avgScore = totalAttempts > 0
      ? Math.round(
          studentAttempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) /
            totalAttempts
        )
      : 0;
    
    return { totalAttempts, avgScore };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Manage Students</h1>
              <p className="text-gray-600">View and manage registered students</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Students ({students.length})
            </h2>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No students registered yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(student => {
                const stats = getStudentStats(student.id);
                
                return (
                  <div
                    key={student.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-semibold">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail size={14} />
                          <span>{student.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>Quiz Attempts</span>
                        </div>
                        <span className="font-semibold">{stats.totalAttempts}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BarChart3 size={16} />
                          <span>Avg. Score</span>
                        </div>
                        <span className="font-semibold">{stats.avgScore}%</span>
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
