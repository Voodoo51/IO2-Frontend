import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage({ onLogin }: any) {
  const navigate = useNavigate();

  const loginAsStudent = () => {
    navigate("/student/dashboard");
  };

  const loginAsTeacher = () => {
    navigate("/teacher/dashboard");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    // successful login
    console.log(data);

    if(data.role === "Uczen") loginAsStudent();
    else if(data.role === "Nauczyciel") loginAsTeacher();

    onLogin(data);
    // do nothing for now
  } catch (error) {
    console.error(error);
  }
};

   return (
    <section className="bg-white rounded-3xl shadow-xl p-8 grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          GradeBook Portal
        </div>
        <h1 className="text-5xl font-bold tracking-tight">Modern school gradebook frontend</h1>
        <p className="text-slate-600 text-lg">
          A clean frontend prototype for students and teachers with grades and attendance management.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="student@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white py-3 font-semibold shadow-lg shadow-blue-200"
            >
              Login
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}