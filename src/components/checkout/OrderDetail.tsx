import React from 'react';

interface Voucher {
    id: string;
    code: string;
    description: string;
    type: string;
    value: number;
    maxDiscount: number;
    endDate: string;
    isActive: boolean;
}

interface OrderDetailProps {
    selectedVoucher?: string | null;
}
const OrderDetail: React.FC<OrderDetailProps> = ({selectedVoucher}) => {
    const vouchers: Voucher[] = [
        {
            id: "1",
            code: "BLACKFRIDAY",
            description: "Black Friday 10% off",
            type: "percentage",
            value: 10,
            maxDiscount: 4,
            endDate: "2025-12-31",
            isActive: true,
        },
        {
            id: "2",
            code: "WELCOME",
            description: "Welcome voucher for new users",
            type: "fixed",
            value: 2,
            maxDiscount: 2,
            endDate: "2024-12-31",
            isActive: true,
        },
        {
            id: "3",
            code: "ANNIVERSARY",
            description: "Anniversary 10% off",
            type: "percentage",
            value: 10,
            maxDiscount: 10,
            endDate: "2025-12-31",
            isActive: false,
        }
    ];
    
    const items = [
        {
            id: 1,
            name: "Cheese Italian Chicken Pizza",
            image: "https://grillfood-demo.myshopify.com/cdn/shop/files/8_7db4be71-b67b-427f-96b4-5cdf4ddc491b.jpg?v=1746868484&width=416",
            quantity: 2,
            price: "$24.00",
        },
        {
            id: 2,
            name: "Big Spicy Mexican Tacos",
            image: "https://grillfood-demo.myshopify.com/cdn/shop/files/21_689f8b55-c17e-4433-b851-23682f750073.jpg?v=1746868484&width=1206",
            quantity: 1,
            price: "$5.00",
        },
    ];

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => {
            // Remove $ and parse price
            const price = parseFloat(item.price.replace('$', ''));
            return sum + price * item.quantity;
        }, 0);
    };

    const calculateDiscount = (subtotal: number) => {
        if (!selectedVoucher) return 0;
        
        const voucher = vouchers.find(v => v.code === selectedVoucher);
        if (!voucher) return 0;
        
        let discount = 0;
        if (voucher.type === "percentage") {
            discount = (subtotal * voucher.value) / 100;
            if (discount > voucher.maxDiscount) {
                discount = voucher.maxDiscount;
            }
        } else if (voucher.type === "fixed") {
            discount = voucher.value;
            if (discount > subtotal) {
                discount = subtotal;
            }
        }
        
        return discount;
    };

    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const total = subtotal - discount;

    return (
        <div className="xl:w-2/3">
            <ul className="space-y-4">
            {items.map(item => (
                <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="relative mr-4">
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 60, height: 60, objectFit: 'cover' }}
                        className="border border-gray-400 rounded-md"
                    />
                    <span
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                        style={{ fontSize: 12 }}
                    >
                        {item.quantity}
                    </span>
                    </div>
                    <p>{item.name}</p>
                </div>
                <p>{item.price}</p>
                </li>
            ))}
            </ul>
            <div className="flex items-center justify-between mt-8">
                <p>
                    Subtotal · {items.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>
                <p>${subtotal.toFixed(2)}</p>
            </div>
            {discount > 0 && (
                <div className="flex items-center justify-between mt-2 text-green-600">
                    <div className="flex items-center">
                        <p>Voucher discount</p>
                        {selectedVoucher && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {selectedVoucher}
                            </span>
                        )}
                    </div>
                    <p>-${discount.toFixed(2)}</p>
                </div>
            )}
            <div className="flex items-center justify-between mt-2">
                <p>Shipping</p>
                <p>FREE</p>
            </div>
            <div className="flex items-center justify-between mt-8">
                <strong className="text-lg">Total</strong>
                <div className="flex gap-2 items-center">
                    <p className="text-sm pt-1">USD</p>
                    <strong className="text-lg">
                        ${total.toFixed(2)}
                    </strong>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;