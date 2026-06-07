export type StudentAttendance = {
    date: string;
    subject: string; 
    status: string;
}

export type Grade = {
    id: number;
    teacherName: string;
    teacherSurname: string;
    subject: string;
    text: string;
    date: string;
    value: number;
    weight: number;
}

export type StudentGrades = {
    subject: string;
    entries: Grade[];
    average: number;
}

export type TeacherGradeEntry = {
    id: number;
    studentName: string;
    studentSurname: string;
    text: string;
    date: string;
    value: number;
    weight: number;
}

export type TeacherGradeEntries = {
    id: number;
    subject: string;
    entries: TeacherGradeEntry[];
}

export type TeacherAttendanceEntry = {
    student: string; 
    subject: string; 
    status: string;
}

export type User = {
    id: number;
    role: string;
    name: string;
    surname: string;
    email: string;
}

export type Lesson = {
    day: string;
    lessons: string[];
}

export interface GradeDistribution {
  grade: number;
  count: number;
}

/*
export interface ClassStatistics {
  classId: number;
  className: string;
  studentCount: number;
  classAverage: number;
  attendancePercentage: number;
  totalGrades: number;
  gradeDistribution: GradeDistribution[];
}

export interface StudentStatistics {
  studentId: number;
  firstName: string;
  lastName: string;
  averageGrade: number;
  weightedAverage: number;
  attendancePercentage: number;
  totalGrades: number;
}
*/

export interface TeacherStatisticsResponse {
    classStatistics: ClassStatistics;
    students: StudentStatistics[];
}

export interface ClassSummary {
  classId: number;
  className: string;
  studentCount: number;
  averageGrade: number;
  attendancePercentage: number;
}

export interface StudentRanking {
  studentId: number;
  name: string;
  surname: string;
  average: number;
}

export interface TeacherStatistics {
  teacherId: number;
  firstName: string;
  lastName: string;
  classesCount: number;
  studentsCount: number;
  gradesGiven: number;
  averageGradeGiven: number;
  attendancePercentage: number;
  classes: ClassSummary[];
}

export interface ClassStatistics {
  classId: number;
  className: string;
  studentCount: number;
  totalGrades: number;
  classAverage: number;
  attendancePercentage: number;
  gradeDistribution: GradeDistribution[];
  topStudents: StudentRanking[];
  weakestStudents: StudentRanking[];
}

export interface StudentStatistics {
  studentId: number;
  name: string;
  surname: string;
  totalGrades: number;
  averageGrade: number;
  weightedAverage: number;
  presentLessons: number;
  absentLessons: number;
  attendancePercentage: number;
  subjectAverages: Record<string, number>;
}