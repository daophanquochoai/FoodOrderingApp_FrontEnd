import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { CategoryItem } from '../../../components/category';
import { Category } from '../../../type';
import { fetchCategoryHomepage } from '@/store/action/admin/homepage/homepage.action';
import {
    selectHomepageCategories,
    selectCategoriesLoading,
} from '@/store/selector/admin/homepage/homepage.selector';
import { Spin } from 'antd';

const CategoryHome = () => {
    const dispatch = useDispatch();

    // Fetch categories from the store
    const categories = useSelector(selectHomepageCategories);
    const loading = useSelector(selectCategoriesLoading);

    useEffect(() => {
        dispatch(fetchCategoryHomepage());
    }, []);

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
                        <div className="w-full h-[240px] my-[40px]">
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
                                className="SlideCategoryHome pb-3 lg:mb-3 h-full"
                            >
                                {categories.length > 0 &&
                                    categories.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <CategoryItem {...item.category} />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryHome;
