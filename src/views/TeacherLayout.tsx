import { Outlet, NavLink } from "react-router-dom";
import type { User } from "../types";

export function TeacherLayout({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        <header className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-500">Teacher Portal</p>
            <h1 className="text-3xl font-bold">
              Welcome, {user.name}
            </h1>
          </div>

          <button className="rounded-xl bg-red-500 px-4 py-2 text-white">
            Logout
          </button>
        </header>

        <nav className="bg-white rounded-2xl shadow p-4 flex gap-4">
          <NavLink to="/teacher/dashboard">Dashboard</NavLink>
          <NavLink to="/teacher/grades">Grades</NavLink>
          <NavLink to="/teacher/attendance">Attendance</NavLink>
          <NavLink to="/teacher/lesson-plan">Lesson Plan</NavLink>
          <NavLink to="/teacher/statistics">Statistics</NavLink>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}