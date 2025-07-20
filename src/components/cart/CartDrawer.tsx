import React from 'react';
import { CartItemProps, OpenCartProps } from '../../type';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { CartItemDraw } from '../cart';
import { useSelector } from 'react-redux';
import { selectCart, selectLoadingPage } from '@/store/selector/client/cart/cart.selector';
import { formatMoney } from '@/utils/formatRender';
import { Spin } from 'antd';

const CartDrawer: React.FC<OpenCartProps> = ({ isOpen, onClose }) => {
    // hook
    const navigate = useNavigate();

    // selector
    const cart = useSelector(selectCart);
    const loading = useSelector(selectLoadingPage);

    return (
        <Spin spinning={loading}>
            <div className="">
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
                )}
                <div
                    className={`
                    fixed top-0 right-0 h-full px-5 md:w-[400px] w-[350px] bg-white z-[100]
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
                >
                    {cart?.cartItems && cart?.cartItems?.length > 0 ? (
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                <h2 className="text-lg font-normal uppercase font-kanit">
                                    Your cart
                                </h2>
                                <IoCloseOutline
                                    className="size-6 cursor-pointer"
                                    onClick={onClose}
                                />
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                <h2 className="text-base font-normal uppercase font-kanit">
                                    Product
                                </h2>
                                <h2 className="text-base font-normal uppercase font-kanit">
                                    Total
                                </h2>
                            </div>
                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                {cart?.cartItems.map((item, index) => (
                                    <div key={index}>
                                        <CartItemDraw {...item} />
                                    </div>
                                ))}
                            </div>
                            <div className="py-4 border-t border-gray-400">
                                <p className="text-right text-orange-primary text-base font-semibold">
                                    $
                                    {formatMoney(
                                        cart?.cartItems?.reduce((sum, c) => {
                                            return (sum += c.priceAtTime * c.quantity);
                                        }, 0)
                                    )}
                                </p>
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        className="btn-primary"
                                        onClick={() => {
                                            navigate('/cart');
                                            onClose();
                                        }}
                                    >
                                        View Cart
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate('/checkouts');
                                            onClose();
                                        }}
                                        className="w-full px-4 py-2 cursor-pointer hover:bg-orange-primary bg-black uppercase rounded-[24px] flex items-center justify-center text-white font-medium text-base tracking-wider my-3 font-kanit transition-all duration-500"
                                    >
                                        Check out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full">
                            <div className="flex justify-end items-center py-4 border-b border-gray-200">
                                <IoCloseOutline
                                    className="size-6 cursor-pointer"
                                    onClick={onClose}
                                />
                            </div>
                            <div className="h-full flex flex-col gap-2 text-center mt-28">
                                <h3 className="text-xl font-medium">Your cart is empty</h3>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        navigate('/collections');
                                        onClose();
                                    }}
                                >
                                    continue shopping
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Spin>
    );
};

export default CartDrawer;
