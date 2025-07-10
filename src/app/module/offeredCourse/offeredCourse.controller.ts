import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.services";
import HttpStatus from "http-status";

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getAllOfferedCourseFromDB(req.query);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Offered Courses retrieved successfully !',
        data: result,
    });
});

const getSingleOfferedCourses = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: 'Offered Course fetched successfully',
            data: result,
        });
    },
);

const updateOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
        id,
        req.body,
    );

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Offered Course updated successfully',
        data: result,
    })
});

export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourses,
    updateOfferedCourse,
};
