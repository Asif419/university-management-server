import mongoose from "mongoose";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import config from "../../config";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import HttpStatus from "http-status";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateFacultyID, generateStudentId } from "./user.utils";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {};

    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

    if (admissionSemester == null) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Something went wrong');
    }

    // start a session
    const session = await mongoose.startSession();

    try {
        // start the transaction
        session.startTransaction();


        userData.id = await generateStudentId(admissionSemester);
        userData.password = password || (config.default_password as string);
        userData.role = 'student';

        // create transection-1
        const newUser = await User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to create User');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        // create transection-2
        const newStudent = await Student.create([payload], { session });

        console.log(newStudent)
        if (!newStudent.length) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to create Student');
        }

        // commit transaction
        await session.commitTransaction();
        // end session
        await session.endSession();

        return newStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to create Students');
    };
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    const userData: Partial<TUser> = {};

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        userData.id = await generateFacultyID();
        userData.password = password || (config.default_password_for_faculty as string);

        const newUser = await User.create(
            [userData],
            { session },
        );

        if (!newUser.length) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to create user');
        };
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newFaculty = await Faculty.create(
            [payload],
            { session },
        );

        if (!newFaculty) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Falied to create Faculty');
        };

        await session.commitTransaction();
        await session.endSession();

    } catch (err) {
        session.abortTransaction();
        session.endSession();
        throw new Error('Failed to create Faculty');
    }
}

export const UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
}