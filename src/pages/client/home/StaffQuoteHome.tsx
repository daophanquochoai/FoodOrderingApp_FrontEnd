import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import { StaffQuoteCard } from "../../../components/card";

const StaffQuoteHome = () => {
  return (
    <div className="py-10 my-3">
      <Swiper
        loop={true}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="SwipperStaffQuote pb-12"
      >
        <SwiperSlide>
          <StaffQuoteCard
            content="There are many variations of passages of lorem Ipsum available but form by injected humour randomised to words which don't look even slightly of model sentence structures to believable."
            image="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
            name="Stefanie Rashford"
            major="Web Developer"
          />
        </SwiperSlide>
        <SwiperSlide>
          <StaffQuoteCard
            content="There are many variations of passages of lorem Ipsum available but form by injected humour randomised to words which don't look even slightly of model sentence structures to believable."
            image="https://heucollege.edu.vn/upload/2025/02/avatar-cute-cam-dien-thoai-4.webp"
            name="Stefanie Rashford"
            major="Web Designer"
          />
        </SwiperSlide>
        <SwiperSlide>
          <StaffQuoteCard
            content="There are many variations of passages of lorem Ipsum available but form by injected humour randomised to words which don't look even slightly of model sentence structures to believable."
            image="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
            name="Stefanie Rashford"
            major="Manager"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default StaffQuoteHome;
