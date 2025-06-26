import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import HttpStatus from "http-status";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemesterID = payload?.academicSemester;

    // check if there any registered semester that is already 'UPCOMING' or 'ONGOING'
    const isThereAnySimilarUpcomingOrOngingSemester = await SemesterRegistration.findOne({
        $or: [
            { status: RegistrationStatus.UPCOMING },
            { status: RegistrationStatus.ONGOING },
        ],
    });

    if (isThereAnySimilarUpcomingOrOngingSemester) {
        throw new AppError(HttpStatus.BAD_REQUEST, `There is already a ${isThereAnySimilarUpcomingOrOngingSemester} registerd semester.`);
    };

    // check if the semester is exist or not
    const isAcademicSemsterExists = await AcademicSemester.findById(academicSemesterID);

    if (!isAcademicSemsterExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'This Academic Semester is not found');
    };

    // check the semester trying to add, it's already registerd
    const isSemesterAlreadyRegistered = await SemesterRegistration.findOne({
        academicSemester: academicSemesterID
    });

    if(isSemesterAlreadyRegistered) {
        throw new AppError(HttpStatus.CONFLICT, 'This semester is already registered');
    };

    const result = await SemesterRegistration.create(payload);

    return result;
};

