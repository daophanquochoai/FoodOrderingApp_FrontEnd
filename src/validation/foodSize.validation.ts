import * as yup from 'yup';

export const createFoodSizeSchema = yup.object().shape({
    sizeId: yup.number().required('Size is required.'),

    price: yup
        .number()
        .typeError('Price must be a number.')
        .transform((value, originalValue) =>
            originalValue === '' ? undefined : Number(originalValue)
        )
        .required('Price is required.')
        .min(0.01, 'Price must be greater than 0.'),

    discount: yup
        .number()
        .typeError('Discount must be a number.')
        .transform((value, originalValue) =>
            originalValue === '' ? undefined : Number(originalValue)
        )
        .required('Discount is required.')
        .min(0, 'Discount cannot be negative.'),

    readyInMinutes: yup
        .number()
        .typeError('Ready in minutes must be a number.')
        .transform((value, originalValue) =>
            originalValue === '' ? undefined : Number(originalValue)
        )
        .required('Ready In Minutes is required.')
        .min(1, 'Must be at least 1 minute.'),
});
