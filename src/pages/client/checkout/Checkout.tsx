import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingBag4Line } from "react-icons/ri";
import AddressSelector from "../../../components/checkout/AddressSelector";
import OrderDetail from "../../../components/checkout/OrderDetail";
import PaymentMethod from "../../../components/checkout/PaymentMethod";
import Voucher from "../../../components/checkout/Voucher";
import Point from "../../../components/checkout/Point";

interface CreditCardInfo {
  cardholder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const Checkout = () => {

    const [error, setError] = useState("");

    const [selectedAddressId, setSelectedAddressId] = useState<string>("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
    const [creditCard, setCreditCard] = useState<CreditCardInfo>({
        cardholder: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });
    const [selectedVoucher, setSelectedVoucher] = useState<string>("");
    const [pointsUsed, setPointsUsed] = useState<number>(0);

    // Giả lập điểm của người dùng
    const userPoints = 3500;

    const handleAddressSelect = (addressId: string) => {
        setSelectedAddressId(addressId);
        setError("");
    };

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
        setError("");
    };

    const handleVoucherSelect = (voucher: string) => {
        setSelectedVoucher(voucher);
        setError("");
    };

    const handlePointsUsage = (points: number) => {
        setPointsUsed(points);
    }

    const handleNewAddressSave = (newAddress: any) => {
        console.log("New address saved:", newAddress);
        // Here you would call API to save address
        // After successful save, you can auto-select the new address
        alert("Address saved successfully!");
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedAddressId) {
            setError("Please select a delivery address.");
            return;
        }

        if (!selectedPaymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        setError("");

        console.log({
            selectedAddressId,
            selectedPaymentMethod,
            creditCard,
            selectedVoucher,
            pointsUsed,
            message: "Proceeding to checkout..."
        });
    };

    return (
        <>
            <div className="bg-white py-6 px-6 lg:px-40 border-b flex items-center justify-between">
                <strong className="text-lg">GrillFood - Fast Food Store</strong>
                <Link to={"/cart"} className="flex items-center gap-2">
                    <RiShoppingBag4Line className="text-3xl text-blue-600" />
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2.8fr] items-start bg-gray-200">
                <form 
                    className="p-10 bg-white border-r flex flex-col gap-5"
                    onSubmit={handleCheckout}
                >
                    <div className="border-b pb-4 mb-4">
                        <p className="text-gray-500 pb-2">Account</p>
                        <span>demo@example.com</span>   
                    </div>
                    <AddressSelector
                        selectedAddressId={selectedAddressId}
                        onAddressSelect={handleAddressSelect}
                        onNewAddressSave={handleNewAddressSave}
                    />
                    <PaymentMethod 
                        selectedMethod={selectedPaymentMethod}
                        onMethodSelect={handlePaymentMethodSelect}
                        creditCard={creditCard}
                        onCreditCardChange={setCreditCard}
                    />
                    <Voucher 
                        selectedVoucher={selectedVoucher}
                        onVoucherSelect={handleVoucherSelect}
                    />
                    <Point 
                        userPoints={userPoints}
                        onUsePoints={handlePointsUsage}
                    />
                    {error && <p className="text-sm text-red-500 pl-1">{error}</p>}
                    <button className="btn-primary" type="submit">
                        PAY NOW
                    </button>
                    <div className="text-sm border-t border-gray-400 mt-4 pt-4">
                        <Link to={"/refund-policy"} className="text-blue-500 underline">Refund Policy</Link>
                        <Link to={"/shipping-policy"} className="text-blue-500 underline ml-4">Shipping Policy</Link>
                        <Link to={"/privacy-policy"} className="text-blue-500 underline ml-4">Privacy Policy</Link>
                        <Link to={"/terms-of-service"} className="text-blue-500 underline ml-4">Terms of Service</Link>
                    </div>
                </form>
                <div className="p-10 md:sticky top-0">
                    <OrderDetail 
                        selectedVoucher={selectedVoucher}
                        point={pointsUsed}
                    />
                </div>
            </div>
        </>
    );
};

export default Checkout;