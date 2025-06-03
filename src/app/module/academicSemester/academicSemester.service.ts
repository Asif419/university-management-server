import AppError from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import httpStatus from 'http-status';
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // checking given semester name and code are correct
    if (academicSemesterNameCodeMapper[payload.name] != payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid semester code');
    }

    const result = await AcademicSemester.create(payload);
    return result;
};

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
};

const getSingleSemesterByIDFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}

const updateAcademicSemester = async (
    id: string,
    payload: Partial<TAcademicSemester>,
) => {
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
    }
    const result = await AcademicSemester.findOneAndUpdate(
        { _id: { $eq: id } },
        { $set: payload },
        { new: true },
    );

    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleSemesterByIDFromDB,
    updateAcademicSemester,
}