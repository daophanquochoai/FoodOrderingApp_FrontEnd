import { useState } from "react";
import { Link } from "react-router-dom";
import QuantitySelector from "../../components/product/QuantitySelector";

const ProductInfo = () => {
    const [selectedSize, setSelectedSize] = useState<string>("medium");
    const [quantity, setQuantity] = useState<number>(1);

    const sizeOptions = [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" }
    ];

    return (
        <>
            <div className="flex flex-col gap-4 border-b border-gray-400 pb-4 mb-4">
                <strong className="text-2xl">Cheese Italian Chicken Pizza</strong>
                <div className="flex gap-4">
                    <span className="text-xl text-gray-600 line-through">$15.00</span>
                    <span className="text-xl font-bold text-orange-600 scale-105">$12.00</span>
                    <div className="flex items-center gap-2 bg-orange-600 px-2 py-1">
                        <span className="font-bold text-sm text-white">-20%</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <strong className="mb-2">Size</strong>
                <div className="space-y-3">
                    <div className="flex space-x-3">
                        {sizeOptions.map((option) => (
                        <div
                            key={option.value}
                            className={`block px-4 py-2 border-2 rounded-full w-auto cursor-pointer transition-all
                            ${selectedSize === option.value 
                                ? 'border-orange-500' 
                                : 'border-gray-200 hover:border-orange-500'
                            }
                            `}
                            onClick={() => setSelectedSize(option.value)}
                        >
                            <span className="font-medium">{option.label}</span>
                        </div>
                        ))}
                    </div>
                </div>
                <strong className="my-2">Quantity</strong>
                <div className="-ml-2 flex items-center space-x-3">
                    <QuantitySelector 
                        quantity={quantity} 
                        onQuantityChange={setQuantity} 
                        min={1} 
                        max={10}
                    />
                    <button className="text-white font-bold bg-orange-600 py-3 px-16 rounded-full hover:bg-black duration-300">
                        ORDER NOW
                    </button>
                </div>
                <Link to={"/checkouts"} className="w-fit">
                    <button className="text-white w-[385px] text-center font-bold bg-black my-2 py-3 px-16 rounded-full">
                        BUY IT NOW
                    </button>
                </Link>
                <div className="flex mt-2">
                    <strong>Category:</strong>
                    <Link to={"/"} className="hover:text-orange-500 ml-1">Pizza</Link>
                </div>
                <div className="flex mt-2">
                    <strong>Tag:</strong>
                    <Link to={"/"} className="hover:text-orange-500 ml-1">Cheese Pizza,</Link>
                    <Link to={"/"} className="hover:text-orange-500 ml-1">Chicken Pizza</Link>
                </div>
            </div>
        </>
    );
};

export default ProductInfo;