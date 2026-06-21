// api/attendance.ts

export type LessonDTO = {
  id: number;
  date: string;
  subject: string;
  room: string;
  attendance: string;
};

export type LessonPlanEntry = {
  id: number;
  day: string;
  start: string;
  end: string;
  subject: string;
  room: string;
  attendance: string;
};

function Add45Minutes(time: string) {
  const date = new Date(`1970-01-01T${time}`);

  date.setMinutes(date.getMinutes() + 45);

  return date.toISOString().slice(11, 16);
}

export async function FetchAttendance(
  userId: number,
  role: 'student' | 'teacher'
): Promise<LessonPlanEntry[]> {
  const body =
    role === 'teacher'
      ? { teacherId: userId }
      : { studentId: userId };

  const response = await fetch(
    'https://your-backend-url/api/attendance',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load attendance');
  }

  const lessons: LessonDTO[] = await response.json();

  return lessons.map((lesson) => {
    const date = new Date(lesson.date);

    const start = date.toISOString().slice(11, 16);

    return {
      id: lesson.id,
      day: date.toLocaleDateString('en-US', {
        weekday: 'long',
      }),
      start,
      end: Add45Minutes(start),
      subject: lesson.subject,
      room: lesson.room,
      attendance: lesson.attendance,
    };
  });
}