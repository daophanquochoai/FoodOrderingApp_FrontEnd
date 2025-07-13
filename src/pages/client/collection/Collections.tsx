import ClientBreadcrumb from '../../../components/breadcrumb/ClientBreadcrumb';
import { CategoryItem, DetailCategoryProduct } from '../../../components/category';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { Category, Food } from '../../../type';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Collections = () => {
    const categories: Category[] = [
        {
            id: 1,
            name: 'Cheese Fried Chicken',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-2_7fea190e-4deb-45ca-b2ce-1750a57d0884.png?v=1747046512',
            desc: 'All kinds of Italian-style pizzas.',
            create_date: '2025-07-01',
            late_update_time: '2025-07-05',
            status: true,
            parentId: null,
            create_by: 1,
        },
        {
            id: 2,
            name: 'Crunchy Taco Bell',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-5.png?v=1747045791',
            desc: 'Pizzas with no meat, only veggies and cheese.',
            create_date: '2025-07-02',
            late_update_time: '2025-07-06',
            status: true,
            parentId: 1,
            create_by: 1,
        },
        {
            id: 3,
            name: 'French Fries',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-4.png?v=1747045743',
            desc: 'Classic and modern burgers with multiple styles.',
            create_date: '2025-07-03',
            late_update_time: '2025-07-07',
            status: true,
            parentId: null,
            create_by: 1,
        },
        {
            id: 4,
            name: 'Hamburger Veggie',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-1.png?v=1747045631',
            desc: 'Various beverages: soft drinks, coffee, tea.',
            create_date: '2025-07-03',
            late_update_time: '2025-07-07',
            status: true,
            parentId: null,
            create_by: 2,
        },
        {
            id: 5,
            name: 'Cheese Fried Chicken',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-3.png?v=1747045706',
            desc: 'Hot or iced coffee, Vietnamese and international.',
            create_date: '2025-07-03',
            late_update_time: '2025-07-07',
            status: true,
            parentId: 4,
            create_by: 2,
        },
        {
            id: 6,
            name: 'Drinks',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-3.png?v=1747045706',
            desc: 'Hot or iced coffee, Vietnamese and international.',
            create_date: '2025-07-03',
            late_update_time: '2025-07-07',
            status: true,
            parentId: 4,
            create_by: 2,
        },
    ];

    const foods: Food[] = [
        {
            id: 1,
            name: 'Margherita Pizza',
            desc: 'Classic pizza with tomato sauce, mozzarella cheese, and basil.',
            image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
            status: false,
            create_date: '2025-07-01',
            last_update_time: '2025-07-05',
            food_code: 'FOOD001',
            category_id: 3,
            rate: 5,
            sizes: [
                {
                    size_id: 1,
                    name: 'Small',
                    price: 5.99,
                    discount: 0,
                    ready_in_minutes: 10,
                    status: true,
                },
                {
                    size_id: 2,
                    name: 'Medium',
                    price: 7.99,
                    discount: 10,
                    ready_in_minutes: 12,
                    status: true,
                },
                {
                    size_id: 3,
                    name: 'Large',
                    price: 9.99,
                    discount: 15,
                    ready_in_minutes: 15,
                    status: true,
                },
            ],
        },
        {
            id: 2,
            name: 'Cheeseburger',
            desc: 'Juicy beef patty with cheese, lettuce, tomato, and pickles.',
            image: 'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
            status: true,
            create_date: '2025-07-02',
            last_update_time: '2025-07-06',
            food_code: 'FOOD002',
            category_id: 4,
            sizes: [
                {
                    size_id: 4,
                    name: 'Standard',
                    price: 4.5,
                    discount: 0,
                    ready_in_minutes: 8,
                    status: true,
                },
                {
                    size_id: 5,
                    name: 'Large',
                    price: 6.5,
                    discount: 5,
                    ready_in_minutes: 10,
                    status: true,
                },
            ],
        },
        {
            id: 3,
            name: 'Caesar Salad',
            desc: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan.',
            image: 'https://www.shutterstock.com/image-photo/caesar-salad-paper-bowl-take-600nw-1178418982.jpg',
            status: true,
            create_date: '2025-07-03',
            last_update_time: '2025-07-07',
            food_code: 'FOOD003',
            category_id: 5,
            sizes: [
                {
                    size_id: 6,
                    name: 'Standard',
                    price: 5,
                    discount: 0,
                    ready_in_minutes: 10,
                    status: true,
                },
            ],
        },
        {
            id: 4,
            name: 'Vietnamese Iced Coffee',
            desc: 'Strong robusta coffee served with condensed milk over ice.',
            image: 'https://thumbs.dreamstime.com/b/vietnamese-iced-coffee-refreshing-authentic-coffee-delight-vietnamese-iced-coffee-popular-beverage-captured-photo-309197334.jpg',
            status: true,
            create_date: '2025-07-04',
            last_update_time: '2025-07-08',
            food_code: 'FOOD004',
            category_id: 5,
            rate: 4,
            sizes: [
                {
                    size_id: 7,
                    name: 'Standard',
                    price: 5.99,
                    discount: 20,
                    ready_in_minutes: 10,
                    status: true,
                },
            ],
        },
        {
            id: 5,
            name: 'Spaghetti Bolognese',
            desc: 'Spaghetti topped with a rich, meaty tomato sauce.',
            image: 'https://media.istockphoto.com/id/152548999/photo/spaghetti-bolognese-on-white.jpg?s=612x612&w=0&k=20&c=6mpMNJlZohVjBqmsSLa3nVUBSpRmYAr6cQUjkFMO8jg=',
            status: true,
            create_date: '2025-07-05',
            last_update_time: '2025-07-08',
            food_code: 'FOOD005',
            category_id: 5,
            rate: 4.5,
            sizes: [
                {
                    size_id: 8,
                    name: 'Standard',
                    price: 6.5,
                    discount: 0,
                    ready_in_minutes: 15,
                    status: true,
                },
                {
                    size_id: 9,
                    name: 'Medium',
                    price: 6.5,
                    discount: 0,
                    ready_in_minutes: 15,
                    status: true,
                },
            ],
        },
    ];

    const [showCollectionDetail, setShowCollectionDetail] = useState<Boolean>(false);
    const [searchParams] = useSearchParams();
    const [categoryId, setCategoryId] = useState<Number>(0);

    useEffect(() => {
        const detail = searchParams.get('detail');
        setShowCollectionDetail(!!detail && !isNaN(Number(detail)));
        setCategoryId(Number(detail));
    }, [searchParams]);

    return (
        <>
            {categoryId ? (
                <h2 className="pt-8 pb-2 text-center font-kanit text-2xl ">Hamburger Veggie</h2>
            ) : (
                <h2 className="pt-8 pb-2 text-center font-kanit text-2xl ">All Foods</h2>
            )}

            <div className="">
                <div className="container border-t border-gray-200">
                    <div className="h-[200px]">
                        <Swiper
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 3,
                                },
                                560: {
                                    slidesPerView: 4,
                                },
                                768: {
                                    slidesPerView: 5,
                                },
                                1200: {
                                    slidesPerView: 6,
                                },
                            }}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            spaceBetween={0}
                            modules={[FreeMode, Pagination]}
                            className="SlideCategory h-full"
                        >
                            {categories.length > 0 &&
                                categories.map((category) => (
                                    <SwiperSlide key={category.id}>
                                        <CategoryItem
                                            {...{
                                                ...category,
                                                small: true,
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <div className="container">
                <DetailCategoryProduct products={foods} />
            </div>
        </>
    );
};

export default Collections;
