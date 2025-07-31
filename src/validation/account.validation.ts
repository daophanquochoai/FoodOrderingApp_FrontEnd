import * as yup from 'yup';

export const empAccountSchema = yup.object({
    name: yup
        .string()
        .required('Employee name is required')
        .min(3, 'Name must be at least 3 characters'),

    cccd: yup
        .string()
        .required('CCCD is required')
        .matches(/^\d{12}$/, 'CCCD must be exactly 12 digits'),

    isActive: yup.boolean().required('Active status is required').default(true),
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    ),
    role: yup.string().required('Role is required'),
});
