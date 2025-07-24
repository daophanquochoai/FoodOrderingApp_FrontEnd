import * as yup from 'yup';

export const ProductSchema = yup.object().shape({
    name: yup.string().min(2, 'At least 2 characters').required(),

    status: yup.string().required('Description is required').optional(),

    desc: yup.string().required('Description is required').optional(),
});
