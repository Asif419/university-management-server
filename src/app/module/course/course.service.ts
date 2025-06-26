import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../errors/AppError";
import HttpStatus from "http-status";

const createCourse = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query,
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await courseQuery.modelQuery;
    return result;
};

const getSingleCoursesFromDB = async (id: string) => {
    const result = await Course.findById(id);
    return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const updateBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session,
            },
        );
        if (!updateBasicCourseInfo) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to update course');
        };

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisiteourseID = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCoruses: {
                            course: {
                                $in: deletedPreRequisiteourseID
                            },
                        },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );
            if (!deletedPreRequisiteCourses) {
                throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to update course');
            };

            const newPreRequisites = preRequisiteCourses?.filter((el) => el.course && !el.isDeleted)

            const newPreRequisitesCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourses: {
                            $each: newPreRequisites
                        }
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );

            if (!newPreRequisitesCourses) {
                throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to update course');
            };

            const result = await Course.findById(id).populate('preRequisiteCourses.course');

            return result;
        }
        await session.commitTransaction();
        await session.endSession();
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to update course');
    }
};

const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

const getCourseFacultiesFromDB = async(id: string) => {
    const result = await CourseFaculty.findById(id).populate('faculties');
    return result;
}

const assignFacultiesInCourseIntoDB = async (
    id: string,
    payload: Partial<TCourseFaculty>
) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: {
                faculties: { $each: payload },
            },
        },
        {
            upsert: true,
            new: true,
        },
    );

    return result;
};

const removeFacultiesInCourseIntoDB = async (
    id: string,
    payload: Partial<TCourseFaculty>,
) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: {faculties: {$in: payload}},
        },
        {
            new: true,
        },
    );
    return result;
};

export const CourseServices = {
    createCourse,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    getCourseFacultiesFromDB,
    assignFacultiesInCourseIntoDB,
    removeFacultiesInCourseIntoDB,
};