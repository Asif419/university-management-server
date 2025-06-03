import { Student } from "./student.model"

const getAllStudentsFromDB = async () => {
    const result = await Student.find({isDeleted: false});

    return result;
}

export const StudentServices = {
    getAllStudentsFromDB,
}