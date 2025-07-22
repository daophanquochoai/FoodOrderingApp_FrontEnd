import * as yup from 'yup';

export const ProductSchema = yup.object().shape({
    name: yup.string().min(2, 'At least 2 characters').required(),

    image: yup.string().required('Image is required'),

    status: yup.boolean(),

    desc: yup.string().required('Description is required').optional(),
});
