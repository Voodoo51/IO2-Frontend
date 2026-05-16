import { useEffect, useRef, useState } from 'react';
import type { User, StudentGrades } from '../types';

export function GradesView({ user }: {user: User}) {
  
    const [grades, setGrades] = useState<StudentGrades[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
          async ([entry]) => {
            if (!entry.isIntersecting) return;
            if (hasFetchedRef.current) return;

            hasFetchedRef.current = true;
            setLoading(true);

            try {
              const res = await fetch("http://localhost:8080/user/grades", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.id }),
              });

              if (!res.ok) {
                throw new Error("Failed to fetch grades");
              }

              const data: StudentGrades[] = await res.json();
              console.log(data);
              setGrades(data);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
              setLoading(false);
            }
          },
          { threshold: 0.1 }
        );

        observer.observe(el);

        return () => observer.disconnect();
      }, [user.id]);

   return (
    <div ref={containerRef} className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Grades</h3>
          <p className="text-slate-500">Grouped by subject</p>
        </div>

      </div>

      {loading && <p className="text-slate-500">Loading grades...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-5">
        {grades.map((subject) => (
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
                    <p className="font-medium">Teacher: {entry.teacherName + " " + entry.teacherSurname}</p>
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
    </div>
  );
}