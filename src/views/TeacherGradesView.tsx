import { useState, useRef, useEffect } from 'react';
import type { StudentGrades, TeacherGradeEntries, TeacherGradeEntry, User } from '../types';

export function TeacherGradesView({ user }: {user: User}) {

 const [gradeEntries, setGradeEntries] = useState<TeacherGradeEntries[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const hasFetchedRef = useRef(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState({
      value: "",
      weight: "",
      text: "",
      studentId: "",
      teacherId: user.id,
      subjectId: "",
    });

async function fetchGrades() {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:8080/user/teacherGrades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id }),
    });

    if (!res.ok) throw new Error("Failed to fetch grades");

    const data: TeacherGradeEntries[] = await res.json();
    setGradeEntries(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
    setLoading(false);
  }
}

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !hasFetchedRef.current) {
          hasFetchedRef.current = true;
          fetchGrades();
        }
      });

      observer.observe(el);
      return () => observer.disconnect();
    }, [user.id]);
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    async function handleSubmit() {
      try {
        const payload = {
          value: Number(form.value),
          weight: Number(form.weight),
          text: form.text,
          studentId: Number(form.studentId),
          teacherId: Number(form.teacherId),
          subjectId: Number(form.subjectId),
        };

        const res = await fetch("http://localhost:8080/user/grade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to add grade");

        const newData = await res.json();

await fetchGrades();
        // optionally refresh list or append
        console.log(newData);

        setIsModalOpen(false);
      } catch (err) {
        console.error(err);
      }
    }


return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Grade Management</h3>
          <p className="text-slate-500">Add or remove student grades</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl bg-blue-600 text-white px-5 py-3 font-medium"
        >
          + Add Grade
        </button>
      </div>

      {loading && <p className="text-slate-500">Loading grades...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div ref={containerRef} className="space-y-5">
        {gradeEntries.map((subject) => (
          <div
            key={subject.subject}
            className="border border-slate-200 rounded-2xl overflow-hidden"
          >
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-semibold text-lg">{subject.subject}</h4>
              <span className="text-sm text-slate-500">
                {subject.entries.length} grades
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {subject.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="px-5 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">Teacher: {entry.studentName + " " + entry.studentSurname}</p>
                    <p className="text-sm text-slate-500">
                      Added on {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                    {entry.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-[420px] space-y-4">
          <h2 className="text-xl font-bold">Add Grade</h2>

          <input
            name="value"
            placeholder="Value"
            type="number"
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />

          <input
            name="weight"
            placeholder="Weight"
            type="number"
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />

          <textarea
            name="text"
            placeholder="Comment"
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />

          <input
            name="studentId"
            placeholder="Student ID"
            type="number"
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />

          <input
            name="subjectId"
            placeholder="Subject ID"
            type="number"
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
    {/*
      <div className="space-y-4">
        {gradeEntries.map((entry, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{entry.studentName}</p>
              <p className="text-sm text-slate-500">{entry.subject}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                {entry.value}
              </div>

              <button className="rounded-xl border border-red-300 text-red-600 px-4 py-2 hover:bg-red-50">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      */}
    </div>
  );
}