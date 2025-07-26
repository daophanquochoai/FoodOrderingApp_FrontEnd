import * as yup from 'yup';

export const userInfoSchema = yup.object().shape({
    fullName: yup
        .string()
        .required('Full name is required')
        .min(2, 'Full name must be at least 2 characters'),

    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^(0|\+84)[0-9]{9}$/, 'Phone number is not valid'),

    email: yup.string().required('Email is required').email('Email is not valid'),
});
