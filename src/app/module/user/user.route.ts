import express from 'express';
import { USER_ROLE } from './user.constant';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
    '/create-student',
    validateRequest(studentValidations.createStudentValidationSchema),
    UserController.createStudent,
);

export const UserRoutes = router;