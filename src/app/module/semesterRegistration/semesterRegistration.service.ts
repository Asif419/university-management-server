import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import HttpStatus from "http-status";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";

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
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemesterID);

    if (!isAcademicSemesterExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'This Academic Semester is not found');
    };

    // check the semester trying to add, it's already registerd
    const isSemesterAlreadyRegistered = await SemesterRegistration.findOne({
        academicSemester: academicSemesterID
    });

    if (isSemesterAlreadyRegistered) {
        throw new AppError(HttpStatus.CONFLICT, 'This semester is already registered');
    };

    const result = await SemesterRegistration.create(payload);

    return result;
};

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {
    const semesterRegistraitonQery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'),
        query
    )
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await semesterRegistraitonQery.modelQuery;

    return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id);

    return result;
};

const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    // check if the semester is exist or not
    const isAcademicSemesterExists = await SemesterRegistration.findById(id);

    if (!isAcademicSemesterExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'This Academic Semester is not found');
    };

    // if the requested semester-registration status is ended: then no update will happen
    const currentSemesterStatus = isAcademicSemesterExists?.status;
    const requestedSemesterStatus = payload?.status;
    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(HttpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`);
    };

    // upcoming = > ongoing = > ended
    // upcoming => ongoing => ended
    if (
        currentSemesterStatus === RegistrationStatus.UPCOMING &&
        requestedSemesterStatus === RegistrationStatus.ENDED
    ) {
        throw new AppError(
            HttpStatus.BAD_REQUEST,
            `You can't directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
        );
    }

    if (
        currentSemesterStatus === RegistrationStatus.ONGOING &&
        requestedSemesterStatus === RegistrationStatus.UPCOMING
    ) {
        throw new AppError(
            HttpStatus.BAD_REQUEST,
            `You can't directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
        );
    }

    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

    if (!isSemesterRegistrationExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Semester Registration is not found');
    };

    if (isSemesterRegistrationExists?.status !== 'UPCOMING') {
        throw new AppError(HttpStatus.BAD_REQUEST, 'You can not delete this registered semester');
    };

    const session = await mongoose.startSession();

    // delete associated offered course
    try {
        session.startTransaction();
        const deleteOfferedCourse = await OfferedCourse.deleteMany(
            {
                semesterRegistration: id,
            },
            { session },
        );
        if (!deleteOfferedCourse) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to delete offered courses');
        };
        const deleteSemesterRegistration = await SemesterRegistration.findByIdAndDelete(id, {
            session,
            new: true,
        });

        if (!deleteSemesterRegistration) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to delete Semester Registration');
        };

        await session.commitTransaction();
        await session.endSession();

        return null;
    } catch (err) {
        session.abortTransaction();
        session.endSession();
        throw new Error('Failed to Delete');
    }
};

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
    deleteSemesterRegistrationFromDB,
};