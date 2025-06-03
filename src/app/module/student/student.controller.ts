import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async(req, res) => {
    // remaining ...
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students are retrieved successfully",
        data: result,
    });
});

export const StudentController = {
    getAllStudents,
}