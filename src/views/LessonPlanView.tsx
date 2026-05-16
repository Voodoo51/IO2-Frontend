import type { Lesson } from '../types';
type LessonPlanViewProps = {
  lessonPlan: any[];
};

export function LessonPlanView({lessonPlan} : {lessonPlan: any[]}) {
 const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const getLesson = (day:any , hour: any) => {
    return lessonPlan.find(
      (lesson) => lesson.day === day && lesson.start === hour
    );
  };

 return (
   <div className="bg-white rounded-2xl shadow-md p-3 overflow-x-auto">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Weekly Lesson Plan</h3>
        <p className="text-slate-400 text-sm">Monday to Friday timetable</p>
      </div>

      <div className="min-w-[780px] border border-slate-200 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-6 bg-slate-100 border-b border-slate-200">
          <div className="p-2 font-medium text-xs text-slate-600 border-r border-slate-200">
            Time
          </div>

          {days.map((day) => (
            <div
              key={day}
              className="p-2 text-center font-medium text-xs text-slate-700 border-r border-slate-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>
        
 {hours.map((hour) => {
          const rowHasLesson = days.some((day) => getLesson(day, hour));

          return (
            <div
              key={hour}
              className={`grid grid-cols-6 border-b border-slate-200 last:border-b-0 ${
                rowHasLesson ? 'min-h-[72px]' : 'min-h-[28px]'
              }`}
            >
              <div
                className={`p-2 bg-slate-50 border-r border-slate-200 text-[11px] font-medium text-slate-600 flex items-start ${
                  rowHasLesson ? 'pt-3' : 'items-center'
                }`}
              >
                {hour}
              </div>

              {days.map((day) => {
                const lesson = getLesson(day, hour);

                return (
                  <div
                    key={`${day}-${hour}`}
                    className="border-r border-slate-200 last:border-r-0 p-1"
                  >
                    {lesson ? (
                      <div className="h-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-slate-900 truncate leading-tight">
                            {lesson.subject}
                          </h4>

                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                            <span>{lesson.start}-{lesson.end}</span>
                            <span>•</span>
                            <span>R{lesson.room}</span>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                            lesson.attendance === 'Present'
                              ? 'bg-green-100 text-green-700'
                              : lesson.attendance === 'Absent'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {lesson.attendance}
                        </span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
