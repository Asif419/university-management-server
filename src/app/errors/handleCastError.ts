import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespons } from "../interface/error";
import config from "../config";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorRespons => {
    const errorSources: TErrorSources = [
        {
            path: err?.path,
            message: err?.message,
        },
    ];
    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    };
};

export default handleCastError;