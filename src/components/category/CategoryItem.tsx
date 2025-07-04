import React from "react";
import category_1 from "../../assets/pizza1.webp";

const CategoryItem = () => {
  return (
    <div className="group flex flex-col h-[30vw] lg:h-[28vw] justify-center items-center cursor-pointer">
      <div className="h-[70%] p-3 overflow-hidden">
        <img
          src={category_1}
          alt="category_image"
          className="h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <h3 className="text-xl font-kanit font-medium text-[clamp(14px,1.8vw,30px)] ">
          Chicken Pizza
        </h3>
        <p className="group-hover:visible underline-text-orange text-[clamp(10px,1.5vw,16px)] transition-all duration-100">
          Order Now
        </p>
      </div>
    </div>
  );
};

export default CategoryItem;
