import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import ProductItem from '../../../components/product/ProductItem';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import { Food } from '../../../type';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestProducts } from '@/store/action/admin/homepage/homepage.action';
import {
    selectLatestProducts,
    selectLatestProductsLoading,
} from '@/store/selector/admin/homepage/homepage.selector';
import { Spin } from 'antd';

const LastestProductHome = () => {
    const dispatch = useDispatch();
    const latestProducts = useSelector(selectLatestProducts);
    const loading = useSelector(selectLatestProductsLoading);

    useEffect(() => {
        dispatch(fetchLatestProducts());
    }, []);

    console.log(latestProducts);

    return (
        <div className="mt-6 pb-8 container relative">
            <div className="flex w-full mx-auto flex-col relative">
                <h2 className="font-kanit text-[clamp(28px,3vw,35px)] font-medium w-full text-center mb-3">
                    Latest Products
                </h2>
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div className="w-full h-fit group/button-navigate">
                        <div className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-10 hidden group-hover/button-navigate:block transition-all duration-200">
                            <div className="swiper-button-prev-custom w-[50px] h-[50px] flex items-center justify-center shadow-xl bg-white text-gray-700 p-2 rounded-full cursor-pointer">
                                <GrLinkPrevious />
                            </div>
                        </div>
                        <div className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-10 hidden group-hover/button-navigate:block transition-all duration-200">
                            <div className="swiper-button-next-custom w-[50px] h-[50px] flex items-center justify-center shadow-xl bg-white text-gray-700 p-2 rounded-full cursor-pointer">
                                <GrLinkNext />
                            </div>
                        </div>

                        <Swiper
                            loop={true}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                380: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 4 },
                                1300: { slidesPerView: 5 },
                            }}
                            freeMode={true}
                            pagination={{ clickable: true }}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            spaceBetween={30}
                            modules={[FreeMode, Pagination, Navigation]}
                            className="LatestProductHome "
                        >
                            {latestProducts.length > 0 &&
                                latestProducts.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <ProductItem {...item.food} />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LastestProductHome;
