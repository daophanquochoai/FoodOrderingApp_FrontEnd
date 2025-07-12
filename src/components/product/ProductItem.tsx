import React from 'react';
import img_hamburger_1 from '../../assets/ham-1.webp';
import { Rate } from 'antd';
import { useModalContext } from '../../hooks/context/ModalContext';
import { Food } from '../../type';

const ProductItem: React.FC<Food> = (food) => {
    const { setModalState } = useModalContext();

    return (
        <div className="relative px-2 py-4 group flex flex-col h-[330px] w-auto justify-center items-center cursor-pointer bg-white rounded-lg">
            {1 > 0 && (
                <div className="absolute group-hover:opacity-0 transition-opacity duration-500 top-3 left-3 w-[40px] h-[40px] rounded-full bg-[#FC4D26] z-10 flex justify-center items-center text-white text-sm font-medium">
                    -{10}%
                </div>
            )}

            <div className="h-[70%] w-full max-w-[350px] p-3 overflow-hidden relative flex items-center justify-center">
                <img
                    src={img_hamburger_1}
                    alt="product_image"
                    className={`h-[100%] w-[90%] object-cover transition-all duration-500 ease-in-out group-hover:scale-110`}
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-xl font-kanit font-base line-clamp-1 text-[20px] text-center">
                    Cheeseburger
                </h3>

                <Rate disabled allowHalf defaultValue={2.5} style={{ fontSize: '14px' }} />

                <div className="flex items-center justify-center gap-2">
                    <p className="text-gray-600 font-normal line-through text-[14px]">$10</p>

                    <p className="text-red-500 font-semibold text-[15px]">$15</p>
                </div>

                {1 ? (
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
                ) : (
                    <button className="btn-yellow-to-black text-[12px] px-4 py-2">order now</button>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
