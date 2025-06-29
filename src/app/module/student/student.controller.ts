import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
    // remaining ...
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students are retrieved successfully",
        data: result,
    });
});

const getSingleStudentById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is retrived successfully',
        data: result,
    });
});

const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updateStudentIntoDB(id, student);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is updated successfully',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is deleted successfully',
        data: result,
    });
});

export const StudentControllers = {
    getAllStudents,
    getSingleStudentById,
    updateStudent,
    deleteStudent,
}