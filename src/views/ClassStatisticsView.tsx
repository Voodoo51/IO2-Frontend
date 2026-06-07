import type {
  ClassStatistics,
  StudentStatistics,
} from "../types";

export function ClassStatisticsView({
  classStats,
  students,
}: {
  classStats: ClassStatistics;
  students: StudentStatistics[];
}) {
 

const distribution =
  classStats?.gradeDistribution ?? [];

const topStudents =
  classStats?.topStudents ?? [];

const weakestStudents =
  classStats?.weakestStudents ?? [];

   const maxCount = Math.max(
    ...distribution.map(
      (g) => g.count
    ),
    1
  );

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h3 className="text-2xl font-bold mb-6">
          {classStats.className}
        </h3>

        <div className="grid md:grid-cols-4 gap-4">

          <StatCard
            title="Average"
            value={classStats.classAverage.toFixed(
              2
            )}
          />

          <StatCard
            title="Attendance"
            value={`${classStats.attendancePercentage.toFixed(
              1
            )}%`}
          />

          <StatCard
            title="Students"
            value={classStats.studentCount}
          />

          <StatCard
            title="Grades"
            value={classStats.totalGrades}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h3 className="text-xl font-bold mb-4">
          Grade Distribution
        </h3>

        <div className="space-y-4">

          {distribution.map(
            (item) => (
              <div key={item.grade}>

                <div className="flex justify-between mb-1">

                  <span>
                    Grade {item.grade}
                  </span>

                  <span>
                    {item.count}
                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-200">

                  <div
                    className="h-3 rounded-full bg-blue-500"
                    style={{
                      width: `${
                        (item.count /
                          maxCount) *
                        100
                      }%`,
                    }}
                  />

                </div>

              </div>
            )
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h3 className="text-xl font-bold mb-4">
            Top Students
          </h3>

          {topStudents.map(
            (student, index) => (
              <div
                key={student.studentId}
                className="flex justify-between py-2"
              >
                <span>
                  #{index + 1}{" "}
                  {student.name}{" "}
                  {student.surname}
                </span>

                <span>
                  {student.average.toFixed(
                    2
                  )}
                </span>
              </div>
            )
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h3 className="text-xl font-bold mb-4">
            Needs Attention
          </h3>

          { weakestStudents.map(
            (student) => (
              <div
                key={student.studentId}
                className="flex justify-between py-2"
              >
                <span>
                  {student.name}{" "}
                  {student.surname}
                </span>

                <span>
                  {student.average.toFixed(
                    2
                  )}
                </span>
              </div>
            )
          )}
        </div>

      </div>

      <StudentStatisticsTable
        students={students}
      />
    </>
  );
}

function StudentStatisticsTable({
  students,
}: {
  students: StudentStatistics[];
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h3 className="text-xl font-bold mb-4">
        Students
      </h3>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Student
            </th>

            <th>
              Avg
            </th>

            <th>
              Weighted
            </th>

            <th>
              Attendance
            </th>

            <th>
              Grades
            </th>

          </tr>

        </thead>

        <tbody>

          {students.map(
            (student) => (
              <tr
                key={
                  student.studentId
                }
                className="border-b"
              >
                <td className="py-3">
                  {
                    student.name
                  }{" "}
                  {
                    student.surname
                  }
                </td>

                <td className="text-center">
                  {student.averageGrade.toFixed(
                    2
                  )}
                </td>

                <td className="text-center">
                  {student.weightedAverage.toFixed(
                    2
                  )}
                </td>

                <td className="text-center">
                  {student.attendancePercentage.toFixed(
                    0
                  )}
                  %
                </td>

                <td className="text-center">
                  {
                    student.totalGrades
                  }
                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

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