import { model, Schema } from "mongoose";
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from "./student.interface";

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First Name is required'],
        maxlength: [20, 'First name can not be more than 20'],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize format',
        },
    },
    middleName: {
        type: String,
        require: false,
    },
    lastName: {
        type: String,
        require: [true, 'Last Name is required'],
    }
})

const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, requried: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>({
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
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-'],
    },
    presentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true,
    },
    profileImg: { type: String, required: false },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
},
    {
        toJSON: {
            virtuals: true,
        },
    },
)

// creting a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existUser = await Student.findOne({id});
    return existUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);