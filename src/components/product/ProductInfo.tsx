import { useEffect, useState } from 'react';
import QuantitySelector, { Type } from '../../components/product/QuantitySelector';
import { FoodSize } from '@/type/store/client/collection/food.style';
import { formatMoney } from '@/utils/formatRender';
import { useDispatch, useSelector } from 'react-redux';
import { selectFoodDetail } from '@/store/selector/client/collection/food.selector';
import { common } from '@/store/reducer';
import { addToCart } from '@/store/action/client/cart/cart.action';
import { Spin } from 'antd';
import { IoCartOutline } from 'react-icons/io5';
import { selectAuth } from '@/store/selector/auth/auth.selector';
import { useNavigate } from 'react-router-dom';
import { ModalType } from '@/type/store/common';
import { selectLoadingPage } from '@/store/selector/client/cart/cart.selector';

const ProductInfo = () => {
    //selector
    const foodDetail = useSelector(selectFoodDetail);
    const auth = useSelector(selectAuth);
    const loading = useSelector(selectLoadingPage);

    // dispatch
    const dispatch = useDispatch();

    //state
    const [selectedSize, setSelectedSize] = useState<FoodSize>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [foodSize, setFoodSize] = useState([]);

    // router
    const navigate = useNavigate();

    //useEffect
    useEffect(() => {
        if (foodSize != null && foodSize.length > 0) {
            setSelectedSize(foodSize[0]);
        }
    }, [foodSize]);

    useEffect(() => {
        setFoodSize(foodDetail.foodSizes?.filter((i) => i.isActive));
    }, [foodDetail]);

    //event handling
    const handleAddToCart = () => {
        if (!auth?.user) {
            dispatch(common.actions.setHiddenModal(ModalType.DETAIL_PRODUCT));
            navigate('/login');
            return;
        }

        if (selectedSize == null || selectedSize?.id == null) {
            dispatch(common.actions.setErrorMessage('Please choose item'));
            return;
        }
        const cartItem = {
            foodId: {
                id: selectedSize?.id,
            },
            quantity: quantity,
            priceAtTime: ((100 - selectedSize?.discount) / 100 || 1) * selectedSize?.price,
            isActive: true,
        };

        dispatch(addToCart(cartItem));
    };

    return (
        <Spin spinning={loading}>
            <div className="flex flex-col gap-3 pb-3">
                {/* title */}
                <div className="text-center md:text-left">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 leading-tight">
                        {foodDetail?.name}
                    </h1>
                    {foodDetail?.desc && (
                        <p className="text-gray-600 text-sm leading-relaxed">{foodDetail?.desc}</p>
                    )}
                </div>

                {/* price */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded-lg border border-orange-100">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg text-gray-500 line-through -mb-[3px]">
                                ${selectedSize != null ? formatMoney(selectedSize.price) : '__'}
                            </span>
                            <span className="text-xl font-bold text-orange-600">
                                $
                                {selectedSize != null
                                    ? formatMoney(
                                          selectedSize.price -
                                              ((selectedSize?.price || 0) *
                                                  (selectedSize?.discount || 0)) /
                                                  100
                                      )
                                    : '__'}
                            </span>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-2 py-1 rounded-full shadow-sm">
                            <span className="font-bold text-white text-xs">
                                -{selectedSize?.discount || '__'}% OFF
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {foodSize && foodSize.length > 0 && (
                    <>
                        {/* sizes */}
                        <div className="space-y-2">
                            <h3 className="text-base font-bold text-gray-800">Choose Size</h3>
                            <div className="flex flex-wrap gap-2 mb-1">
                                {foodSize &&
                                    foodSize.map((option) => (
                                        <div
                                            key={option.id}
                                            className={`px-3 py-1.5 border-2 rounded-md cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                                selectedSize?.id === option?.id
                                                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                                                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                                            }`}
                                            onClick={() => setSelectedSize(option)}
                                        >
                                            <span className="font-semibold text-gray-800 text-xs">
                                                {option?.sizeId?.name}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* quantity*/}
                        <div className="space-y-2 mb-2">
                            <h3 className="text-base font-bold text-gray-800">Quantity</h3>
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <div className="flex items-center">
                                    <QuantitySelector
                                        quantity={quantity}
                                        type={Type.PRODUCT}
                                        setQuantity={setQuantity}
                                        small={true}
                                    />
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center justify-center gap-2"
                                >
                                    <span className="text-xs">ADD TO CART</span>
                                    <IoCartOutline className="size-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {foodDetail?.category && (
                    <div className="bg-gray-50 p-2 px-3 rounded-lg border border-gray-200">
                        <h3 className="text-base font-bold text-gray-800 mb-2">
                            Product Information
                        </h3>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700 min-w-[70px] text-xs">
                                    Category:
                                </span>
                                <span className="text-gray-600 bg-white px-2 py-1 rounded-md border text-xs">
                                    {foodDetail?.category?.name || ''}
                                </span>
                            </div>
                            {foodDetail?.desc && (
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold text-gray-700 min-w-[70px] mt-0.5 text-xs">
                                        Description:
                                    </span>
                                    <p className="text-gray-600 leading-relaxed text-xs">
                                        {foodDetail?.desc}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Spin>
    );
};

export default ProductInfo;
