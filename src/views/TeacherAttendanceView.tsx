import { useEffect, useState } from 'react';
import type { TeacherAttendanceEntry } from '../types';

export function TeacherAttendanceView({attendanceEntries}: { attendanceEntries: TeacherAttendanceEntry[] }) {

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Attendance Management</h3>
          <p className="text-slate-500">Track and edit attendance</p>
        </div>

        <button className="rounded-2xl bg-blue-600 text-white px-5 py-3 font-medium">
          + Mark Attendance
        </button>
      </div>

      <div className="space-y-4">
        {attendanceEntries.map((entry, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{entry.student}</p>
              <p className="text-sm text-slate-500">{entry.subject}</p>
            </div>

            <div className="flex items-center gap-3">
              <select className="rounded-xl border border-slate-300 px-4 py-2 bg-white">
                <option>{entry.status}</option>
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
              </select>

              <button className="rounded-xl bg-slate-900 text-white px-4 py-2">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}