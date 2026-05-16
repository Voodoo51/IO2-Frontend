import type { StudentAttendance } from '../types';

export function AttendanceView({attendance}: {attendance: StudentAttendance[]}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Attendance Overview</h3>
        <p className="text-slate-500">
          Attendance is attached directly to each lesson.
        </p>
      </div>

      <div className="space-y-4">
        {attendance.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-slate-200 rounded-2xl px-5 py-4 bg-slate-50"
          >
            <div>
              <p className="font-semibold">{entry.subject}</p>
              <p className="text-sm text-slate-500">{entry.date}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                entry.status === 'Present'
                  ? 'bg-green-100 text-green-700'
                  : entry.status === 'Absent'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {entry.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}