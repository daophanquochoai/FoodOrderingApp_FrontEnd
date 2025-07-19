import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

const ProductDisplay: React.FC = () => {
    const productImages = [
        {
            id: 1,
            src: 'https://grillfood-demo.myshopify.com/cdn/shop/files/8_7db4be71-b67b-427f-96b4-5cdf4ddc491b.jpg?v=1746868484&width=416',
            alt: 'Pizza Image 1',
        },
        {
            id: 2,
            src: 'https://grillfood-demo.myshopify.com/cdn/shop/files/11_863d9310-647d-4e03-b274-7c8d5d908b44.jpg?v=1746868484&width=416',
            alt: 'Pizza Image 2',
        },
        {
            id: 3,
            src: 'https://grillfood-demo.myshopify.com/cdn/shop/files/1_3a924a3f-537f-473c-8175-504516851021.jpg?v=1746868484&width=416',
            alt: 'Pizza Image 3',
        },
        {
            id: 4,
            src: 'https://grillfood-demo.myshopify.com/cdn/shop/files/6_ae46c7d2-4c64-41c3-98b0-219bf143f76b.jpg?v=1746868484&width=416',
            alt: 'Pizza Image 4',
        },
        {
            id: 5,
            src: 'https://grillfood-demo.myshopify.com/cdn/shop/files/22_75c5b2b0-057b-4ac2-9ab8-4180fcfcbd36.jpg?v=1746868484&width=416',
            alt: 'Pizza Image 5',
        },
    ];

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

    const [thumbsSwiperMobile, setThumbsSwiperMobile] = useState<SwiperType | null>(null);
    const [mainSwiperMobile, setMainSwiperMobile] = useState<SwiperType | null>(null);

    return (
        <>
            {/* Desktop layout */}
            <div className="hidden lg:flex gap-4">
                <div className="w-[110px]">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="vertical"
                        slidesPerView={4}
                        spaceBetween={16}
                        speed={500}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-[460px]"
                    >
                        {productImages.map((image, index) => (
                            <SwiperSlide key={image.id} className="cursor-pointer">
                                <div
                                    className="relative border-2 border-white overflow-hidden hover:border-orange-500 transition-all duration-200 aspect-square"
                                    onClick={() => {
                                        // Manually sync với main swiper khi click
                                        if (mainSwiper) {
                                            mainSwiper.slideTo(index);
                                        }
                                    }}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex-1">
                    <Swiper
                        onSwiper={setMainSwiper}
                        thumbs={{
                            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                        }}
                        modules={[Thumbs]}
                        className="w-[300px] xl:w-[430px]"
                        allowTouchMove={false}
                        speed={0}
                        effect="creative"
                        creativeEffect={{
                            prev: {
                                translate: [0, 0, 0],
                            },
                            next: {
                                translate: [0, 0, 0],
                            },
                        }}
                    >
                        {productImages.map((image) => (
                            <SwiperSlide key={image.id}>
                                <div className="relative bg-gray-100 overflow-hidden">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden">
                <div className="mb-4">
                    <Swiper
                        onSwiper={setMainSwiperMobile}
                        thumbs={{
                            swiper:
                                thumbsSwiperMobile && !thumbsSwiperMobile.destroyed
                                    ? thumbsSwiperMobile
                                    : null,
                        }}
                        modules={[Thumbs]}
                        className="w-[400px] md:w-[320px] h-[400px] md:h-[320px]"
                        allowTouchMove={false}
                        speed={0}
                        effect="creative"
                        creativeEffect={{
                            prev: {
                                translate: [0, 0, 0],
                            },
                            next: {
                                translate: [0, 0, 0],
                            },
                        }}
                    >
                        {productImages.map((image) => (
                            <SwiperSlide key={image.id}>
                                <div className="relative bg-gray-100 overflow-hidden">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <Swiper
                    onSwiper={setThumbsSwiperMobile}
                    direction="horizontal"
                    slidesPerView={4}
                    spaceBetween={8}
                    speed={500}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-[400px] md:w-[320px]"
                >
                    {productImages.map((image, index) => (
                        <SwiperSlide key={image.id} className="cursor-pointer">
                            <div
                                className="relative border-2 border-white overflow-hidden hover:border-orange-500 transition-all duration-200 aspect-square"
                                onClick={() => {
                                    // Manually sync với main swiper khi click
                                    if (mainSwiperMobile) {
                                        mainSwiperMobile.slideTo(index);
                                    }
                                }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default ProductDisplay;
