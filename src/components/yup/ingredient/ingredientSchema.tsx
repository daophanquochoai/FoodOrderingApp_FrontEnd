import { Unit } from '@/type/store/admin/ingredients/ingredients.style';
import * as yup from 'yup';

export const IngredientShema = yup.object().shape({
    name: yup.string().min(2, 'At least 2 characters').nullable().required(),
    unit: yup
        .string()
        .oneOf(Object.values(Unit) as string[])
        .required(),
    low_threshold: yup
        .number()
        .optional()
        .transform((v, o) => (o === '' || o === null ? 0 : v))
        .min(0, 'Minimum 0'),
});
