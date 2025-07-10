import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidaitons } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidaitons.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse,
);

router.patch(
    '/:id',
    validateRequest(OfferedCourseValidaitons.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse,
);

router.get(
    '/',
    OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
    '/:id',
    OfferedCourseControllers.getSingleOfferedCourses,
);

export const OfferedCourseRoutes = router;