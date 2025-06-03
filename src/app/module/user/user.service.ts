import mongoose from "mongoose";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import config from "../../config";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import HttpStatus from "http-status";
import { Student } from "../student/student.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {};

    // remaining ...

    // start a session
    const session = await mongoose.startSession();

    try {
        // start the transaction
        session.startTransaction();

        // remaining ...
        userData.id = "1234";
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
        // throw new Error('Failed to create Students');
        console.error("Student creation failed:", err);
    };
};

export const UserServices = {
    createStudentIntoDB,
}