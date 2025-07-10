import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistraitonController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
    '/create-semester-registration',
    validateRequest(
        SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
    ),
    SemesterRegistraitonController.createSemesterRegistration,
);

router.get(
    '/',
    SemesterRegistraitonController.getAllSemesterRegistrations,
);

router.get(
    '/:id',
    SemesterRegistraitonController.getSingleSemesterRegistration,
);

router.patch(
    '/:id',
    validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
    SemesterRegistraitonController.updateSemesterRegistration,
);

router.delete(
    '/:id',
    SemesterRegistraitonController.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;