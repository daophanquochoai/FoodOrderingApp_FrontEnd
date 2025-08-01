import { useEffect, useState } from 'react';
import QuantitySelector, { Type } from '../../components/product/QuantitySelector';
import { FoodSize } from '@/type/store/client/collection/food.style';
import { formatMoney } from '@/utils/formatRender';
import { useDispatch, useSelector } from 'react-redux';
import { selectFoodDetail } from '@/store/selector/client/collection/food.selector';
import { common } from '@/store/reducer';
import { addToCart } from '@/store/action/client/cart/cart.action';
import { Spin } from 'antd';

const ProductInfo = () => {
    //selector
    const foodDetail = useSelector(selectFoodDetail);
    //state
    const [selectedSize, setSelectedSize] = useState<FoodSize>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [foodSize, setFoodSize] = useState([]);

    //hook
    const dispatch = useDispatch();

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
        setLoading(true);
        if (selectedSize == null || selectedSize?.id == null) {
            dispatch(common.actions.setErrorMessage('Please choose item'));
            return;
        }
        const cartItem = {
            foodId: {
                id: selectedSize?.id,
            },
            quantity: quantity,
            priceAtTime: selectedSize?.discount * selectedSize?.price,
            isActive: true,
        };

        dispatch(addToCart(cartItem));
        setLoading(false);
    };

    return (
        <Spin spinning={loading}>
            <div className="flex flex-col gap-4 border-b border-gray-400 pb-4 mb-4">
                <strong className="text-2xl">{foodDetail?.name}</strong>
                <div className="flex gap-4">
                    <span className="text-xl text-gray-600 line-through">
                        $
                        {selectedSize != null
                            ? formatMoney(
                                  ((selectedSize?.discount + 100) * selectedSize.price) / 100
                              )
                            : '__'}
                    </span>
                    <span className="text-xl font-bold text-orange-600 scale-105">
                        ${selectedSize != null ? formatMoney(selectedSize.price) : '__'}
                    </span>
                    <div className="flex items-center gap-2 bg-orange-600 px-2 py-1">
                        <span className="font-bold text-sm text-white">
                            -{selectedSize?.discount || '__'}%
                        </span>
                    </div>
                </div>
                {foodDetail?.desc && (
                    <p className="text-gray-600 break-words whitespace-pre-line">
                        {foodDetail?.desc}
                    </p>
                )}
            </div>
            <div className="flex flex-col">
                {foodSize && foodSize.length > 0 && (
                    <>
                        <strong className="mb-2">Size</strong>
                        <div className="space-y-3">
                            <div className="flex space-x-3">
                                {foodSize &&
                                    foodSize.map((option) => (
                                        <div
                                            key={option.id}
                                            className={`block px-4 py-2 border-2 rounded-full w-auto cursor-pointer transition-all
                            ${
                                selectedSize?.id === option?.id
                                    ? 'border-orange-500'
                                    : 'border-gray-200 hover:border-orange-500'
                            }
                            `}
                                            onClick={() => setSelectedSize(option)}
                                        >
                                            <span className="font-medium">
                                                {option?.sizeId?.name}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <strong className="my-2">Quantity</strong>
                        <div className="-ml-2 flex items-center space-x-3">
                            <QuantitySelector
                                quantity={quantity}
                                type={Type.PRODUCT}
                                setQuantity={setQuantity}
                            />
                            <button
                                onClick={handleAddToCart}
                                className="text-white font-bold bg-orange-600 py-3 px-16 rounded-full hover:bg-black duration-300"
                            >
                                CART NOW
                            </button>
                        </div>
                    </>
                )}
                {foodDetail?.category && (
                    <>
                        <div className="flex mt-2">
                            <strong>Category:</strong>
                            <p className="hover:text-orange-500 ml-1">
                                {foodDetail?.category?.name || ''}
                            </p>
                        </div>
                        <div className="flex mt-2">
                            <strong>Description:</strong>
                            <p className="hover:text-orange-500 ml-1">{foodDetail?.desc}</p>
                        </div>
                    </>
                )}
            </div>
        </Spin>
    );
};

export default ProductInfo;
