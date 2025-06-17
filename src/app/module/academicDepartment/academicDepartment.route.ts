import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validaton';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-academic-department',
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);

router.get('/:departmentId',
    AcademicDepartmentController.getSingleAcademicDepartment,
);

router.patch('/:departmentId',
    validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidaitonSchema),
    AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;