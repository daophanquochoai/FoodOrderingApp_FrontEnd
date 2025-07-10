import React, { useState } from "react";

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

interface VoucherProps {
    selectedVoucher?: string;
    onVoucherSelect?: (voucher: string) => void;
}

const Voucher: React.FC<VoucherProps> = ({
    selectedVoucher,
    onVoucherSelect
}) => {
    const handleVoucherSelect = (voucher: string, voucherObj: Voucher) => {
        if (onVoucherSelect) {
            if (selectedVoucher === voucher) {
                onVoucherSelect("");
                setError("");
            } else {
                if (isVoucherEligible(voucherObj)) {
                    onVoucherSelect(voucher);
                    setError("");
                }
                else if (!voucherObj.isActive) setError("This voucher is not active.");
                else setError("This voucher has expired.");
            }
        }
    };

    const [error, setError] = useState('');

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

    const isVoucherEligible = (voucher: Voucher): boolean => {
        return voucher.isActive && new Date(voucher.endDate) > new Date();
    };

    return (
        <div className="flex flex-col gap-4">
            <strong className="text-lg">Voucher</strong>
            <div className="space-y-4">
                {vouchers.map((voucher) => (
                    <div
                        key={voucher.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedVoucher === voucher.code
                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleVoucherSelect(voucher.code, voucher)}
                    >
                        <div className="flex items-start space-x-3">
                            <input
                                type="radio"    
                                name="voucher"
                                value={voucher.code}
                                checked={selectedVoucher === voucher.code}
                                onChange={() => handleVoucherSelect(voucher.code, voucher)}
                                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                                <div className="flex gap-2 items-center mb-1">
                                    <span className="font-semibold text-blue-600">{voucher.code}</span>
                                    <span className="text-xs text-white bg-blue-400 rounded px-2 py-0.5">
                                        {voucher.type === "percentage"
                                            ? `-${voucher.value}%`
                                            : `-$${voucher.value.toFixed(2)}`}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {voucher.description}
                                </p>
                                <span className="text-xs text-gray-400">
                                    Expiration Date: {new Date(voucher.endDate).toLocaleDateString("vi-VN")}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {error && <p className="text-sm text-red-500 pl-1">{error}</p>}
        </div>
    );
};

export default Voucher;