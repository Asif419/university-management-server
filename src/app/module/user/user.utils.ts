import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        { role: 'student' },
        {
            id: 1,
            _id: 0,
        },
    ).sort({
        createdAt: -1,
    }).lean();

    return lastStudent?.id ? lastStudent.id : undefined;
}

export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
    if (lastStudentId) {
        const lastStudentSemsterYear = lastStudentId?.substring(0, 4);
        const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
        const currentSemesterCode = payload.code;
        const currentyear = payload.year;

        if (lastStudentId &&
            lastStudentSemesterCode == currentSemesterCode &&
            lastStudentSemsterYear == currentyear
        ) {
            currentId = lastStudentId.substring(6);
        }
        let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
        incrementId = `${payload.year}${payload.code}${incrementId}`;

        return incrementId;
    }
}

const findLastFacultyID = async () => {
    const lastFaculty = await User.findOne(
        { role: 'faculty' },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyID = async () => {
    let currentId: string = (0).toString();
    const lastFacultyID = await findLastFacultyID();
    if (lastFacultyID) {
        currentId = lastFacultyID.split('-')[1];
    }
    let incrementedID = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementedID = `F-${incrementedID}`;

    return incrementedID;
}