import { useState, useRef, useEffect } from 'react';
import type { StudentGrades, TeacherGradeEntries, TeacherGradeEntry, User } from '../types';

export function TeacherGradesView({ user }: {user: User}) {

 const [gradeEntries, setGradeEntries] = useState<TeacherGradeEntries[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [editingEntry, setEditingEntry] = useState<any | null>(null);

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

async function handleDelete(id: number) {
  try {
    const res = await fetch(`http://localhost:8080/user/grade/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete grade");

    setDeleteId(null);
    await fetchGrades();
  } catch (err) {
    console.error(err);
  }
}

async function handleUpdate() {
  if (!editingEntry) return;

  try {
    const payload = {
      gradeValue: Number(editingEntry.value),
        gradeWeight: Number(editingEntry.weight),
        gradeText: editingEntry.text,
    };

/*
    if (Number(payload.value) < 0 || Number(payload.value) > 6) {
      alert("Ocena musi być w zakresie 0-6");
      return;
    }

    if (Number(payload.weight) < 0) {
      alert("Waga nie może być ujemna");
      return;
    }
*/
    const res = await fetch(
      `http://localhost:8080/user/grade/${editingEntry.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) throw new Error("Failed to update grade");

    setEditingEntry(null);
    await fetchGrades();
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

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                      {entry.value}
                    </div>

                    <button
                      onClick={() => setEditingEntry(entry)}
                      className="px-3 py-1 rounded-lg border text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(entry.id)}
                      className="px-3 py-1 rounded-lg border text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
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
{deleteId !== null && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl w-[350px] space-y-4">
      <h2 className="text-lg font-bold">Confirm deletion</h2>
      <p>Are you sure you want to delete this grade?</p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 border rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={() => handleDelete(deleteId)}
          className="px-4 py-2 bg-red-600 text-white rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

{editingEntry && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl w-[420px] space-y-4">
      <h2 className="text-xl font-bold">Edit Grade</h2>

      <h2 className="text-sm font-medium text-slate-600">Ocena</h2>
      <input
        type="number"
        min="0"
        max="6"
        value={editingEntry.value}
        onChange={(e) =>
          setEditingEntry({ ...editingEntry, value: e.target.value })
        }
        className="w-full border p-2 rounded-xl"
      />

      <h2 className="text-sm font-medium text-slate-600">Waga</h2>
      <input
        type="number"
        min="0"
        max ="30"
        step="1"
        value={editingEntry.weight || ""}
        onChange={(e) =>
          setEditingEntry({ ...editingEntry, weight: e.target.value })
        }
        className="w-full border p-2 rounded-xl"
      />

      <h2 className="text-sm font-medium text-slate-600">Opis</h2>
      <textarea
        value={editingEntry.text || ""}
        onChange={(e) =>
          setEditingEntry({ ...editingEntry, text: e.target.value })
        }
        className="w-full border p-2 rounded-xl"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditingEntry(null)}
          className="px-4 py-2 border rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
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