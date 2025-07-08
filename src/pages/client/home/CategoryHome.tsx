import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { CategoryItem } from "../../../components/category";

const CategoryHome = () => {
  return (
    <div className="bg-white">
      <div className="mt-2 pt-10 container">
        <div className="flex mx-auto w-full flex-col">
          <h2 className="font-kanit text-[clamp(28px,4vw,50px)] font-medium w-full text-center">
            Shop By Categories
          </h2>
          <div className="w-full h-fit">
            <Swiper
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                490: {
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
              className="SlideCategoryHome h-[300px] sm:h-[340px] md:h-[400px] lg:h-[420px]"
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
    </div>
  );
};

export default CategoryHome;
