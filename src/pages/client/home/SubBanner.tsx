import React, { useEffect, useRef } from "react";
import sub_banner_1 from "../../../assets/sub-banner-1.webp";
import sub_banner_2 from "../../../assets/sub-banner-2.webp";
import sub_banner_3 from "../../../assets/sub-banner-3.webp";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";

const SubBanner = () => {
  const scrollSubBanner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollSubBanner.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={scrollSubBanner}
      className="mt-2 w-screen flex flex-row gap-2 overflow-auto custom-scrollbar"
    >
      <div
        className="bg-gray-200 overflow-hidden cursor-pointer relative group"
        style={{ width: "40vw", maxHeight: "400px", flexShrink: 0 }}
      >
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-in-out transform group-hover:scale-105 group-hover:-translate-y-1 "
          style={{
            backgroundImage: `url(${sub_banner_1})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "21vw",
          }}
        ></div>

        <div className="p-2 pl-0 h-full">
          <Row className="h-full">
            <Col span={24} className="flex justify-start">
              <div className="w-full max-w-[65%] px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 text-white flex flex-col items-start justify-center h-full xl:gap-2 lg:gap-1 gap-1">
                <h2 className="font-playball text-yellow-primary text-[clamp(10px,2vw,26px)]">
                  Delicious Pizza
                </h2>

                <p className="font-kanit font-medium leading-snug text-[clamp(12px,2.5vw,40px)] uppercase">
                  Cheese Slice
                </p>

                <p className="font-montserrat font-semibold text-yellow-primary text-[clamp(10px,2vw,40px)]">
                  Italian Pizza
                </p>

                <p className="font-playball font-medium text-[clamp(10px,1.5vw,26px)] hidden md:block">
                  Today Best Deals!
                </p>

                <button className="group/icon-hover text-[clamp(6px,1vw,12px)] btn-yellow-to-black px-2 py-1">
                  Order now
                  <FaArrowRightLong className="size-2 mb-[1px] md:size-3 lg:size-4 lg:mb-[2px] group-hover/icon-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div
        className="bg-gray-200 overflow-hidden cursor-pointer relative group"
        style={{
          width: "40vw",
          maxHeight: "400px",
          flexShrink: 0,
          height: "21vw",
        }}
      >
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-in-out transform group-hover:scale-105 group-hover:-translate-y-1 "
          style={{
            backgroundImage: `url(${sub_banner_2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="p-2 pl-0 h-full">
          <Row className="h-full">
            <Col span={24} className="flex justify-start">
              <div className="w-full max-w-[65%] px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 text-white flex flex-col items-start justify-center h-full xl:gap-2 lg:gap-1 gap-1">
                <h2 className="font-playball text-yellow-primary text-[clamp(10px,2vw,26px)]">
                  Classic Chicken
                </h2>

                <p className="font-kanit font-medium leading-snug text-[clamp(12px,2.5vw,40px)] uppercase">
                  cheese fried
                </p>

                <p className="font-montserrat font-semibold text-yellow-primary text-[clamp(10px,2vw,40px)]">
                  Chicken!
                </p>

                <p className="font-playball font-medium text-[clamp(10px,1.5vw,26px)] hidden md:block">
                  Special Just ForYou
                </p>

                <button className="group/icon-hover text-[clamp(6px,1vw,12px)] btn-yellow-to-black px-2 py-1">
                  Order now
                  <FaArrowRightLong className="size-2 mb-[1px] md:size-3 lg:size-4 lg:mb-[2px] group-hover/icon-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div
        className="bg-gray-200 overflow-hidden cursor-pointer relative group"
        style={{ width: "40vw", maxHeight: "400px", flexShrink: 0 }}
      >
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-in-out transform group-hover:scale-105 group-hover:-translate-y-1 "
          style={{
            backgroundImage: `url(${sub_banner_3})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "21vw",
          }}
        ></div>

        <div className="p-2 pl-0 h-full">
          <Row className="h-full">
            <Col span={24} className="flex justify-start">
              <div className="w-full max-w-[65%] px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 text-white flex flex-col items-start justify-center h-full xl:gap-2 lg:gap-1 gap-1">
                <h2 className="font-playball text-orange-primary text-[clamp(10px,2vw,26px)]">
                  Corniche Taco
                </h2>

                <p className="font-kanit font-medium leading-snug text-[clamp(12px,2.5vw,40px)] uppercase text-black">
                  beef tomato
                </p>

                <p className="font-montserrat font-semibold text-orange-primary text-[clamp(10px,2vw,40px)]">
                  With Taco!
                </p>

                <p className="font-playball font-medium text-[clamp(10px,1.5vw,26px)] hidden md:block text-black">
                  Special Just ForYou
                </p>

                <button className="group/icon-hover text-[clamp(6px,1vw,12px)] btn-orange-to-black px-2 py-1">
                  Order now
                  <FaArrowRightLong className="size-2 mb-[1px] md:size-3 lg:size-4 lg:mb-[2px] group-hover/icon-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
