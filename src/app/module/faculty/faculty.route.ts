import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFacultyById);
router.patch(
    '/:id', 
    validateRequest(FacultyValidation.updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);
router.delete(
    '/:id',
    FacultyControllers.deleteFaculty,
);

export const FacultyRoutes = router;