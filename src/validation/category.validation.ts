import * as yup from 'yup';
import 'yup-phone';

export const createCategorySchema = yup.object().shape({
    categoryName: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    description: yup
        .string()
        .required('Description is required')
        .min(8, 'Descript must be at least 8 characters'),
});
