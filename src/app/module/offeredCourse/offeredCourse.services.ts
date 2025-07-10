import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import HttpStatus from "http-status";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { offeredCourseSearchAbleFields } from "./offeredCourse.constant";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        faculty,
        section,
        days,
        startTime,
        endTime,
    } = payload;

    // check all the id's come from front end, do they exist or not?
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Semester registration not found');
    };

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists =
        await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Academic Faculty not found');
    }

    const isAcademicDepartmentExists =
        await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Academic Department not found');
    }

    const isCourseExists = await Course.findById(course);
    if (!isCourseExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Course not found');
    }

    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Faculty not found');
    }

    // check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty,
    })
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            HttpStatus.BAD_REQUEST,
            `This ${isAcademicDepartmentExists.name} is not belong to ${isAcademicFacultyExists.name}`,
        );
    }

    // check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredSemesterAndWithSameSection =
        await OfferedCourse.findOne({
            semesterRegistration,
            course,
            section,
        });

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterAndWithSameSection) {
        throw new AppError(
            HttpStatus.BAD_REQUEST,
            `Offered course with same section is already exists!`,
        );
    }

    //get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newShedule = {
        days,
        startTime,
        endTime,
    };
    if (hasTimeConflict(assignedSchedules, newShedule)) {
        throw new AppError(
            HttpStatus.CONFLICT,
            'This faculty is not available at that time',
        );
    }

    const result = await OfferedCourse.create({
        ...payload, academicSemester
    });

    return result;
}

const updateOfferedCourseIntoDB = async (
    id: string,
    payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
    const { faculty, days, startTime, endTime } = payload;
    const isOfferedCourseExists = await OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Offered course not found');
    };

    //check semesterRegistration status is not Endded / ongoing
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationInfoFromDB = await SemesterRegistration.findById(semesterRegistration._id);
    if (semesterRegistrationInfoFromDB?.status !== 'UPCOMING') {
        throw new AppError(
            HttpStatus.BAD_REQUEST,
            `You can not update this offered course as it is ${semesterRegistrationInfoFromDB?.status}`,
        )
    };

    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Faculty not found');
    };

    // checking time conflict of faculty
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    const newSchedule = {
        days,
        startTime,
        endTime,
    };

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            HttpStatus.CONFLICT,
            'This faculty is not available at that time',
        );
    };

    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });

    return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
        .search(offeredCourseSearchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
};

const getSingleOfferedCourseFromDB = async (_id: string) => {
    const result = await OfferedCourse.findById(_id);
    if (!result) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Offered Course ID is not valid');
    };

    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    updateOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
}