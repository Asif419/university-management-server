import express from "express";
import { UserRoutes } from "../module/user/user.route";
import { StudentRoutes } from "../module/student/student.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;