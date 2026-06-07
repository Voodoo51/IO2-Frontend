// TeacherStatisticsView.tsx

import { useEffect, useState } from "react";
import type {
  ClassStatistics,
  StudentStatistics,
  TeacherStatisticsResponse,
  User,
} from "../types";

export function TeacherStatisticsView({
  user,
}: {
  user: User;
}) {
  const [classStats, setClassStats] =
    useState<ClassStatistics | null>(null);

  const [students, setStudents] =
    useState<StudentStatistics[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

 useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);

      const classId = 0; // temporary

      const [classResponse, studentsResponse] =
        await Promise.all([
          fetch(
            `http://localhost:8080/statistics/class/${classId}/teacher/${user.id}`
          ),
          fetch(
            `http://localhost:8080/statistics/class/${classId}/students`
          ),
        ]);

      if (!classResponse.ok) {
        throw new Error("Failed to load class statistics");
      }

      if (!studentsResponse.ok) {
        throw new Error("Failed to load student statistics");
      }

      const classData: ClassStatistics =
        await classResponse.json();

      const studentsData: StudentStatistics[] =
        await studentsResponse.json();

      setClassStats(classData);
      setStudents(studentsData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [user.id]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6">
        Loading statistics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6">
          Class Statistics
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Class Average
            </p>

            <p className="text-3xl font-bold text-blue-700">
              {classStats?.classAverage.toFixed(2)}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Attendance
            </p>

            <p className="text-3xl font-bold text-green-700">
              {classStats?.attendancePercentage.toFixed(
                1
              )}
              %
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Students
            </p>

            <p className="text-3xl font-bold text-purple-700">
              {classStats?.studentCount}
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Grades
            </p>

            <p className="text-3xl font-bold text-orange-700">
              {classStats?.totalGrades}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">
          Grade Distribution
        </h3>

        <div className="space-y-3">
          {classStats?.gradeDistribution.map((item) => (
            <div
              key={item.grade}
              className="flex items-center justify-between border rounded-xl p-3"
            >
              <span className="font-medium">
                Grade {item.grade}
              </span>

              <span className="font-bold">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">
          Student Statistics
        </h3>

        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.studentId}
              className="border rounded-2xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {student.name}{" "}
                  {student.surname}
                </p>

                <p className="text-sm text-slate-500">
                  {student.totalGrades} grades
                </p>
              </div>

              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-xs text-slate-500">
                    Avg
                  </p>

                  <p className="font-bold text-blue-600">
                    {student.averageGrade.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Weighted
                  </p>

                  <p className="font-bold text-purple-600">
                    {student.weightedAverage.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Attendance
                  </p>

                  <p className="font-bold text-green-600">
                    {student.attendancePercentage.toFixed(
                      0
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}