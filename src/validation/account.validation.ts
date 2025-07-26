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

    image: yup.string().url('Image must be a valid URL').optional(),

    isActive: yup.boolean().required('Active status is required').default(true),

    username: yup
        .string()
        .required('Username is required')
        .matches(
            /^[a-zA-Z0-9_.]+$/,
            'Username can only contain letters, numbers, underscores, and dots'
        ),

    email: yup.string().email('Email must be a valid email').required('Email is required'),

    role: yup.string().required('Role is required'),
});
