import config from "../config";
import { TErrorSources, TGenericErrorRespons } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorRespons => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
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

export default handleDuplicateError;