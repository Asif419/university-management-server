import { model, Schema } from "mongoose";
import { TAdmin, TUserName } from "./admin.interface";

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First Name is required'],
        maxlength: [20, 'First Name can not be more than 20 characters'],
        validate: {
            validator: function (value: string) {
                const firstNameStr =
                    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                return firstNameStr === value;
            },
            message: '{VALUE} is not in Capitalize formal',
        }
    },
    middleName: {
        type: String,
        require: false,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
});

const adminSchema = new Schema<TAdmin>({
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
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});

export const Admin = model<TAdmin>('Admin', adminSchema);