import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './views/LoginPage';
import { StudentDashboard } from './views/StudentDashBoard';
import { TeacherDashboard } from './views/TeacherDashboard';
import { PageLayout } from './views/PageLayout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AttendanceView } from './views/AttendanceView';
import { LessonPlanView } from './views/LessonPlanView';
import { TeacherGradesView } from './views/TeacherGradesView';
import { TeacherAttendanceView } from './views/TeacherAttendanceView';
import { GradesView } from './views/GradesView';
import type { Lesson, StudentAttendance, StudentGrades, TeacherAttendanceEntry, TeacherGradeEntry, User } from './types';

const teacherUser = {
  role: 'teacher',
  name: 'Mrs. Nowak',
};

const lessonPlan = [
    {
      day: 'Monday',
      start: '08:00',
      end: '08:45',
      subject: 'Math',
      room: '201',
      attendance: 'Present',
    },
    {
      day: 'Monday',
      start: '09:00',
      end: '09:45',
      subject: 'English',
      room: '105',
      attendance: 'Present',
    },
    {
      day: 'Tuesday',
      start: '08:00',
      end: '08:45',
      subject: 'Biology',
      room: '401',
      attendance: 'Present',
    },
    {
      day: 'Wednesday',
      start: '10:00',
      end: '10:45',
      subject: 'Physics',
      room: '302',
      attendance: 'Absent',
    },
    {
      day: 'Thursday',
      start: '11:00',
      end: '11:45',
      subject: 'History',
      room: '204',
      attendance: 'Late',
    },
    {
      day: 'Friday',
      start: '12:00',
      end: '12:45',
      subject: 'IT',
      room: '501',
      attendance: 'Present',
    },
  ];

  /*
const grades: StudentGrades[] = [
{
    subject: 'Mathematics',
    entries: [
    { grade: '5', teacher: 'Mrs. Nowak', date: '2026-05-02' },
    { grade: '4+', teacher: 'Mr. Zielinski', date: '2026-05-10' },
    ],
},
{
    subject: 'History',
    entries: [
    { id: 3, grade: '3', teacher: 'Mrs. Lis', date: '2026-05-06' },
    ],
},
{
    subject: 'Physics',
    entries: [
    { id: 4, grade: '5-', teacher: 'Mr. Adamski', date: '2026-05-11' },
    ],
},
];
*/

const attendance: StudentAttendance[] = [
    { date: '2026-05-10', subject: 'Mathematics', status: 'Present' },
    { date: '2026-05-11', subject: 'History', status: 'Absent' },
    { date: '2026-05-12', subject: 'Physics', status: 'Late' },
    { date: '2026-05-13', subject: 'English', status: 'Present' },
  ];

/*
const teacherGradeEntries: TeacherGradeEntry[] = [
{ student: 'Anna Nowak', subject: 'Math', grade: '5' },
{ student: 'John Smith', subject: 'Physics', grade: '4+' },
{ student: 'Emily Clark', subject: 'History', grade: '3' },
];
*/

const teacherAttendance: TeacherAttendanceEntry[] = [
{ student: 'Anna Nowak', subject: 'Math', status: 'Present' },
{ student: 'John Smith', subject: 'Physics', status: 'Absent' },
{ student: 'Emily Clark', subject: 'History', status: 'Late' },
];

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
  */

function App() {
  const [user, setUser] = useState<null | User>(null);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6 font-sans">
      <BrowserRouter>
        <div className="max-w-7xl mx-auto space-y-8">
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

            {user?.role == "Uczen" && (
              <>
            <Route
              path="/student/dashboard"
              element={<StudentDashboard user={user} />}
            />

            <Route
              path="/student/grades"
              element={
                <PageLayout title="Grades">
                  <GradesView user={user} />
                </PageLayout>
              }
            />

            <Route
              path="/student/attendance"
              element={
                <PageLayout title="Attendance">
                  <AttendanceView attendance={attendance} />
                </PageLayout>
              }
            />

            <Route
              path="/student/lesson-plan"
              element={
                <PageLayout title="Lesson Plan">
                  <LessonPlanView lessonPlan={lessonPlan} />
                </PageLayout>
              }
            />
          </>
            )}

          {user?.role == "Nauczyciel" && (
              <>
            <Route
              path="/teacher/dashboard"
              element={<TeacherDashboard user={user} />}
            />

            <Route
              path="/teacher/grades"
              element={
                <PageLayout title="Manage Grades">
                  <TeacherGradesView user={user} />
                </PageLayout>
              }
            />

            <Route
              path="/teacher/attendance"
              element={
                <PageLayout title="Manage Attendance">
                  <TeacherAttendanceView attendanceEntries={teacherAttendance} />
                </PageLayout>
              }
            />

            <Route
              path="/teacher/lesson-plan"
              element={
                <PageLayout title="Lesson Plan">
                  <LessonPlanView lessonPlan={lessonPlan} />
                </PageLayout>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
            </> )}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
