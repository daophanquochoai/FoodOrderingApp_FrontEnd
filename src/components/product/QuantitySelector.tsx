import React from 'react';
import { GrSubtract, GrAdd } from 'react-icons/gr';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    min?: number;
    max?: number;
    small?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onQuantityChange,
    min = 1,
    max = 99,
    small = false,
}) => {
    const handleDecrease = () => {
        if (quantity > min) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < max) {
            onQuantityChange(quantity + 1);
        }
    };

    return (
        <div className={`w-fit ${small ? 'p-0' : 'p-2'}`}>
            <div
                className={`flex items-center space-x-3 border border-gray-300 rounded-full ${
                    small ? 'py-1 px-2' : 'py-2 px-4'
                }`}
            >
                <button
                    onClick={handleDecrease}
                    disabled={quantity <= min}
                    className={`${quantity <= min ? 'cursor-not-allowed' : 'hover:text-orange-500'}
                `}
                >
                    <GrSubtract className={`${small ? 'text-sm' : 'text-lg'}`} />
                </button>

                <span
                    className={`${
                        small ? 'w-6 text-base' : 'w-12 text-lg'
                    } text-center font-medium`}
                >
                    {quantity}
                </span>

                <button
                    onClick={handleIncrease}
                    disabled={quantity >= max}
                    className={`${quantity >= max ? 'cursor-not-allowed' : 'hover:text-orange-500'}
                `}
                >
                    <GrAdd className={`${small ? 'text-sm' : 'text-lg'}`} />
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
