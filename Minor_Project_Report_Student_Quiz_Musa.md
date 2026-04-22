NORTHWEST UNIVERSITY, KANO
FACULTY OF COMPUTING
DEPARTMENT OF INFORMATION AND COMMUNICATION TECHNOLOGY

MINOR PROJECT REPORT

TITLE
DESIGN AND IMPLEMENTATION OF A STUDENT QUIZ MANAGEMENT SYSTEM

PREPARED BY
MUSA MINKAILA TASIU (UG22ICT1065)

SUPERVISOR
MAL. HARUNA DANLAMI IBRAHIM

DATE OF SUBMISSION
APRIL 2026

---

DECLARATION
I hereby declare that this minor project report titled "Design and Implementation of a Student Quiz Management System" is my original work and has not been submitted to any institution for the award of any degree or certificate. All sources used in this work have been properly acknowledged.

Student Name: Musa Minkaila Tasiu (UG22ICT1065)  
Signature: ____________________  
Date: ____________________

---

CERTIFICATION
This is to certify that this minor project report titled "Design and Implementation of a Student Quiz Management System" was carried out by Musa Minkaila Tasiu (UG22ICT1065) under my supervision and has been approved for submission to the Department of Information and Communication Technology, Faculty of Computing, Northwest University, Kano.

Supervisor Name: Mal. Haruna Danlami Ibrahim  
Signature: ____________________  
Date: ____________________

Head of Department: ____________________  
Signature: ____________________  
Date: ____________________

---

DEDICATION
This project is dedicated to Almighty Allah, my parents, and my lecturers for their guidance and support.

---

ACKNOWLEDGEMENT
I thank Almighty Allah for granting me the strength and wisdom to complete this minor project successfully. I sincerely appreciate my supervisor, Mal. Haruna Danlami Ibrahim, for his guidance, corrections, and encouragement throughout the study.

I also acknowledge the Department of Information and Communication Technology, Faculty of Computing, Northwest University, Kano, for creating an enabling academic environment for practical learning. Finally, I appreciate my family and friends for their support and motivation during the period of this project.

---

ABSTRACT
This minor project presents the design and implementation of a Student Quiz Management System developed to improve quiz administration, participation, and result tracking in a digital learning environment. Traditional quiz methods in many learning settings are often manual, time-consuming, and difficult to manage at scale. The developed system addresses these limitations by providing role-based access for administrators and students, secure login and registration, quiz creation and management, timed quiz participation, automated scoring, and result history.

The project was implemented as a web application using React, TypeScript, Vite, and local browser storage for persistent data during development. The system architecture separates concerns into authentication and quiz management contexts, with routed modules for key functions such as dashboard views, quiz creation, question management, quiz attempts, and result visualization. Testing was performed on core modules including authentication, quiz CRUD operations, attempt submission, score computation, and access control.

Results show that the system supports efficient quiz workflow, minimizes marking errors through automatic grading, and provides immediate feedback to students. The project demonstrates that a lightweight web-based quiz platform can significantly improve assessment efficiency and user experience in ICT learning environments.

Keywords: Student quiz system, web application, automated scoring, React, assessment management.

---

TABLE OF CONTENTS
[Generate automatically in Word from headings]

LIST OF TABLES
Table 1: Project objectives and expected outcomes  
Table 2: Functional and non-functional requirements  
Table 3: Test cases and outcomes

LIST OF FIGURES
Figure 1: Student Quiz System architecture overview  
Figure 2: Quiz attempt workflow

LIST OF ABBREVIATIONS
- ICT: Information and Communication Technology
- UI: User Interface
- SDLC: System Development Life Cycle
- CRUD: Create, Read, Update, Delete
- API: Application Programming Interface

---

CHAPTER ONE
INTRODUCTION

1.1 Background of the Study
Digital transformation has influenced assessment methods in education, especially in computing-related disciplines. Manual quiz processes are often inefficient because they require repetitive paper handling, physical grading, and delayed feedback to learners. With increasing class size and demand for timely assessment, institutions need systems that provide faster and more reliable quiz delivery.

A web-based Student Quiz Management System provides a practical solution by enabling online quiz creation, participation, and automatic result processing. This project focuses on building such a system for student-admin interaction in an academic context.

1.2 Problem Statement
Many quiz processes still rely on manual methods that create the following problems:
- Delayed grading and result publication.
- Difficulty in managing quiz questions and student attempts.
- Limited visibility of student performance over time.
- High risk of arithmetic or recording errors in scoring.

Therefore, there is a need for a simple and effective web-based system that supports quiz management, automated scoring, and result tracking.

1.3 Aim and Objectives
1.3.1 Aim
To design and implement a Student Quiz Management System that improves quiz administration and performance tracking.

1.3.2 Objectives
- To develop secure role-based login for students and administrators.
- To implement quiz and question management features for administrators.
- To provide students with an interface to take timed quizzes.
- To compute and store quiz scores automatically.
- To provide dashboards and history views for monitoring quiz performance.

1.4 Research Questions
- How can quiz creation and administration be simplified for instructors/admin users?
- How can students receive faster and more accurate quiz feedback?
- How can quiz records be structured for easy performance tracking?

1.5 Significance of the Study
The project is significant in the following ways:
- Students benefit from instant scoring and performance history.
- Administrators benefit from centralized quiz management.
- Institutions benefit from reduced manual workload and improved assessment transparency.
- The project contributes practical experience in modern web system development.

1.6 Scope and Limitations
Scope:
- User registration and login.
- Role-based access (student/admin).
- Quiz creation, question management, and deletion.
- Quiz participation and automatic score calculation.
- Result and attempt history viewing.

Limitations:
- Data storage is browser-based (localStorage) and not cloud/server persistent.
- Multi-device synchronization is not implemented.
- Advanced proctoring and anti-cheat mechanisms are not included.

1.7 Project Organization
This report is organized into five chapters. Chapter One introduces the study. Chapter Two reviews related literature and concepts. Chapter Three presents methodology and system design. Chapter Four covers implementation, testing, and discussion of results. Chapter Five presents summary, conclusion, and recommendations.

Table 1: Project objectives and expected outcomes

| Objective | Expected Outcome |
|---|---|
| Role-based access | Controlled use of admin/student modules |
| Quiz management | Faster creation and update of assessments |
| Automatic grading | Reduced marking errors and immediate score output |
| Performance history | Better monitoring of student progress |

---

CHAPTER TWO
LITERATURE REVIEW

2.1 Overview
This chapter reviews concepts and prior work related to online quiz systems, web-based assessment, and educational information systems.

2.2 Definition of Terms
- Quiz Management System: A software platform for creating, delivering, and scoring quizzes.
- Automated Scoring: System-generated score based on submitted answers.
- Role-Based Access: Restriction of features according to user type.
- Attempt History: Stored records of user quiz submissions and scores.

2.3 Theoretical/Conceptual Framework
The project is guided by the Computer-Based Testing (CBT) concept and Human-Computer Interaction (HCI) principles. CBT emphasizes efficient digital assessment and faster feedback cycles, while HCI guides interface clarity, usability, and task completion efficiency.

2.4 Empirical Review (Related Works)
Previous studies show that online quiz systems improve assessment turnaround time and reduce administrative burden. Several web-based learning tools include quiz modules with objective question formats and auto-marking. However, many existing systems either focus on full learning management suites or depend on paid infrastructure.

This project focuses on a lightweight, modular quiz platform suitable for departmental use and practical student deployment.

2.5 Research Gap
A practical gap exists in accessible, low-cost quiz systems tailored for small academic environments. Many available systems are either too complex for minor deployment or require significant backend infrastructure. This study fills the gap by providing a functional, front-end driven quiz solution that demonstrates core assessment workflows.

2.6 Summary of Reviewed Works
The reviewed works confirm that web-based quiz platforms improve efficiency and learner engagement. They also indicate the need for user-friendly interfaces, accurate auto-grading, and reliable result history.

2.7 Summary
The chapter established theoretical and empirical support for implementing a student quiz system and provided the basis for the design choices in this project.

---

CHAPTER THREE
METHODOLOGY / SYSTEM DESIGN

3.1 Research Design
This project adopted a design-and-implementation approach under applied software development. Requirement analysis, interface design, coding, testing, and evaluation were carried out iteratively.

3.2 Development Method
An incremental approach was used:
- Requirement gathering from quiz workflow needs.
- UI and navigation design.
- Authentication module development.
- Quiz and question management implementation.
- Attempt submission and scoring logic.
- Testing and refinement.

3.3 Tools and Technologies
- Frontend framework: React
- Language: TypeScript
- Build tool: Vite
- Styling: Tailwind CSS utility classes and component library
- Routing: React Router
- Icons/UI utilities: Lucide React, Sonner notifications
- Data persistence (development phase): localStorage

3.4 Existing System Analysis
The existing/manual process is characterized by delayed grading, paper dependence, limited analytics, and weak retrieval of past records.

3.5 Proposed System
The proposed Student Quiz Management System provides:
- Secure login and role-based routing.
- Admin dashboard for quiz and student management.
- Student dashboard for quiz participation and history.
- Automated scoring and persistent attempt records.

3.6 Functional and Non-Functional Requirements
Functional Requirements
- User registration and login.
- Quiz CRUD for admin.
- Question management per quiz.
- Quiz attempt submission and score generation.
- Result/history retrieval.

Non-Functional Requirements
- Usability: Clear dashboard navigation.
- Performance: Fast page load in standard browsers.
- Reliability: Consistent score calculation.
- Security: Basic access restriction by role.
- Maintainability: Modular components and contexts.

Table 2: Functional and non-functional requirements

| Category | Requirement |
|---|---|
| Functional | Register/login users |
| Functional | Create and manage quizzes/questions |
| Functional | Submit attempts and compute scores |
| Functional | View quiz history and results |
| Non-functional | Easy-to-use interface |
| Non-functional | Reliable local data persistence |
| Non-functional | Maintainable modular codebase |

3.7 System Design
3.7.1 Architecture Overview (Figure 1)
The architecture contains three layers:
- Presentation layer: React pages and UI components.
- Application logic layer: AuthContext and QuizContext.
- Storage layer: Browser localStorage for users, quizzes, and attempts.

Figure 1: Student Quiz System architecture overview

User Interface (Pages/Components)
-> Authentication and Quiz Logic (Contexts)
-> Local Storage (Users, Quizzes, Attempts)

3.7.2 Core Modules
- Authentication module: login, registration, logout, session recovery.
- Admin module: create quiz, manage questions, view results, manage students.
- Student module: view quizzes, take quiz, view result and history.

3.7.3 Workflow (Figure 2)
Figure 2: Quiz attempt workflow

Student Login
-> Select Quiz
-> Answer Questions
-> Submit Attempt
-> Auto Score Computation
-> Result Display and History Update

3.8 Ethical Considerations
The project follows responsible data handling principles:
- User data used for educational demonstration only.
- No sharing of personal data with unauthorized users.
- Objective scoring logic to avoid bias.

3.9 Summary
This chapter described the methodology, tools, requirements, and architecture used to implement the Student Quiz Management System.

---

CHAPTER FOUR
RESULTS, IMPLEMENTATION AND DISCUSSION

4.1 System Specifications
Hardware:
- Minimum 4 GB RAM
- Dual-core processor or higher
- 10 GB free storage

Software:
- Windows operating system
- Node.js and npm
- Modern browser (Chrome/Edge/Firefox)
- VS Code editor

4.2 System Implementation
The system was implemented with route-based modules and context state management.

Implemented pages include:
- Login and Register
- Student Dashboard
- Admin Dashboard
- Create Quiz and Manage Questions
- Take Quiz and Quiz Result
- Quiz History, View Results, Manage Students

Core implementation outcomes:
- Successful role-based navigation.
- Quiz creation and question updates by admin.
- Timed quiz experience and answer submission by student.
- Automatic score generation and attempt storage.

4.3 System Testing
4.3.1 Unit and Feature Testing
The following test cases were performed:

Table 3: Test cases and outcomes

| Test Case | Expected Result | Outcome |
|---|---|---|
| Valid login credentials | User redirected to role dashboard | Pass |
| Invalid login credentials | Login blocked with error feedback | Pass |
| Create new quiz | Quiz appears in admin and student list | Pass |
| Submit quiz attempt | Score calculated and stored | Pass |
| Delete quiz | Quiz removed from list | Pass |

4.3.2 Integration Testing
Integration testing confirmed that authentication, quiz management, attempt submission, and results modules interact correctly and maintain data consistency in local storage.

4.4 Discussion of Findings
The implementation achieved all stated objectives. The system reduced manual assessment effort through automatic scoring and improved access to student performance records. Compared to manual processes, the developed system provides better speed, consistency, and user convenience.

The major observed limitation is local-only storage, which restricts data sharing across devices and long-term centralized administration.

---

CHAPTER FIVE
SUMMARY, CONCLUSION AND RECOMMENDATIONS

5.1 Project Summary
This project designed and implemented a Student Quiz Management System for academic quiz administration. It provides role-based user access, quiz/question management, automated scoring, and result history tracking.

5.2 Conclusion
The developed system successfully addresses common challenges in manual quiz administration. It demonstrates that a modern web-based solution can improve assessment efficiency, score accuracy, and user experience in student evaluation processes.

5.3 Recommendations
- Integrate a backend database (e.g., PostgreSQL/MySQL) for permanent multi-device storage.
- Add stronger authentication and password hashing.
- Include analytics dashboards with charts for performance trends.
- Add timer enforcement and question randomization for improved test integrity.
- Deploy the system online for broader institutional use.

---

REFERENCES
Aina, O. (2013). Industrial training and manpower development in Nigeria. Journal of Education and Practice, 4(5), 12-18.

Al-Smadi, M., & Guetl, C. (2008). Web-based assessment systems: A literature review. International Journal of Emerging Technologies in Learning, 3(1), 18-27.

Pressman, R. S., & Maxim, B. R. (2020). Software engineering: A practitioner's approach (9th ed.). McGraw-Hill.

Sommerville, I. (2016). Software engineering (10th ed.). Pearson.

Smith, J. A. (2021). Modern trends in data analysis. Oxford University Press.

---

APPENDICES

Appendix A: Sample Interview/Requirement Questions
- What challenges do you face in current quiz administration?
- How quickly should students receive quiz results?
- What records should be available to administrators?

Appendix B: Sample Default Accounts Used in Development
- Admin: admin@quiz.com / admin123
- Student: student@quiz.com / student123

Appendix C: User Guide (Short)
1. Register as a student or login with existing credentials.
2. Student selects available quiz and clicks Start Quiz.
3. Student submits answers and views result.
4. Admin creates quizzes, manages questions, and monitors results.
