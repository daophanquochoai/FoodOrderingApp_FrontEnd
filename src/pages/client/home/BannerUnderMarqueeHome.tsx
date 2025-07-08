import React, { useEffect, useState } from "react";
import sub_banner_4 from "../../../assets/cms-banner-2.webp";
import sub_banner_5 from "../../../assets/cms-banner-3.webp";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  BannerProps,
  GenericBanner,
  getBannerStyleByType,
} from "../../../components/banner";

const dataSubFake = [
  {
    type: "banner_sub",
    variant: "yellow-text",
    image:
      "http://res.cloudinary.com/dl54jz2u3/image/upload/v1751772313/i5pxjtnv3rueaqvdjtta.webp",
    title: "Smerican Food",
    subTitle: "Double beef",
    subTitle2: "Hot Dogs!",
    buttonText: "Order now",
    layout: "left",
    text_level: 2,
  },
  {
    type: "banner_sub",
    variant: "yellow-text",
    image:
      "http://res.cloudinary.com/dl54jz2u3/image/upload/v1751772289/hdylvyzea8tx7ney16ny.webp",
    title: "Delicious",
    subTitle: "New Oninon",
    subTitle2: "Burgure!",
    buttonText: "Order now",
    layout: "left",
    text_level: 2,
  },
];

const BannerUnderMarqueeHome = () => {
  const [subBanners, setSubBanners] = useState<BannerProps[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const final = dataSubFake.map((item: any) => {
        const style = getBannerStyleByType(item.type, item, item.variant);
        // console.log(style);
        return {
          ...style,
        } as BannerProps;
      });

      setSubBanners(final);
    };

    fetchBanners();
  }, []);

  return (
    <div className="container py-8">
      <Row gutter={[20, 20]}>
        {/* {subBanners?.map((props, index) => (
          <Col xs={24} lg={12} key={index}>
            <div className="bg-gray-200 cursor-pointer group rounded-md h-[280px] md:h-[280px] pl-2 w-full">
              <GenericBanner key={index} {...props} />
            </div>
          </Col>
        ))} */}

        <Col xs={24} lg={12}>
          <div className="bg-gray-200 overflow-hidden cursor-pointer relative group rounded-md h-[300px] md:h-[280px] pl-2 w-full">
            <div
              className="absolute inset-0 transition-transform duration-1000 ease-in-out transform group-hover:scale-105 group-hover:-translate-y-1 "
              style={{
                backgroundImage: `url(${sub_banner_4})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="p-2 pl-0 h-full">
              <Row className="h-full">
                <Col span={24} className="flex justify-start">
                  <div className="w-full max-w-[65%] px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 text-white flex flex-col items-start justify-center h-full xl:gap-2 lg:gap-1 gap-1">
                    <h2 className="font-playball text-yellow-primary text-[clamp(24px,2vw,28px)]">
                      Smerican Food
                    </h2>

                    <p className="font-kanit font-medium leading-snug text-[clamp(40px,2.5vw,50px)] uppercase">
                      Double beef
                    </p>

                    <p className="font-kanit text-yellow-primary text-[clamp(40px,3vw,55px)] font-bold -mt-6">
                      Hot Dogs!
                    </p>

                    <button className="group/icon-hover text-[clamp(10px,2vw,14px)] btn-yellow-to-black px-2 py-1">
                      Order now
                      <FaArrowRightLong className="size-3 mb-[1px] md:size-3 lg:size-4 lg:mb-[2px] group-hover/icon-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div className="bg-gray-200 overflow-hidden cursor-pointer relative group rounded-md h-[300px] md:h-[280px] pl-2  w-full">
            <div
              className="absolute inset-0 transition-transform duration-1000 ease-in-out transform group-hover:scale-105 group-hover:-translate-y-1 "
              style={{
                backgroundImage: `url(${sub_banner_5})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="p-2 pl-0 h-full">
              <Row className="h-full">
                <Col span={24} className="flex justify-start">
                  <div className="w-full max-w-[65%] px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 text-white flex flex-col items-start justify-center h-full xl:gap-2 lg:gap-1 gap-1">
                    <h2 className="font-playball text-yellow-primary text-[clamp(24px,2vw,28px)]">
                      Delicious
                    </h2>

                    <p className="font-kanit font-medium leading-snug text-[clamp(40px,2.5vw,50px)] uppercase">
                      New Oninon
                    </p>

                    <p className="font-kanit text-yellow-primary text-[clamp(40px,3vw,55px)] font-bold -mt-6">
                      Burgure!
                    </p>

                    <button className="group/icon-hover text-[clamp(10px,2vw,14px)] btn-yellow-to-black px-2 py-1">
                      Order now
                      <FaArrowRightLong className="size-3 mb-[1px] md:size-3 lg:size-4 lg:mb-[2px] group-hover/icon-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BannerUnderMarqueeHome;
