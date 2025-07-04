import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import CategoryItem from "../../../components/category/CategoryItem";

const CategoryHome = () => {
  return (
    <div className="mt-2 py-10 w-screen bg-white">
      <div className="flex mx-auto max-w-[85%] flex-col">
        <h2 className="font-kanit text-[clamp(14px,4vw,50px)] font-medium w-full text-center">
          Shop By Categories
        </h2>
        <div className="w-full h-fit">
          <Swiper
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1250: {
                slidesPerView: 5,
              },
            }}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            spaceBetween={10}
            modules={[FreeMode, Pagination]}
            className="SlideCategoryHome h-[38vw] sm:h-[34vw] lg:h-[30vw]"
          >
            <SwiperSlide>
              <CategoryItem />
            </SwiperSlide>

            <SwiperSlide>
              <CategoryItem />
            </SwiperSlide>

            <SwiperSlide>
              <CategoryItem />
            </SwiperSlide>

            <SwiperSlide>
              <CategoryItem />
            </SwiperSlide>

            <SwiperSlide>
              <CategoryItem />
            </SwiperSlide>

            <SwiperSlide>
              <CategoryItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
