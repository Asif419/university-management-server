import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidaiton } from './academicSemester.validation';

const router = express.Router();

router.get('/', academicSemesterControllers.getAcademicSemsters);
router.get('/:academicSemesterID', academicSemesterControllers.getSingleAcademicSemster);
router.post(
    '/create-academic-semester', 
    validateRequest(AcademicSemesterValidaiton.createAcademicSemesterValidationSchema),
    academicSemesterControllers.createAcademicSemester,
);
router.patch(
    '/:academicSemesterID',
    validateRequest(AcademicSemesterValidaiton.updateAcademicSemesterValidationSchema),
    academicSemesterControllers.updateAcademicSemster,
);

export const AcademicSemesterRoutes = router;