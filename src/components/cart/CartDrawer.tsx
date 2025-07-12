import React from 'react';
import { CartItemProps, OpenCartProps } from '../../type';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { CartItemDraw } from '../cart';

const cartItems: CartItemProps[] = [
    {
        image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
        name: 'Pizza Cheese',
        price: 20,
        quantity: 2,
    },
    {
        image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
        name: 'Pizza Cheese',
        price: 20,
        quantity: 2,
    },
    {
        image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
        name: 'Pizza Cheese',
        price: 20,
        quantity: 2,
    },
    {
        image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
        name: 'Pizza Cheese',
        price: 20,
        quantity: 2,
    },
    {
        image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
        name: 'Pizza Cheese',
        price: 20,
        quantity: 2,
    },
    {
        image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
        name: 'Pizza Cheese',
        price: 20,
        quantity: 2,
    },
];

// const cartItems: CartItemProps[] = [];

const CartDrawer: React.FC<OpenCartProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
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
                {cartItems?.length > 0 ? (
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                            <h2 className="text-lg font-normal uppercase font-kanit">Your cart</h2>
                            <IoCloseOutline className="size-6 cursor-pointer" onClick={onClose} />
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                            <h2 className="text-base font-normal uppercase font-kanit">Product</h2>
                            <h2 className="text-base font-normal uppercase font-kanit">Total</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            {cartItems.length > 0 &&
                                cartItems.map((item, index) => (
                                    <div key={index}>
                                        <CartItemDraw {...item} />
                                    </div>
                                ))}
                        </div>
                        <div className="py-4 border-t border-gray-400">
                            <p className="text-right text-orange-primary text-base font-semibold">
                                $200
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
                            <IoCloseOutline className="size-6 cursor-pointer" onClick={onClose} />
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
    );
};

export default CartDrawer;
