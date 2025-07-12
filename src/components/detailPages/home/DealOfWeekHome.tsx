import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import { ProductItem } from '../../../components/product';
import { Food } from '../../../type';

const DealOfWeekHome = () => {
    const foods: Food[] = [
        {
            id: 1,
            name: 'Margherita Pizza',
            desc: 'Classic pizza with tomato sauce, mozzarella cheese, and basil.',
            image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
            status: true,
            create_date: '2025-07-01',
            last_update_time: '2025-07-05',
            food_code: 'FOOD001',
            category_id: 2,
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
            category_id: 3,
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
        // {
        //   id: 3,
        //   name: "Caesar Salad",
        //   desc: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan.",
        //   image:
        //     "https://www.shutterstock.com/image-photo/caesar-salad-paper-bowl-take-600nw-1178418982.jpg",
        //   status: true,
        //   create_date: "2025-07-03",
        //   last_update_time: "2025-07-07",
        //   food_code: "FOOD003",
        //   category_id: 4,
        //   sizes: [
        //     {
        //       size_id: 6,
        //       name: "Standard",
        //       price: 5.99,
        //       discount: 0,
        //       ready_in_minutes: 10,
        //       status: true,
        //     },
        //   ],
        // },
        {
            id: 4,
            name: 'Vietnamese Iced Coffee',
            desc: 'Strong robusta coffee served with condensed milk over ice.',
            image: 'https://thumbs.dreamstime.com/b/vietnamese-iced-coffee-refreshing-authentic-coffee-delight-vietnamese-iced-coffee-popular-beverage-captured-photo-309197334.jpg',
            status: true,
            create_date: '2025-07-04',
            last_update_time: '2025-07-08',
            food_code: 'FOOD004',
            category_id: 6,
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
        // {
        //   id: 5,
        //   name: "Spaghetti Bolognese",
        //   desc: "Spaghetti topped with a rich, meaty tomato sauce.",
        //   image:
        //     "https://media.istockphoto.com/id/152548999/photo/spaghetti-bolognese-on-white.jpg?s=612x612&w=0&k=20&c=6mpMNJlZohVjBqmsSLa3nVUBSpRmYAr6cQUjkFMO8jg=",
        //   status: true,
        //   create_date: "2025-07-05",
        //   last_update_time: "2025-07-08",
        //   food_code: "FOOD005",
        //   category_id: 5,
        //   rate: 4.5,
        //   sizes: [
        //     {
        //       size_id: 8,
        //       name: "Standard",
        //       price: 6.5,
        //       discount: 0,
        //       ready_in_minutes: 15,
        //       status: true,
        //     },
        //     {
        //       size_id: 9,
        //       name: "Medium",
        //       price: 6.5,
        //       discount: 0,
        //       ready_in_minutes: 15,
        //       status: true,
        //     },
        //   ],
        // },
    ];

    return (
        <div className="mt-4 py-8 container relative">
            <div className="flex w-full mx-auto flex-col relative">
                <h2 className="font-kanit text-[clamp(28px,3vw,35px)] font-medium w-full text-center mb-3">
                    Deal Of The Week
                </h2>

                {/* Swiper */}
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
                        className="LatestProductHome"
                    >
                        {foods.length > 0 &&
                            foods.map((food) => (
                                <SwiperSlide key={food.id}>
                                    <ProductItem {...food} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default DealOfWeekHome;
