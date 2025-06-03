import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
    {
        id: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            select: 0,
        },
        needsPasswordChange: {
            type: Boolean,
            default: true,
        },
        passwordChangeAt: {
            type: Date,
        },
        role: {
            type: String,
            enum: ['admin', 'faculty', 'student'],
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// pre middleware
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
})

//post middleware
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
    plainTextPasswrod: string,
    hasedPassword: string,
) {
    return await bcrypt.compare(plainTextPasswrod, hasedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
) {
    const passwordChangeTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangeTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);