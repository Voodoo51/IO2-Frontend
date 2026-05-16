import { useNavigate } from 'react-router-dom';
import { DashboardCard } from './DashboardCard';
import { LessonPlanView } from './LessonPlanView';
import { TeacherAttendanceView } from './TeacherAttendanceView';
import { TeacherGradesView } from './TeacherGradesView';
import type { User } from '../types';

export function TeacherDashboard({ user }: {user: User}) {
   const navigate = useNavigate();
  return (
    <section className="space-y-6">
      <header className="bg-white rounded-3xl shadow-lg p-6">
        <p className="text-slate-500">Teacher Portal</p>
        <h2 className="text-3xl font-bold">Welcome, {user.name}</h2>
      </header>

      <div className="grid md:grid-cols-4 gap-5">
        <DashboardCard
          title="Manage Grades"
          description="Add and remove grades"
          onClick={() => navigate('/teacher/grades')}
        />

        <DashboardCard
          title="Manage Attendance"
          description="Edit attendance records"
          onClick={() => navigate('/teacher/attendance')}
        />

        <DashboardCard
          title="Lesson Plan"
          description="View teaching schedule"
          onClick={() => navigate('/teacher/lesson-plan')}
        />
      </div>
    </section>
  );
}