import { Card } from "antd";
import { Voucher } from "../../../type";
import { RiCoupon3Line } from "react-icons/ri";
import { Empty }     from "antd";

const UserVoucher = () => {
    const voucherList: Voucher[] = [
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
        <div className="bg-white p-6 border border-gray-300 rounded-lg">
            <div className="p-8">
                <h1 className="text-2xl font-bold">My vouchers</h1>

                {voucherList.length === 0 ? (
                    <Empty
                        description="No vouchers found"
                        className="my-12"
                    />
                ) : (
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {voucherList.map((voucher) => (
                            <Card
                                key={voucher.id}
                                className="shadow-sm border-gray-400"
                                bodyStyle={{ padding: 0 }}
                            >
                                <div className="grid grid-cols-[1fr_4fr]">
                                    <div className={`${isVoucherEligible(voucher) ? 'bg-green-500' : 'bg-red-500'} h-full px-2 py-12 rounded-l-md flex items-center justify-center`}>
                                        <RiCoupon3Line className="text-5xl text-white" />
                                    </div>
                                    <div className="h-full rounded-r-md flex flex-col items-start justify-center p-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{voucher.code}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{voucher.description}</p>
                                            <div className="mt-2 bg-orange-100 inline-block px-3 py-1 rounded-full font-medium text-orange-700">
                                                {voucher.type === "percentage"
                                                    ? `${voucher.value}% OFF`
                                                    : `$${voucher.value.toFixed(2)} OFF`}
                                                {voucher.maxDiscount && voucher.type === "percentage" && 
                                                    <span className="text-xs ml-1">(Max: ${voucher.maxDiscount})</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full mr-2 
                                                    {isVoucherEligible(voucher) ? 'bg-green-500' : 'bg-red-500'}"></div>
                                                <p className="text-xs text-gray-500">
                                                    {isVoucherEligible(voucher) 
                                                        ? `Valid until ${new Date(voucher.endDate).toLocaleDateString("vi-VN")}` 
                                                        : `Expired on ${new Date(voucher.endDate).toLocaleDateString("vi-VN")}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserVoucher;