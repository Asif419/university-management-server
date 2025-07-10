import express from "express";
import { UserRoutes } from "../module/user/user.route";
import { StudentRoutes } from "../module/student/student.route";
import { AcademicSemesterRoutes } from "../module/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../module/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../module/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../module/faculty/faculty.route";
import { CourseRoutes } from "../module/course/course.route";
import { OfferedCourseRoutes } from "../module/offeredCourse/offeredCourse.route";
import { SemesterRegistrationRoutes } from "../module/semesterRegistration/semesterRegistration.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/semester-registrations',
        route: SemesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: OfferedCourseRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;