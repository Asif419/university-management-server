import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";
import HttpStatus from "http-status";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Semester Registration is completed successfully!',
        data: result,
    });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req?.query);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Semester Registration is retrieved',
        data: result,
    });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Semester Registration is retrieved',
        data: result,
    });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Semester registration updated successfully',
        data: result,
    });
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Semester registration deleted successfully',
        data: result,
    });
});

export const SemesterRegistraitonController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration,
}