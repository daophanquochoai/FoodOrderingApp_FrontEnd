import React from 'react';
import img_hamburger_1 from '../../assets/ham-1.webp';
import { Rate } from 'antd';
import { useModalContext } from '../../hooks/context/ModalContext';
import { Food } from '@/type/store/client/collection/food.style';
import chicken from '../../assets/chicken.jpg';

const ProductItem: React.FC<Food> = (food) => {
    const { setModalState } = useModalContext();

    return (
        <div className="relative px-2 py-4 group flex flex-col h-[330px] w-auto justify-center items-center cursor-pointer bg-white rounded-lg">
            {food.foodSizes != null && (
                <div className="absolute group-hover:opacity-0 transition-opacity duration-500 top-3 left-3 w-[40px] h-[40px] rounded-full bg-[#FC4D26] z-10 flex justify-center items-center text-white text-sm font-medium">
                    -{food.foodSizes[0].discount}%
                </div>
            )}

            <div className="h-[70%] w-full max-w-[350px] p-3 overflow-hidden relative flex items-center justify-center">
                <img
                    src={food.image || chicken}
                    alt="product_image"
                    className={`h-[100%] w-[90%] object-cover transition-all duration-500 ease-in-out group-hover:scale-110`}
                    onError={(e) => {
                        e.currentTarget.onerror = null; // tránh loop vô hạn
                        e.currentTarget.src = chicken;
                    }}
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-xl font-kanit font-base line-clamp-1 text-[20px] text-center">
                    {food.name}
                </h3>

                <Rate disabled allowHalf defaultValue={2.5} style={{ fontSize: '14px' }} />

                <div className="flex items-center justify-center gap-2">
                    {food.foodSizes != null && (
                        <>
                            <p className="text-gray-600 font-normal line-through text-[14px]">
                                $
                                {(food.foodSizes[0].price * (100 + food.foodSizes[0].discount)) /
                                    100}
                            </p>
                            <p className="text-red-500 font-semibold text-[15px]">
                                ${food.foodSizes[0].price}
                            </p>
                        </>
                    )}
                </div>
                <button
                    className="btn-yellow-to-black text-[12px] px-4 py-2"
                    onClick={() =>
                        setModalState({
                            type: 'product',
                            variant: 'options',
                            isOpen: true,
                            product: food,
                        })
                    }
                >
                    options
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
