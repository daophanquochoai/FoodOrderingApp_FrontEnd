import React from "react";
import img_banner_center from "../../../assets/parallax-banner-1.webp";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";

const BannerCenterHome = () => {
  return (
    <div className="w-screen relative overflow-hidden">
      <div
        className="w-full"
        style={{
          backgroundImage: `url(${img_banner_center})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "50.25vw",
        }}
      ></div>

      <div className="absolute inset-0 p-2 pl-10 h-full z-10">
        <Row className="h-full">
          <Col span={24} className="flex justify-start">
            <div className="w-full max-w-[55%] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 text-white flex flex-col items-start justify-center h-full xl:gap-5 lg:gap-4 gap-3">
              <h2 className="font-playball text-yellow-primary text-[clamp(14px,4vw,50px)]">
                Delicious Pizza
              </h2>

              <p className="font-kanit font-medium leading-none text-[clamp(14px,4.5vw,60px)]">
                Schezwan Corn And Capsicum Pizza
              </p>

              <p className="font-montserrat font-semibold text-yellow-primary text-[clamp(12px,2.3vw,30px)]">
                Double Cheese Pizza only{" "}
                <span className="text-[clamp(14px,3vw,40px)]">$99</span>
              </p>

              <p className="font-montserrat font-medium text-[clamp(12px,1.4vw,18px)] hidden md:block leading-[1.7]">
                Enjoy double portions of delicious mozzarella cheese Crispy
                paneer,onion,green capsicum.
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
  );
};

export default BannerCenterHome;
