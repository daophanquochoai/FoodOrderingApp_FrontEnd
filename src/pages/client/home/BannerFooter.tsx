import React from "react";
import image_1 from "../../../assets/img-1.webp";
import image_2 from "../../../assets/img-2.webp";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";

const BannerFooter = () => {
  return (
    <div>
      <Row>
        <Col md={12} min-2000={4}>
          <div className="h-auto md:w-full md:h-full w-screen overflow-hidden group">
            <img
              src={image_1}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s] ease-linear"
            />
          </div>
        </Col>
        <Col md={12} min-2000={20}>
          <div className="relative h-[250px] md:w-full md:h-full w-screen overflow-hidden">
            <div className="w-full h-full">
              <img
                src={image_2}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 text-white flex flex-col items-start justify-center h-full xl:gap-3 lg:gap-2 gap-3">
              <h2 className="font-playball text-yellow-primary text-[clamp(14px,2.5vw,40px)]">
                Delicious food
              </h2>

              <p className="font-kanit font-medium leading-tight text-[clamp(14px,3vw,50px)]">
                Special Deal Offer For This Week!
              </p>

              <p className="font-montserrat font-semibold text-yellow-primary text-[clamp(12px,2vw,46px)]">
                Two varieties of taco only{" "}
                <span className="text-[clamp(14px,2.3vw,40px)]">$59</span>
              </p>

              <p className="font-montserrat font-medium text-[clamp(12px,1.2vw,16px)] leading-[1.7]">
                The origins of the taco are not precisely known, and etymologies
                for the culinary usage of the word are generally theoretical.
              </p>

              <button className="group text-[clamp(10px,1vw,18px)] btn-yellow-to-white px-3 py-2 xl:mt-8 lg:mt-6 mt-0">
                Order now
                <FaArrowRightLong className="size-4 mb-[2px] group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BannerFooter;
