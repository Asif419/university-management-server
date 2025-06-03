import httpStatus from 'http-status';

const getAllStudents = catchAsync(async(req, res) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students are retrieved successfully",
        data: result,
    });
});