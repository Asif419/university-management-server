import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";
import { TStudent } from "./student.interface";
import { Student } from "./student.model"
import AppError from "../../errors/AppError";
import HttpStatus from "http-status";
import { User } from "../user/user.model";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
    const studentQuery = new QueryBuilder(
        Student.find()
            .populate('admissionSemester')
            .populate({
                path: 'academicDepartment',
                populate: {
                    path: 'academicFaculty',
                },
            }),
        query,
    )
        .search(studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await studentQuery.modelQuery;

    return result;
}

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findById(id)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    return result;
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    const result = await Student.findById(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });

    return result;
}

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deleteStudent = await Student.findByIdAndUpdate(
            id,
            { isDeleted: true },
            {
                new: true,
                session,
            }
        );
        if (!deleteStudent) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to delete Student');
        }
        const userId = deleteStudent.user;
        const deleteUser = await User.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );
        if (!deleteUser) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to delete User');
        }

        await session.commitTransaction();
        await session.endSession();

    } catch (err) {
        session.abortTransaction();
        session.endSession();
        throw new Error('Failed to delete');
    }
}

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
    deleteStudentFromDB,
}