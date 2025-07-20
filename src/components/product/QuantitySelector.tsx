import { cart } from '@/store/reducer';
import React from 'react';
import { GrSubtract, GrAdd } from 'react-icons/gr';
import { useDispatch } from 'react-redux';

export enum Type {
    CART,
    PRODUCT,
}

interface QuantitySelectorProps {
    quantity: number;
    id?: number;
    small?: boolean;
    type: Type;
    setQuantity?: (any) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    id,
    small = false,
    type = Type.CART,
    setQuantity,
}) => {
    // hook
    const dispatch = useDispatch();

    const handleDecrease = () => {
        if (type == Type.CART) {
            dispatch(cart.actions.setRiseCart({ id, type: 'DOWN' }));
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        }
    };

    const handleIncrease = () => {
        if (type == Type.CART) {
            dispatch(cart.actions.setRiseCart({ id, type: 'RISE' }));
        } else {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className={`quantity-selector w-fit ${small ? 'p-0' : 'p-2'}`}>
            <div
                className={`flex items-center space-x-3 border border-gray-300 rounded-full ${
                    small ? 'py-1 px-2' : 'py-2 px-4'
                }`}
            >
                <button onClick={handleDecrease} className={'hover:text-orange-500'}>
                    <GrSubtract className={`${small ? 'text-sm' : 'text-lg'}`} />
                </button>

                <span
                    className={`${
                        small ? 'w-6 text-base' : 'w-12 text-lg'
                    } text-center font-medium`}
                >
                    {quantity}
                </span>

                <button onClick={handleIncrease} className={'hover:text-orange-500'}>
                    <GrAdd className={`${small ? 'text-sm' : 'text-lg'}`} />
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
