import express from 'express';
import { USER_ROLE } from './user.constant';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { FacultyValidation } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
    '/create-student',
    validateRequest(studentValidations.createStudentValidationSchema),
    UserController.createStudent,
);
router.post(
    '/create-faculty',
    validateRequest(FacultyValidation.createFacultyValidationSchema),
    UserController.createFaculty,
);

export const UserRoutes = router;