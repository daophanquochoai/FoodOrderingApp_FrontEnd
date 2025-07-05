import React from "react";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";

type serviceCartProps = {
  image: string;
  hearder: string;
  descript: string;
};

const ServiceCard: React.FC<serviceCartProps> = ({
  image,
  hearder,
  descript,
}) => {
  return (
    <div
      className="overflow-hidden w-[45vw] md:w-[40vw] lg:w-[30vw] cursor-pointer relative group border-r border-gray-300 flex flex-col items-center justify-center"
      style={{ minHeight: "320px", flexShrink: 0 }}
    >
      <div className="h-[85px] w-[85px]">
        <img
          src={image}
          alt=""
          className="h-full w-full object-contain group-hover:translate-y-2 transition-transform duration-500 ease-linear"
        />
      </div>
      <div className="w-[65%] text-center mt-4">
        <h3 className="font-kanit text-xl font-medium">{hearder}</h3>
        <p className="text-gray-500 text-sm font-medium mt-2">{descript}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
