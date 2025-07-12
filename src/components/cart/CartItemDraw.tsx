import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { CartItemProps } from '../../type';
import QuantitySelector from '../product/QuantitySelector';
import { IoTrashOutline } from 'react-icons/io5';

const CartItemDraw: React.FC<CartItemProps> = (cartItem) => {
    const { name, image, price, quantity } = cartItem;

    const [quantityState, setQuantity] = useState(quantity);

    return (
        <div>
            <Row className="pt-4 pb-3 border-b border-gray-200">
                <Col span={18}>
                    <div className="flex gap-2 items-center justify-start">
                        <div className="w-[80px] h-[80px]">
                            <img src={image} alt="" className="w-full h-auto object-contain" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-base font-medium">{name}</h2>
                            <p className="text-sm font-semibold text-gray-500">${price}</p>
                            <div className="flex gap-4 items-center justify-center">
                                <QuantitySelector
                                    quantity={quantityState}
                                    onQuantityChange={setQuantity}
                                    min={1}
                                    max={10}
                                    small={true}
                                />
                                <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white bg-orange-primary hover:bg-black cursor-pointer transition-all duration-200">
                                    <IoTrashOutline className="size-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col span={6} className="flex justify-end">
                    <p className="text-base font-semibold uppercase  text-orange-primary">$35</p>
                </Col>
            </Row>
        </div>
    );
};

export default CartItemDraw;
