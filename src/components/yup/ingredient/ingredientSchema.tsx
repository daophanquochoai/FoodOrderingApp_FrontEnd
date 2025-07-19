import * as yup from 'yup';

export const IngredientShema = yup.object().shape({
    name: yup.string().min(2, 'At least 2 characters').nullable().required(),

    unit: yup.string().required(),

    low_threshold: yup
        .number()
        .optional()
        .transform((v, o) => (o == '' ? 0 : v))
        .min(0, 'Minimum 0'),
});
