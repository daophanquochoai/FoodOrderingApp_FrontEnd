import main_banner_1 from "../../../assets/main-banner-1.webp";
import main_banner_2 from "../../../assets/main-banner-2.webp";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SlideMain = () => {
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
        <SwiperSlide>
          <div
            className="w-screen relative overflow-hidden"
            style={{ maxHeight: "calc(100vh + 50px)" }}
          >
            <div
              className="w-full"
              style={{
                backgroundImage: `url(${main_banner_1})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "50.25vw",
              }}
            ></div>
            <div className="absolute inset-0 p-2 pl-10 h-full z-10">
              <Row className="h-full">
                <Col span={24} className="flex justify-end">
                  <div className="w-full max-w-[55%] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 text-white flex flex-col items-start justify-center h-full xl:gap-5 lg:gap-4 gap-3">
                    <h2 className="font-playball text-yellow-primary text-[clamp(14px,4vw,50px)]">
                      Chicken Burger
                    </h2>

                    <p className="font-kanit font-medium leading-none text-[clamp(14px,4.5vw,60px)]">
                      2 Mc Crispy Chicken Surprise Burger
                    </p>

                    <p className="font-montserrat font-semibold text-yellow-primary text-[clamp(12px,2.3vw,30px)]">
                      Two chicken burger only{" "}
                      <span className="text-[clamp(14px,3vw,40px)]">$69</span>
                    </p>

                    <p className="font-montserrat font-medium text-[clamp(12px,1.4vw,18px)] hidden md:block leading-[1.7]">
                      There will be leftover pimento cheese, but who's
                      complaining. Spread it onto bread the next day for lunch.
                    </p>

                    <button className="group text-[clamp(10px,1vw,18px)] btn-yellow-to-white px-3 py-2">
                      Order now
                      <FaArrowRightLong className="size-4 mb-[2px] group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-screen relative overflow-hidden"
            style={{ maxHeight: "calc(100vh + 50px)" }}
          >
            <div
              className="w-full"
              style={{
                backgroundImage: `url(${main_banner_2})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "50.25vw",
              }}
            ></div>
            <div className="absolute inset-0 p-2 pl-10 h-full z-10">
              <Row className="h-full">
                <Col span={24} className="flex justify-end">
                  <div className="w-full max-w-[55%] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 text-white flex flex-col items-start justify-center h-full xl:gap-5 lg:gap-4 gap-3">
                    <h2 className="font-playball text-yellow-primary text-[clamp(14px,4vw,50px)]">
                      Delicious Pizza
                    </h2>

                    <p className="font-kanit font-medium leading-none text-[clamp(14px,4.5vw,60px)]">
                      Hot Spanish Sizzles Spicy Pizza
                    </p>

                    <p className="font-montserrat font-semibold text-yellow-primary text-[clamp(12px,2.3vw,30px)]">
                      cheese chicken pizza only{" "}
                      <span className="text-[clamp(14px,3vw,40px)]">$79</span>
                    </p>

                    <p className="font-montserrat font-medium text-[clamp(12px,1.4vw,18px)] hidden md:block leading-[1.7]">
                      Spice it Up with Bbq Chicken,Chicken Sausages,Onion,Red
                      Paprika, Chicken Salami & Peri Peri Dip.
                    </p>

                    <button className="group text-[clamp(10px,1vw,18px)] btn-yellow-to-white px-3 py-2">
                      Order now
                      <FaArrowRightLong className="size-4 mb-[2px] group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SlideMain;
