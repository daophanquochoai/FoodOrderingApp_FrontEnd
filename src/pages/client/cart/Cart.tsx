import React from 'react';
import { ClientBreadcrumb } from '../../../components/breadcrumb';
import { CartItemProps } from '../../../type';
import { Col, Row } from 'antd';
import CartItemPage from '../../../components/cart/CartItemPage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '@/store/selector/client/cart/cart.selector';
import { formatMoney } from '@/utils/formatRender';

const Cart = () => {
    // hook
    const navigate = useNavigate();

    // selector
    const cart = useSelector(selectCart);

    return (
        <div>
            <ClientBreadcrumb title="Your Shopping Cart" items={[{ label: 'Home', to: '/' }]} />
            <div className="container">
                <Row className="py-4 border-b border-gray-200">
                    <Col span={16}>
                        <h2 className="text-base font-normal uppercase font-kanit">Product</h2>
                    </Col>
                    <Col span={4}>
                        <h2 className="text-base font-normal uppercase font-kanit"> Quantity</h2>
                    </Col>
                    <Col span={4}>
                        <h2 className="text-base font-normal uppercase font-kanit text-end">
                            Total
                        </h2>
                    </Col>
                </Row>

                {cart &&
                    cart?.cartItems &&
                    cart?.cartItems.length > 0 &&
                    cart?.cartItems.map((item, index) => (
                        <div key={index} className="py-2">
                            <CartItemPage {...item} />
                        </div>
                    ))}

                <Row>
                    <Col span={24} className="flex justify-end items-center mt-3">
                        <div className="">
                            <div className="flex items-center justify-end gap-3 mr-1">
                                <p className="text-base font-medium">Subtotal</p>
                                <p className="text-lg font-medium text-orange-primary">
                                    $
                                    {formatMoney(
                                        cart?.cartItems?.reduce((sum, c) => {
                                            return (sum += c.priceAtTime * c.quantity);
                                        }, 0) || 0
                                    )}
                                </p>
                            </div>
                            <div className="w-[200px]">
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        navigate('/checkouts');
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Cart;
