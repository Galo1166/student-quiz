import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  createdBy: string;
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  studentName: string;
  answers: { [questionId: string]: number };
  score: number;
  totalQuestions: number;
  completedAt: string;
}

interface QuizContextType {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  addQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  updateQuiz: (quizId: string, quiz: Partial<Quiz>) => void;
  deleteQuiz: (quizId: string) => void;
  addQuestion: (quizId: string, question: Omit<Question, 'id'>) => void;
  updateQuestion: (quizId: string, questionId: string, question: Partial<Question>) => void;
  deleteQuestion: (quizId: string, questionId: string) => void;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => string;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      const savedQuizzes = localStorage.getItem('quizzes');
      const savedAttempts = localStorage.getItem('quizAttempts');

      if (savedQuizzes) {
        setQuizzes(JSON.parse(savedQuizzes));
      } else {
      // Create default admin user and sample quiz
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.length === 0) {
        const defaultAdmin = {
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@quiz.com',
          password: 'admin123',
          role: 'admin',
        };
        const defaultStudent = {
          id: 'student1',
          name: 'John Doe',
          email: 'student@quiz.com',
          password: 'student123',
          role: 'student',
        };
        localStorage.setItem('users', JSON.stringify([defaultAdmin, defaultStudent]));
      }

      const defaultQuiz: Quiz = {
        id: '1',
        title: 'Multiple Choice Questions (MCQs)',
        description: 'Test your knowledge of Networking fundamentals',
        duration: 30,
        createdBy: 'admin1',
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            question: 'What does CPU stands for?',
            options: ['Central Processing Unit', 'Computer Processing Unit', 'Control Processing Unit', 'Core Processing Unit'],
            correctAnswer: 0,
          },
          {
            id: 'q2',
            question: 'Which of the following is an input device?',
            options: ['Keyboard', 'Monitor', 'Printer', 'Speaker'],
            correctAnswer: 0,
          },
          {
            id: 'q3',
            question: 'Which language is mainly used for web page structure?',
            options: ['HTML', 'C++', 'Java', 'Python'],
            correctAnswer: 0,
          },
          {
            id: 'q4',
            question: 'What is the main function of an operating system?',
            options: ['Manage computer hardware and software', 'Compile code', 'Design user interfaces', 'Store data'],
            correctAnswer: 0,
          },
          {
            id: 'q5',
            question: 'Which of these is a database markup language?',
            options: ['MySQL', 'Microsoft Word', 'VLC', 'Photoshop'],
            correctAnswer: 0,
          },
          {
            id: 'q6',
            question: 'What does RAM stand for in computer memory?',
            options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Remote Access Memory'],
            correctAnswer: 0,
          },
          {
            id: 'q7',
            question: 'Which protocol is used to transfer web pages over the internet?',
            options: ['FTP', 'HTTP', 'TCP', 'UDP'],
            correctAnswer: 1,
          },
          {
            id: 'q8',
            question: 'In Wxcel, which symbol is used to start a formula?',
            options: ['=', '#', '@', '$'],
            correctAnswer: 0,
          },
          {
            id: 'q9',
            question: 'What is debugging in programming?',
            options: ['Finding and fixing errors in code', 'Writing new code', 'Testing user interface', 'Optimizing performance'],
            correctAnswer: 0,
          },
          {
            id: 'q10',
            question: 'Which of the following is a back-end programming language?',
            options: ['JavaScript(Node.js)', 'Powerpoint', 'HTML', 'CSS'],
            correctAnswer: 0,
          },
        ],
      };
        setQuizzes([defaultQuiz]);
        localStorage.setItem('quizzes', JSON.stringify([defaultQuiz]));
      }

      if (savedAttempts) {
        setAttempts(JSON.parse(savedAttempts));
      }
    };

    loadData();
  }, [refreshTrigger]);

  const addQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...quizzes, newQuiz];
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setRefreshTrigger(prev => prev + 1);
  };

  const updateQuiz = (quizId: string, quiz: Partial<Quiz>) => {
    const updated = quizzes.map(q => q.id === quizId ? { ...q, ...quiz } : q);
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setRefreshTrigger(prev => prev + 1);
  };

  const deleteQuiz = (quizId: string) => {
    const updated = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setRefreshTrigger(prev => prev + 1);
  };

  const addQuestion = (quizId: string, question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
    };
    const updated = quizzes.map(q => 
      q.id === quizId 
        ? { ...q, questions: [...q.questions, newQuestion] }
        : q
    );
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setRefreshTrigger(prev => prev + 1);
  };

  const updateQuestion = (quizId: string, questionId: string, question: Partial<Question>) => {
    const updated = quizzes.map(q => 
      q.id === quizId 
        ? {
            ...q,
            questions: q.questions.map(ques => 
              ques.id === questionId ? { ...ques, ...question } : ques
            ),
          }
        : q
    );
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setRefreshTrigger(prev => prev + 1);
  };

  const deleteQuestion = (quizId: string, questionId: string) => {
    const updated = quizzes.map(q => 
      q.id === quizId 
        ? { ...q, questions: q.questions.filter(ques => ques.id !== questionId) }
        : q
    );
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setRefreshTrigger(prev => prev + 1);
  };

  const submitQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: Date.now().toString(),
      completedAt: new Date().toISOString(),
    };
    const updated = [...attempts, newAttempt];
    setAttempts(updated);
    localStorage.setItem('quizAttempts', JSON.stringify(updated));
    setRefreshTrigger(prev => prev + 1);
    return newAttempt.id;
  };

  return (
    <QuizContext.Provider value={{
      quizzes,
      attempts,
      addQuiz,
      updateQuiz,
      deleteQuiz,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      submitQuizAttempt,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
}