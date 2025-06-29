import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { UserServices } from "./user.service";

const createStudent: RequestHandler = catchAsync(async(req, res) => {
    const {password, student: studentData} = req.body;

    const result = await UserServices.createStudentIntoDB(password, studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result,
    });
});

const createFaculty: RequestHandler = catchAsync(async(req, res) => {
    const {password, faculty: facultyData} = req.body;
    const result = await UserServices.createFacultyIntoDB(password, facultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is created successfully',
        data: result,
    });
})

export const UserController = {
    createStudent,
    createFaculty,
}