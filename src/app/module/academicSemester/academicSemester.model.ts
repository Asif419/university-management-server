import { model, Schema } from "mongoose";
import HttpStatus from "http-status";
import { academicSemesterCode, academicSemesterName, Months } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import AppError from "../../errors/AppError";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: academicSemesterName,
        required: true,
    },
    code: {
        type: String,
        enum: academicSemesterCode,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: Months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: Months,
        requried: true,
    },
});


academicSemesterSchema.pre('save', async function(next) {
    const isSemesterExistInSameyear = await AcademicSemester.findOne({
        name: this.name,
        year: this.year
    })
    if(isSemesterExistInSameyear) {
        throw new AppError(HttpStatus.NOT_FOUND, 'Semester already exists');
    }
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema,);