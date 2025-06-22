import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder"
import { facultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"
import AppError from "../../errors/AppError";
import HttpStatus from "http-status";
import { User } from "../user/user.model";

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(Faculty.find(), query)
        .search(facultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await adminQuery.modelQuery;

    return result;
}

const getSingleFacultyFromDB = async (_id: string) => {
    const result = await Faculty.findById({ _id });

    return result;
};

const updateFacultyIntoDB = async (_id: string, payload
    : Partial<TFaculty>) => {
    const { name, ...remainingFacultyData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingFacultyData,
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    const result = await Faculty.findByIdAndUpdate(
        { _id },
        modifiedUpdatedData,
        {
            new: true,
            runValidators: true,
        },
    );

    return result;
}

const deleteFacultyFromDB = async (_id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        
        const deletedFaculty = await Faculty.findByIdAndUpdate(
            _id,
            { isDeleted: true },
            {
                new: true,
                session,
            },
        );

        if(!deletedFaculty) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to delete Faculty');
        };
        const userID = deletedFaculty.user;

        const deleteUser = await User.findByIdAndUpdate(
            userID,
            {isDeleted: true},
            {
                new: true,
                session,
            },
        );
        if(!deleteUser) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to delete User');
        };

        await session.commitTransaction();
        await session.endSession();

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete');
    }
}

export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyFromDB,
};