import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidaiton } from './academicSemester.validation';

const router = express.Router();

router.get('/', academicSemesterControllers.getAcademicSemesters);
router.get('/:academicSemesterID', academicSemesterControllers.getSingleAcademicSemester);
router.post(
    '/create-academic-semester', 
    validateRequest(AcademicSemesterValidaiton.createAcademicSemesterValidationSchema),
    academicSemesterControllers.createAcademicSemester,
);
router.patch(
    '/:academicSemesterID',
    validateRequest(AcademicSemesterValidaiton.updateAcademicSemesterValidationSchema),
    academicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;