import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import HttpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
        },
    },
    {
        timestamps: true,
    },
);

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExists = await AcademicDepartment.find({
        name: this.name,
    });

    if (Array.isArray(isDepartmentExists) && isDepartmentExists.length != 0) {
        throw new AppError(HttpStatus.NOT_FOUND, 'This department already Exists');
    };

    next();
});

academicDepartmentSchema.pre('findOneAndUpdate',
    async function (next) {
        const query = this.getQuery();
        const isDepartmentExists = await AcademicDepartment.findOne(query);
        if (!isDepartmentExists) {
            throw new AppError(HttpStatus.NOT_FOUND, 'This Department does not exist');
        };

        next();
    }
);

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment', academicDepartmentSchema,
);