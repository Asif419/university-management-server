import express from "express";
import { UserRoutes } from "../module/user/user.route";
import { StudentRoutes } from "../module/student/student.route";
import { AcademicSemesterRoutes } from "../module/academicSemester/academicSemester.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;