import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { StudentDashboard } from "./pages/StudentDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { TakeQuiz } from "./pages/TakeQuiz";
import { QuizResult } from "./pages/QuizResult";
import { QuizHistory } from "./pages/QuizHistory";
import { CreateQuiz } from "./pages/CreateQuiz";
import { ManageQuestions } from "./pages/ManageQuestions";
import { ViewResults } from "./pages/ViewResults";
import { ManageStudents } from "./pages/ManageStudents";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "register", Component: Register },
      { path: "student", Component: StudentDashboard },
      { path: "student/take-quiz/:quizId", Component: TakeQuiz },
      { path: "student/quiz-result/:attemptId", Component: QuizResult },
      { path: "student/history", Component: QuizHistory },
      { path: "admin", Component: AdminDashboard },
      { path: "admin/create-quiz", Component: CreateQuiz },
      { path: "admin/manage-questions/:quizId", Component: ManageQuestions },
      { path: "admin/view-results", Component: ViewResults },
      { path: "admin/manage-students", Component: ManageStudents },
      { path: "*", Component: NotFound },
    ],
  },
]);
