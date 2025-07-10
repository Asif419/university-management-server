import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created successfully',
        data: result,
    });
});

const getAcademicSemesters: RequestHandler = catchAsync(async (requestAnimationFrame, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic semester fethced successfully',
        data: result,
    });
});

const getSingleAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
    const academicSemesterID = req.params.academicSemesterID;
    const result = await AcademicSemesterServices.getSingleSemesterByIDFromDB(academicSemesterID);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester fetched successfully',
        data: result,
    });
});

const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
    const academicSemesterID = req.params.academicSemesterID;
    const semesterData = req.body;
    const result = await AcademicSemesterServices.updateAcademicSemester(
        academicSemesterID,
        semesterData,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester updated successfully',
        data: result,
    });
});

export const academicSemesterControllers = {
    createAcademicSemester,
    getAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,
};