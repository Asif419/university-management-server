import express from 'express';

const router = express.Router();

router.get('/', studentControllers.getAllStudents);
router.get('/:id', studentControllers.getSingleStudentById);
router.patch('/:id', validaterequest(studentValidations.udpateStudentValidationSchema), studentControllers.updateStudent);
router.delete('/:id', studentControllers.deleteStudent);

export const StudentRoutes = router;