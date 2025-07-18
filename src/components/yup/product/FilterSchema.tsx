import * as yup from 'yup';

export const FilterProductSchema = yup.object().shape({
    search: yup.string().min(3, 'Ít nhất 3 ký tự').nullable().optional(),

    minDiscount: yup
        .number()
        .nullable()
        .optional()
        .transform((v, o) => (o == '' ? null : v))
        .min(0, 'Tối thiểu 0%'),
    maxDiscount: yup
        .number()
        .nullable()
        .optional()
        .transform((v, o) => (o == '' ? null : v))
        .max(100, 'Tối đa 100%'),

    minPrice: yup
        .number()
        .nullable()
        .optional()
        .transform((v, o) => (o == '' ? null : v))
        .min(0, 'Tối thiểu 0'),
    maxPrice: yup
        .number()
        .nullable()
        .optional()
        .transform((v, o) => (o == '' ? null : v)),

    minReady: yup
        .number()
        .nullable()
        .optional()
        .transform((v, o) => (o == '' ? null : v))
        .min(0, 'Tối thiểu 0'),

    maxReady: yup
        .number()
        .nullable()
        .optional()
        .transform((v, o) => (o == '' ? null : v)),

    foodIds: yup.array().of(yup.string()).nullable().optional(),

    size: yup.array().of(yup.string()).nullable().optional(),

    dateRange: yup
        .array()
        .of(yup.date().typeError('Ngày không hợp lệ'))
        .nullable()
        .optional()
        .test('validRange', 'Khoảng ngày không hợp lệ', (value) => {
            if (!value || value.length != 2) return true;
            return value?.[0] && value?.[1] ? value[0] <= value[1] : true;
        }),
});
