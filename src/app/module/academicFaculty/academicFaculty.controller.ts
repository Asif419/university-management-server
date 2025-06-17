import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is created successfully',
        data: result,
    });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacucltiesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties fetched successfully',
        data: result,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const facultyId = req.params.facultyId;
    const result = await AcademicFacultyServices.getSingleAcademicFaculty(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty fetched successfully',
        data: result,
    });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const facultyId = req.params.facultyId;
    const facultyData = req.body;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, facultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result,
    });
});

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
}