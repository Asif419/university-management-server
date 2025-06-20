import { z } from 'zod';


const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department must be string',
            required_error: 'Academic Deparment name is required',
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty must be string',
            required_error: 'Faculty is required',
        }),
    }),
});

const updateAcademicDepartmentValidaitonSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department must be string',
            required_error: 'Academic Deparment name is required'
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty must be string',
            required_error: 'Faculty is required',
        }).optional(),
    }),
});

export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidaitonSchema,
}