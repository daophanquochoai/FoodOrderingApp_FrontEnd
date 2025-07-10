import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

import {
  BannerProps,
  GenericBanner,
  getBannerStyleByType,
} from "../../../components/banner";

const dataFake = [
  {
    type: "banner_main",
    image:
      "http://res.cloudinary.com/dl54jz2u3/image/upload/v1751704515/qu9haklltpgrmjboezjm.webp",
    title: "Chicken Burger",
    subTitle: "2 Mc Crispy Chicken Surprise Burger",
    descriptionPrice: "Two chicken burger only",
    price: "$69",
    description:
      "There will be leftover pimento cheese, but who's complaining. Spread it onto bread the next day for lunch.",
    buttonText: "Order now",
  },
  {
    type: "banner_main",
    image:
      "http://res.cloudinary.com/dl54jz2u3/image/upload/v1751699210/r4yrimwuisuddbxnqz15.webp",
    title: "Delicious Pizza",
    subTitle: "Hot Spanish Sizzles Spicy Pizza",
    descriptionPrice: "Cheese chicken pizza only",
    price: "$79",
    description:
      "Spice it Up with Bbq Chicken, Chicken Sausages, Onion, Red Paprika, Chicken Salami & Peri Peri Dip.",
    buttonText: "Order now",
  },
];

const SlideMain = () => {
  const [banners, setBanners] = useState<BannerProps[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const final = dataFake.map((item: any) => {
        const style = getBannerStyleByType(item.type, item, item.variant);
        return {
          ...style,
          image: item.image,
        } as BannerProps;
      });

      setBanners(final);
    };

    fetchBanners();
  }, []);

  return (
    <div className="lg:mt-[-110px] overflow-hidden">
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
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="SwipperBannerMain"
      >
        {banners?.map((props, index) => (
          <SwiperSlide>
            <GenericBanner key={index} {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideMain;
