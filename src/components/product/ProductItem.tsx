import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { Food } from '@/type/store/client/collection/food.style';
import chicken from '../../assets/chicken.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { common, food } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { GoPlus } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuth } from '@/store/selector/auth/auth.selector';

const ProductItem: React.FC<Food> = (foodProps) => {
    //hook
    const dispatch = useDispatch();

    // selector
    const auth = useSelector(selectAuth);

    // router
    const location = useLocation();

    // state
    const [foodSize, setFoodSize] = useState([]);

    // event handling
    const handleOpenModal = () => {
        if (!auth?.user) {
            localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
            localStorage.setItem('modalAfterLogin', JSON.stringify(foodProps));
        }

        dispatch(food.actions.setFoodDetail(foodProps));
        dispatch(
            common.actions.showModal({
                data: foodProps,
                type: ModalType.DETAIL_PRODUCT,
            })
        );
    };

    //useEffect
    useEffect(() => {
        setFoodSize(foodProps.foodSizes?.filter((i) => i.isActive));
    }, [foodProps]);

    return (
        <div
            onClick={handleOpenModal}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-gray-100 hover:border-orange-200"
        >
            {/* Discount */}
            {foodSize != null && foodSize?.length > 0 && foodSize[0]?.discount > 0 && (
                <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform -rotate-2">
                        -{foodSize[0]?.discount}%
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gray-50">
                <img
                    src={foodProps.image || chicken}
                    alt={foodProps.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = chicken;
                    }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                    {foodProps.name}
                </h3>

                {/* Rating */}
                {/* <div className="flex items-center space-x-1">
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={2.5}
                        style={{ fontSize: '12px' }}
                        className="text-yellow-400"
                    />
                </div> */}

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {foodSize != null && foodSize?.length > 0 ? (
                            <>
                                <span className="text-gray-400 text-xs line-through">
                                    $
                                    {(
                                        (foodSize[0]?.price * (100 + foodSize[0]?.discount)) /
                                        100
                                    ).toFixed(2)}
                                </span>
                                <span className="text-orange-600 font-bold text-lg">
                                    ${foodSize[0]?.price.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-800 font-bold text-lg">
                                ${foodSize?.[0]?.price?.toFixed(2) || '0.00'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal();
                    }}
                >
                    View Options
                </button>
            </div>

            {/* Quick add to cart indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-orange-50 transition-colors duration-200">
                    <GoPlus />
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
