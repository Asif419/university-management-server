import { model, Schema } from "mongoose";
import { TFaculty, TUserName } from "./faculty.interface";

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        trim: true,
        requried: [true, 'First Name is required'],
        maxlength: [20, 'First Name can not be more than 20'],
        valdiate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize format',
        },
    },
    middleName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: [true, 'Last Name is required'],
    },
});

const facultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User ID is required'],
            unique: true,
            ref: 'User',
        },
        name: {
            type: userNameSchema,
            required: true,
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female', 'other'],
                message: '{VALUE} is not valid',
            },
            required: true,
        },
        dateOfBirth: { type: Date },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        emergencyContactNo: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            enum: ['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-'],
        },
        presentAddress: {
            type: String,
            required: true
        },
        permanentAddress: {
            type: String, 
            required: true,
        },
        profileImg: {
            type: String,
            required: true,
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

facultySchema.virtual('fullName').get(function() {
    if(typeof this?.name?.middleName === 'undefined') {
        return `${this?.name?.firstName} ${this?.name?.lastName}`;
    } else {
        return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
    }
})

export const Faculty = model<TFaculty>('Faculty', facultySchema);