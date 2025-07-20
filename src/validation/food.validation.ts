import * as yup from 'yup';

// name: 'Hamburger Bò',
// desc: 'Bánh hamburger bò nướng với rau xà lách, cà chua và sốt đặc biệt.',
// image: 'https://img.freepik.com/premium-photo/humber-barger_1019272-1536.jpg',
// status: true,
// create_date: '2024-09-01T08:00:00Z',
// last_update_time: '2024-09-10T10:30:00Z',
// food_code: 'HB001',
// category_id: 1, // Đồ ăn nhanh
// sizes: [
//     { size: 'S', price: 25000 },
//     { size: 'M', price: 32000 },
//     { size: 'L', price: 39000 },
// ]

export const ProductSchema = yup.object().shape({
    name: yup.string().min(2, 'At least 2 characters').required(),

    image: yup.string().required(),

    status: yup.boolean().default(true),

    desc: yup.string().nullable().optional(),
});
