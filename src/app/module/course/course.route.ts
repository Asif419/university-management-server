import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
    '/create-course',
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse,
);
router.get(
    '/',
    CourseControllers.getAllCourses,
);
router.get(
    '/:id',
    CourseControllers.getSingleCourseByID,
);
router.patch(
    '/:id',
    CourseControllers.updateCourse,
);
router.delete(
    '/:id',
    CourseControllers.deleteCourse,
);
router.put(
    '/:id/assign-faculties',
    validateRequest(CourseValidations.facultiesInCourseValidationSchema),
    CourseControllers.assignFacultiesInCourse,
);
router.delete(
    '/:id/remove-faculties',
    validateRequest(CourseValidations.facultiesInCourseValidationSchema),
    CourseControllers.removeFacultiesInCourse,
);

export const CourseRoutes = router;