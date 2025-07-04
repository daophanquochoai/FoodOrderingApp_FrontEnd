import React from "react";
import img_hamburger_1 from "../../assets/ham-1.webp";
import img_hamburger_2 from "../../assets/ham-2.webp";
import { Rate } from "antd";

type ProductItemProps = {
  discount: number;
  size: boolean;
  image: number;
};

const ProductItem: React.FC<ProductItemProps> = ({ discount, size, image }) => {
  return (
    <div className="relative px-2 py-4 group flex flex-col h-[75vw] sm:h-[60vw] md:h-[40vw] lg:h-[32vw] justify-center items-center cursor-pointer bg-white rounded-lg">
      {discount > 0 && (
        <div className="absolute group-hover:opacity-0 transition-opacity duration-500 top-3 left-3 w-[45px] h-[45px] rounded-full bg-[#FC4D26] z-10 flex justify-center items-center text-white font-medium">
          -{discount}%
        </div>
      )}

      <div className="h-[70%] p-3 overflow-hidden relative">
        <img
          src={img_hamburger_1}
          alt="category_image"
          className={`h-full w-full object-cover transition-all duration-500 ease-in-out ${
            image > 1 ? "group-hover:opacity-0" : "group-hover:scale-110"
          }`}
        />
        {image > 1 && (
          <img
            src={img_hamburger_2}
            alt="category_image_hover"
            className="h-full w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-xl font-kanit font-medium text-[clamp(14px,1.5vw,30px)] ">
          McDonalds' Big Hug Burger
        </h3>

        <Rate disabled defaultValue={2} />

        <div className="flex items-center justify-center gap-2">
          {discount > 0 && (
            <p className="text-gray-600 font-base line-through text-[clamp(14px,2vw,16px)]">
              $400
            </p>
          )}
          <p className="text-red-500 font-semibold text-[clamp(16px,2vw,18px)]">
            $350
          </p>
        </div>

        {size ? (
          <button className="btn-yellow-to-black text-[clamp(10px,1.5vw,14px)] px-4 py-2">
            options
          </button>
        ) : (
          <button className="btn-yellow-to-black text-[clamp(10px,1.5vw,14px)] px-4 py-2">
            order now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
