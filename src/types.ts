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