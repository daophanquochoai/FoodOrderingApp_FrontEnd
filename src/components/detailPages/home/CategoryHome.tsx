import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { CategoryItem } from '../../../components/category';
import { Category } from '../../../type';
import { fetchCategoryHomepage } from '@/store/action/admin/homepage/homepage.action';
import {
    selectHomepageCategories,
    selectCategoriesLoading
} from '@/store/selector/admin/homepage/homepage.selector'
import { Spin } from 'antd';

const CategoryHome = () => {
    const dispatch = useDispatch();

    // Fetch categories from the store
    const categories = useSelector(selectHomepageCategories);
    const loading = useSelector(selectCategoriesLoading);
    
    useEffect(() => {
        dispatch(fetchCategoryHomepage());
    }, []);


    // const categories: Category[] = [
    //     {
    //         id: 1,
    //         name: 'Cheese Fried Chicken',
    //         image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-2_7fea190e-4deb-45ca-b2ce-1750a57d0884.png?v=1747046512',
    //         desc: 'All kinds of Italian-style pizzas.',
    //         create_date: '2025-07-01',
    //         late_update_time: '2025-07-05',
    //         status: true,
    //         parentId: null,
    //         create_by: 1,
    //     },
    //     {
    //         id: 2,
    //         name: 'Crunchy Taco Bell',
    //         image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-5.png?v=1747045791',
    //         desc: 'Pizzas with no meat, only veggies and cheese.',
    //         create_date: '2025-07-02',
    //         late_update_time: '2025-07-06',
    //         status: true,
    //         parentId: 1,
    //         create_by: 1,
    //     },
    //     {
    //         id: 3,
    //         name: 'French Fries',
    //         image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-4.png?v=1747045743',
    //         desc: 'Classic and modern burgers with multiple styles.',
    //         create_date: '2025-07-03',
    //         late_update_time: '2025-07-07',
    //         status: true,
    //         parentId: null,
    //         create_by: 1,
    //     },
    //     {
    //         id: 4,
    //         name: 'Hamburger Veggie',
    //         image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-1.png?v=1747045631',
    //         desc: 'Various beverages: soft drinks, coffee, tea.',
    //         create_date: '2025-07-03',
    //         late_update_time: '2025-07-07',
    //         status: true,
    //         parentId: null,
    //         create_by: 2,
    //     },
    //     {
    //         id: 5,
    //         name: 'Cheese Fried Chicken',
    //         image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-3.png?v=1747045706',
    //         desc: 'Hot or iced coffee, Vietnamese and international.',
    //         create_date: '2025-07-03',
    //         late_update_time: '2025-07-07',
    //         status: true,
    //         parentId: 4,
    //         create_by: 2,
    //     },
    //     {
    //         id: 6,
    //         name: 'Drinks',
    //         image: 'https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-3.png?v=1747045706',
    //         desc: 'Hot or iced coffee, Vietnamese and international.',
    //         create_date: '2025-07-03',
    //         late_update_time: '2025-07-07',
    //         status: true,
    //         parentId: 4,
    //         create_by: 2,
    //     },
    // ];

    return (
        <div className="">
            <div className="mt-2 pt-10 container">
                <div className="flex mx-auto w-full flex-col">
                    <h2 className="font-kanit text-[clamp(28px,3vw,35px)] font-medium w-full text-center mb-1">
                        Shop By Categories
                    </h2>
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <div className="w-full h-fit">
                            <Swiper
                                loop={true}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                    },
                                    560: {
                                        slidesPerView: 3,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                    },
                                    1400: {
                                        slidesPerView: 5,
                                    },
                                }}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                spaceBetween={10}
                                modules={[FreeMode, Pagination]}
                                className="SlideCategoryHome pb-3 lg:mb-3 "
                            >
                                {/* {categories.length > 0 &&
                                    categories.map((category) => (
                                        <SwiperSlide key={category.id}>
                                            <CategoryItem {...category} />
                                        </SwiperSlide>
                                    ))} */}

                                {categories.length > 0 &&
                                    categories.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <CategoryItem {...item.category} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryHome;
