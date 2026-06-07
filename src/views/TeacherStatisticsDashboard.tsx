import { useEffect, useRef, useState } from "react";
import type {
  TeacherStatistics,
  ClassStatistics,
  StudentStatistics,
  User,
} from "../types";

import { ClassStatisticsView } from "./ClassStatisticsView";
import { Outlet, useNavigate } from "react-router-dom";

export function TeacherStatisticsDashboard({
  user,
}: {
  user: User;
}) {
  const [teacherStats, setTeacherStats] = useState<TeacherStatistics | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [classStats, setClassStats] = useState<ClassStatistics | null>(null);
  const [students, setStudents] = useState<StudentStatistics[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeacherStats = async () => {
      const response = await fetch(
        `http://localhost:8080/statistics/teacher/${user.id}`
      );

      const data =
        await response.json();

      setTeacherStats(data);

      if (data.classes.length > 0) {
        setSelectedClassId(
          data.classes[0].classId
        );
      }

      setLoading(false);
    };

    loadTeacherStats();
  }, [user.id]);

  useEffect(() => {
    if (selectedClassId === null) {
        return;
    }

    const loadClassData = async () => {
      const [classResponse, studentsResponse] =
        await Promise.all([
          fetch(
            `http://localhost:8080/statistics/class/${selectedClassId}/teacher/${user.id}`
          ),
          fetch(
            `http://localhost:8080/statistics/class/${selectedClassId}/students`
          ),
        ]);

      setClassStats(
        await classResponse.json()
      );

      setStudents(
        await studentsResponse.json()
      );
    };

    loadClassData();
  }, [selectedClassId, user.id]);

  if (loading || !teacherStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between bg-white">
        <h2 className="text-3xl font-bold  mb-6">
          Teacher Statistics
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="rounded-2xl bg-slate-900 text-white px-5 py-3  mb-6"
        >
          Back to Dashboard
        </button>
        </div>
        <div className="grid md:grid-cols-5 gap-4">

          <StatCard
            title="Classes"
            value={teacherStats.classesCount}
          />

          <StatCard
            title="Students"
            value={teacherStats.studentsCount}
          />

          <StatCard
            title="Grades"
            value={teacherStats.gradesGiven}
          />

          <StatCard
            title="Avg Grade"
            value={teacherStats.averageGradeGiven.toFixed(
              2
            )}
          />

          <StatCard
            title="Attendance"
            value={`${teacherStats.attendancePercentage.toFixed(
              1
            )}%`}
          />

        </div>
    
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">
          Classes
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {teacherStats.classes.map(
            (schoolClass) => (
              <button
                key={
                  schoolClass.classId
                }
                onClick={() =>
                  setSelectedClassId(
                    schoolClass.classId
                  )
                }
                className={`border rounded-2xl p-4 text-left transition ${
                  selectedClassId ===
                  schoolClass.classId
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <h4 className="font-bold">
                  {schoolClass.className}
                </h4>

                <p>
                  Students:{" "}
                  {
                    schoolClass.studentCount
                  }
                </p>

                <p>
                  Avg:{" "}
                  {schoolClass.averageGrade.toFixed(
                    2
                  )}
                </p>

                <p>
                  Attendance:{" "}
                  {schoolClass.attendancePercentage.toFixed(
                    1
                  )}
                  %
                </p>
              </button>
            )
          )}
        </div>
      </div>

      {classStats && (
        <ClassStatisticsView
          classStats={classStats}
          students={students}
        />
      )}
              <Outlet />

    </div>
    
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-slate-50 rounded-2xl p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}