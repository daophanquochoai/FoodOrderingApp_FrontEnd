import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import ProductItem from "../../../components/product/ProductItem";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const LastestProductHome = () => {
  return (
    <div className="mt-8 py-8 w-screen relative">
      <div className="flex max-w-[85%] mx-auto flex-col relative">
        <h2 className="font-kanit text-[clamp(14px,4vw,50px)] font-medium w-full text-center mb-3">
          Latest Products
        </h2>

        {/* Swiper */}
        <div className="w-full h-fit group/button-navigate">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden group-hover/button-navigate:block transition-all duration-200">
            <div className="swiper-button-prev-custom w-[50px] h-[50px] flex items-center justify-center shadow-xl bg-white text-gray-700 p-2 rounded-full cursor-pointer">
              <GrLinkPrevious />
            </div>
          </div>
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden group-hover/button-navigate:block transition-all duration-200">
            <div className="swiper-button-next-custom w-[50px] h-[50px] flex items-center justify-center shadow-xl bg-white text-gray-700 p-2 rounded-full cursor-pointer">
              <GrLinkNext />
            </div>
          </div>

          <Swiper
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1300: { slidesPerView: 4 },
            }}
            freeMode={true}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={30}
            modules={[FreeMode, Pagination, Navigation]}
            className="LatestProductHome h-[80vw] sm:h-[65vw] md:h-[45vw] lg:h-[34vw]"
          >
            <SwiperSlide>
              <ProductItem discount={10} size={true} image={1} />
            </SwiperSlide>
            <SwiperSlide>
              <ProductItem discount={0} size={true} image={2} />
            </SwiperSlide>
            <SwiperSlide>
              <ProductItem discount={0} size={false} image={2} />
            </SwiperSlide>
            <SwiperSlide>
              <ProductItem discount={14} size={false} image={1} />
            </SwiperSlide>
            <SwiperSlide>
              <ProductItem discount={0} size={false} image={1} />
            </SwiperSlide>
            <SwiperSlide>
              <ProductItem discount={20} size={false} image={2} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LastestProductHome;
