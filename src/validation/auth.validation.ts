import * as yup from 'yup';
import 'yup-phone';

export const userSchema = yup.object().shape({
    userName: yup
        .string()
        .required('User name is required')
        .min(2, 'Name must be at least 2 characters')
        .email('Email format is not correct! Please check again.'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
        ),
});

export const userFullSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .phone('VN', true, 'Phone number is not valid'),
    email: yup
        .string()
        .required('Email is required')
        .email('Email format is not correct! Please check again.'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
        ),
});

declare module 'yup' {
    interface StringSchema {
        phone(countryCode?: string, strict?: boolean, errorMessage?: string): this;
    }
}
