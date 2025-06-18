import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespons } from "../interface/error";
import config from "../config";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorRespons => {
    const errorSources: TErrorSources = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        },
    );
    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation error',
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    }
}

export default handleValidationError;