import React from "react";
import category_1 from "../../assets/pizza1.webp";
import { Category } from "../category";
import { useNavigate } from "react-router-dom";

const CategoryItem: React.FC<Category> = (category) => {
  
  const {image, name, id} = category;
  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate(`/collections/${id}`);
  }

  return (
    // h-[280px] sm:h-[320px] md:h-[380px] lg:h-[390px]
    <div className="group flex flex-col justify-center items-center cursor-pointer" onClick={handleClickDetail}> 
      <div className="h-[55%] p-3 overflow-hidden">
        <img
          src={image}
          alt="category_image"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-[750ms]"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <h3 className="text-xl font-kanit font-medium text-[clamp(12px,1.8vw,20px)] line-clamp-1">
          {name}
        </h3>
        <p className="group-hover:visible underline-text-orange text-[clamp(10px,1.5vw,16px)] transition-all duration-200 ease-in">
          Order Now
        </p>
      </div>
    </div>
  );
};

export default CategoryItem;
