import * as yup from 'yup';

export const voucherSchema = yup.object().shape({
    code: yup
        .string()
        .required('Voucher code is required')
        .min(3, 'Voucher code must be at least 3 characters')
        .max(20, 'Voucher code must not exceed 20 characters')
        .matches(
            /^[A-Z0-9_-]+$/,
            'Voucher code can only contain uppercase letters, numbers, hyphens, and underscores'
        ),

    description: yup
        .string()
        .required('Description is required')
        .test('min-length', 'Description must be at least 10 characters', (value) => {
            if (!value) return false;
            // Remove HTML tags for length validation
            const textContent = value.replace(/<[^>]*>/g, '').trim();
            return textContent.length >= 10;
        })
        .test('max-length', 'Description must not exceed 500 characters', (value) => {
            if (!value) return true;
            // Remove HTML tags for length validation
            const textContent = value.replace(/<[^>]*>/g, '').trim();
            return textContent.length <= 500;
        }),

    discountType: yup
        .string()
        .required('Voucher type is required')
        .oneOf(['PERCENT', 'CASH'], 'Voucher type must be either percentage or fixed'),

    discountValue: yup
        .number()
        .required('Voucher value is required')
        .positive('Voucher value must be positive')
        .when('discountType', {
            is: 'PERCENT',
            then: (schema) => schema.max(100, 'Percentage cannot exceed 100%'),
            otherwise: (schema) => schema,
        }),

    maxDiscount: yup.number().when('discountType', {
        is: 'PERCENT',
        then: (schema) =>
            schema.required('Max discount is required').positive('Max discount must be positive'),
        otherwise: (schema) => schema.optional(),
    }),

    maxUse: yup
        .number()
        .required('Max usage is required')
        .positive('Max usage must be positive')
        .integer('Max usage must be a whole number')
        .min(1, 'Max usage must be at least 1'),

    startDate: yup
        .date()
        .required('Start date is required')
        .min(new Date(), 'Start date cannot be in the past'),

    endDate: yup
        .date()
        .required('End date is required')
        .min(yup.ref('startDate'), 'End date must be after start date'),

    status: yup
        .string()
        .required('Status is required')
        .oneOf(['ACTIVE', 'DELETE', 'EXPIRED'], 'Invalid status value'),
});

export const voucherEditSchema = yup.object().shape({
    code: yup
        .string()
        .required('Voucher code is required')
        .min(3, 'Voucher code must be at least 3 characters')
        .max(20, 'Voucher code must not exceed 20 characters')
        .matches(
            /^[A-Z0-9_-]+$/,
            'Voucher code can only contain uppercase letters, numbers, hyphens, and underscores'
        ),

    description: yup
        .string()
        .required('Description is required')
        .test('min-length', 'Description must be at least 10 characters', (value) => {
            if (!value) return false;
            // Remove HTML tags for length validation
            const textContent = value.replace(/<[^>]*>/g, '').trim();
            return textContent.length >= 10;
        })
        .test('max-length', 'Description must not exceed 500 characters', (value) => {
            if (!value) return true;
            // Remove HTML tags for length validation
            const textContent = value.replace(/<[^>]*>/g, '').trim();
            return textContent.length <= 500;
        }),

    discountType: yup
        .string()
        .required('Voucher type is required')
        .oneOf(['PERCENT', 'CASH'], 'Voucher type must be either percentage or fixed'),

    discountValue: yup
        .number()
        .required('Voucher value is required')
        .positive('Voucher value must be positive')
        .when('discountType', {
            is: 'PERCENT',
            then: (schema) => schema.max(100, 'Percentage cannot exceed 100%'),
            otherwise: (schema) => schema,
        }),

    maxDiscount: yup.number().when('discountType', {
        is: 'PERCENT',
        then: (schema) =>
            schema.required('Max discount is required').positive('Max discount must be positive'),
        otherwise: (schema) => schema.optional(),
    }),

    maxUse: yup
        .number()
        .required('Max usage is required')
        .positive('Max usage must be positive')
        .integer('Max usage must be a whole number')
        .min(1, 'Max usage must be at least 1'),

    startDate: yup.date().required('Start date is required'),

    endDate: yup.date().required('End date is required'),
    status: yup
        .string()
        .required('Status is required')
        .oneOf(['ACTIVE', 'DELETE', 'EXPIRED'], 'Invalid status value'),
});
