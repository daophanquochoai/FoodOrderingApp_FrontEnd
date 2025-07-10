import React from "react";
import img_hamburger_1 from "../../assets/ham-1.webp";
import img_hamburger_2 from "../../assets/ham-2.webp";
import { Rate } from "antd";
import { useModalContext } from "../../hooks/context/ModalContext";
import { ModalRenderer } from "../modal";
import { Food } from "./type";


const ProductItem: React.FC<Food> = (food) => {
  const { setModalState } = useModalContext();

  const { sizes, image, name, rate } = food

  // neu co discount
  const sizesDiscount = sizes.length > 0 ? sizes.filter(size => size.discount > 0).map(size => ({discount: size.discount, price: size.price})) : [];
  const maxDiscount = sizesDiscount.length > 0 ? Math.max(...(sizesDiscount.map(size => size.discount))) : 0;

  const bestOffer = sizesDiscount.find(s => s.discount === maxDiscount);
  const discountedPrice = bestOffer ? (bestOffer.price * (1 - bestOffer.discount / 100)).toFixed(2) : null;

  // neu khong co discount
  const minPrice = sizes.length > 0 && Math.min(...sizes.map(s => s.price));

  // co options khong 
  const isOptions = sizes.length > 1 || !sizes.find((size) => size.name == "Standard");  // 

  return (
    <div className="relative px-2 py-4 group flex flex-col h-[350px] sm:h-[300px] md:h-[350px] lg:h-[450px] w-auto justify-center items-center cursor-pointer bg-white rounded-lg">
      {maxDiscount > 0 && (
        <div className="absolute group-hover:opacity-0 transition-opacity duration-500 top-3 left-3 w-[45px] h-[45px] rounded-full bg-[#FC4D26] z-10 flex justify-center items-center text-white font-medium">
          -{maxDiscount}%
        </div>
      )}

      <div className="h-[70%] w-full max-w-[350px] p-3 overflow-hidden relative">
        {/* <img
          src={img_hamburger_1}
          alt="product_image"
          className={`h-full w-full object-cover transition-all duration-500 ease-in-out ${
            image > 1 ? "group-hover:opacity-0" : "group-hover:scale-110"
          }`}
        />
        {image > 1 && (
          <img
            src={img_hamburger_2}
            alt="product_image_hover"
            className="h-full w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          />
        )} */}
        <img
          src={image}
          alt="product_image"
          className={`h-full w-full object-contain transition-all duration-500 ease-in-out group-hover:scale-110`}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-xl font-kanit font-base line-clamp-1 text-[clamp(14px,1.5vw,30px)] text-center">
          {name}
        </h3>

        <Rate disabled allowHalf defaultValue={rate || 0} />

        {maxDiscount > 0 ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-600 font-base line-through text-[clamp(14px,2vw,16px)]">
              ${bestOffer?.discount}
            </p>

            <p className="text-red-500 font-semibold text-[clamp(16px,2vw,18px)]">
              ${discountedPrice}     
            </p>
          </div>
        ) : (
          <p className="text-red-500 font-semibold text-[clamp(16px,2vw,18px)]">
            ${minPrice}     
          </p>
        )}

        

        {isOptions ? (
          <button
            className="btn-yellow-to-black text-[clamp(10px,1.5vw,14px)] px-4 py-2"
            onClick={() =>
              setModalState({
                type: "product",
                variant: "options",
                isOpen: true,
                product: food,
              })
            }
          >
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
