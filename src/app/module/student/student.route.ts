import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudentById);
router.patch('/:id',
    validateRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateStudent
);
router.delete('/:id', StudentControllers.deleteStudent);


export const StudentRoutes = router;