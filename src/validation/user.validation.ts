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

export const userPasswordSchema = yup.object().shape({
    currentPassword: yup
        .string()
        .required('Please enter your current password')
        .min(8, 'Password must be at least 8 characters'),

    newPassword: yup
        .string()
        .required('Please enter your new password')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
        ),

    confirmPassword: yup
        .string()
        .required('Please confirm your new password')
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});
