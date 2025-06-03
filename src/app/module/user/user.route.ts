import express from 'express';
import { USER_ROLE } from './user.constant';
import { studentValidations } from '../student/student.validation';

const router = express.Router();

router.post(
    '/create-student',
    auth(USER_ROLE.admin),
    validateRequest(studentValidations.createStudentValidationSchema),
    userController.createStudent,
);

export const UserRoutes = router;