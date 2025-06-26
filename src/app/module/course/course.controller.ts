import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import HttpStatus from "http-status";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourse(req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Course is created successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Courses are retrieved successfully',
        data: result,
    });
});

const getSingleCourseByID = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCoursesFromDB(id);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Course is retrieved successfully',
        data: result,
    });
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Course is updated successfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Course is deleted successfully',
        data: result,
    });
});

const getCourseFaculties = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await CourseServices.getCourseFacultiesFromDB(id);

        sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Faculties retrived successfully',
        data: result,
    });
})

const assignFacultiesInCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesInCourseIntoDB(id, faculties);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Faculties assigned successfully',
        data: result,
    });
});

const removeFacultiesInCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesInCourseIntoDB(id, faculties);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Faculties removed successfully',
        data: result,
    });
})

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourseByID,
    updateCourse,
    deleteCourse,
    getCourseFaculties,
    assignFacultiesInCourse,
    removeFacultiesInCourse,
};