import { Outlet, NavLink } from "react-router-dom";
import type { User } from "../types";

export function StudentLayout({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Topbar */}
        <header className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-500">Student Portal</p>
            <h1 className="text-3xl font-bold">
              Welcome back, {user.name}
            </h1>
          </div>

          <button className="rounded-xl bg-red-500 px-4 py-2 text-white">
            Logout
          </button>
        </header>


        {/* Nested pages */}
        <Outlet />
      </div>
    </div>
  );
}