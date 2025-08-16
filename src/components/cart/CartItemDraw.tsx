import { Col, Row } from 'antd';
import React from 'react';
import QuantitySelector, { Type } from '../product/QuantitySelector';
import { IoTrashOutline } from 'react-icons/io5';
import { CartItem } from '@/type/store/client/cart/cart.style';
import { formatMoney } from '@/utils/formatRender';
import burger from '../../assets/burger.jpg';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '@/store/action/client/cart/cart.action';

const CartItemDraw: React.FC<CartItem> = (cartItem) => {
    // hook
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteCartItem(cartItem?.id));
    };

    return (
        <div>
            <Row className="pt-2 pb-3 border-b border-gray-200">
                <Col span={18}>
                    <div className="flex gap-2 items-center justify-start">
                        <div className="w-[80px] h-[80px]">
                            <img
                                src={cartItem?.foodId?.foodId?.image || burger}
                                alt=""
                                className="w-full h-full object-center"
                                onError={(e) => {
                                    e.currentTarget.onerror = null; // tránh loop vô hạn
                                    e.currentTarget.src = burger;
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-base font-medium">
                                {cartItem?.foodId?.foodId?.name +
                                    ' - ' +
                                    cartItem?.foodId?.sizeId?.name || ''}
                            </h2>
                            <p className="text-sm font-semibold text-gray-500">
                                ${formatMoney(cartItem?.priceAtTime) || 0}
                            </p>
                            <div className="flex gap-4 items-center justify-center">
                                <QuantitySelector
                                    id={cartItem.id}
                                    quantity={cartItem?.quantity}
                                    type={Type.CART}
                                    small={true}
                                />
                                <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white bg-orange-primary hover:bg-black cursor-pointer transition-all duration-200">
                                    <IoTrashOutline className="size-4" onClick={handleDelete} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col span={6} className="flex justify-end">
                    <p className="text-base font-semibold uppercase  text-orange-primary">
                        ${formatMoney(cartItem?.quantity * cartItem?.priceAtTime)}
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default CartItemDraw;
