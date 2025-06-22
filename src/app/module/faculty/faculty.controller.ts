import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";
import HttpStatus from "http-status";

const getAllFaculties = catchAsync(async(req, res) => {
    const result = await FacultyServices.getAllFacultyFromDB(req.query);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Faculties are retrived successfully',
        data: result,
    });
});

const getSingleFacultyById = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Faculty is retrived successfully',
        data: result,
    });
});

const updateFaculty = catchAsync(async(req, res) => {
    const {id} = req.params;
    const {faculty} = req.body;
    const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Faculty updated successfully',
        data: result,
    });
});

const deleteFaculty = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Faculty is deleted successfully',
        data: result,
    });
});

export const FacultyControllers = {
    getAllFaculties,
    getSingleFacultyById,
    updateFaculty,
    deleteFaculty,
};