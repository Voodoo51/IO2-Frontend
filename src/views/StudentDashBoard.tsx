import { useNavigate } from 'react-router-dom';
import { AttendanceView } from "./AttendanceView";
import { DashboardCard } from './DashboardCard';
import { GradesView } from "./GradesView";
import { LessonPlanView } from './LessonPlanView';
import type { User } from '../types';

export function StudentDashboard({user}: {user: User}) {
 const navigate = useNavigate();
  return (
    <section className="space-y-6">
      <header className="bg-white rounded-3xl shadow-lg p-6">
        <p className="text-slate-500">Student Portal</p>
        <h2 className="text-3xl font-bold">Welcome back, {user.name}</h2>
      </header>

      <div className="grid md:grid-cols-3 gap-5">
        <DashboardCard
          title="Grades"
          description="Check your grades"
          onClick={() => navigate('/student/grades')}
        />

        <DashboardCard
          title="Attendance"
          description="Review attendance history"
          onClick={() => navigate('/student/attendance')}
        />

        <DashboardCard
          title="Lesson Plan"
          description="Check your weekly schedule"
          onClick={() => navigate('/student/lesson-plan')}
        />
      </div>
    </section>
  );
}