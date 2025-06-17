import HttpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import sendResponse from "../../utils/sendResponse";

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Academic Dpeartment is created successfully',
        data: result
    });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartment();

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Academic Departments are fetched Successfully',
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const departmentId = req.params.departmentId;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartment(departmentId);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Academic Department is fetched successfully',
        data: result,
    });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const departmentId = req.params.departmentId;
    const payload = req.body;

    const result = await AcademicDepartmentServices.updateAcademicDeparment(departmentId, payload);

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Academic Department is udpated successfully',
        data: result,
    });
});

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};