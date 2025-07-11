import React from 'react';
import { GrSubtract, GrAdd } from "react-icons/gr";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99
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
    <div className='w-36 p-2'>
        <div className="flex items-center space-x-3 border border-gray-300 rounded-full py-2 px-4">
            <button
                onClick={handleDecrease}
                disabled={quantity <= min}
                className={`${quantity <= min 
                    ? 'cursor-not-allowed' 
                    : 'hover:text-orange-500'
                }
                `}
            >
                <GrSubtract className="text-lg" />
            </button>
            
            <span className="w-12 text-center text-lg font-medium">
                {quantity}
            </span>
            
            <button
                onClick={handleIncrease}
                disabled={quantity >= max}
                className={`${quantity >= max
                    ? 'cursor-not-allowed' 
                    : 'hover:text-orange-500'
                }
                `}
            >
                <GrAdd className="text-lg" />
            </button>
        </div>
    </div>
  );
};

export default QuantitySelector;