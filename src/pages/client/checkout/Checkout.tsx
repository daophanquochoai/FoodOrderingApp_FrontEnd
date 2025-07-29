import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiShoppingBag4Line } from 'react-icons/ri';
import AddressSelector from '../../../components/checkout/AddressSelector';
import OrderDetail from '../../../components/checkout/OrderDetail';
import PaymentMethod from '../../../components/checkout/PaymentMethod';
import Voucher from '../../../components/checkout/Voucher';
import Point from '../../../components/checkout/Point';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchFirst,
    paymentAction,
    usePointAction,
} from '@/store/action/client/checkout/checkout.action';
import { selectCheckout } from '@/store/selector/client/checkout/checkout.selector';
import { selectAddress, selectInfo } from '@/store/selector/client/account/account.selector';
import { selectCart } from '@/store/selector/client/cart/cart.selector';

interface CreditCardInfo {
    cardholder: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

const Checkout = () => {
    // hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // select
    const checkoutSlice = useSelector(selectCheckout);
    const info = useSelector(selectInfo);
    const cart = useSelector(selectCart);
    const addressList = useSelector(selectAddress);

    // useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const [error, setError] = useState('');

    const [selectedAddressId, setSelectedAddressId] = useState<number>(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [creditCard, setCreditCard] = useState<CreditCardInfo>({
        cardholder: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [selectedVoucher, setSelectedVoucher] = useState<number>(null);

    const handleAddressSelect = (addressId: number) => {
        setSelectedAddressId(addressId);
        setError('');
    };

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
        setError('');
    };

    const handleVoucherSelect = (voucher: number) => {
        setSelectedVoucher(voucher);
        setError('');
    };

    const handlePointsUsage = (points: number) => {
        dispatch(usePointAction(points / 1000));
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedAddressId) {
            setError('Please select a delivery address.');
            return;
        }

        if (!selectedPaymentMethod) {
            setError('Please select a payment method.');
            return;
        }

        setError('');
        handlePayNow();
    };

    const handlePayNow = () => {
        dispatch(
            paymentAction({
                checkout: checkoutSlice,
                cart: cart,
                payment: {
                    selectedPaymentMethod,
                    creditCard,
                },
                address: {
                    address: addressList?.data?.filter((item) => item.id == selectedAddressId)[0],
                },
                action: () => navigate('/'),
            })
        );
    };

    return (
        <>
            <div className="bg-white py-6 px-6 lg:px-40 border-b flex items-center justify-between">
                <strong className="text-lg">GrillFood - Fast Food Store</strong>
                <Link to={'/cart'} className="flex items-center gap-2">
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
                        <span>{info?.email}</span>
                    </div>
                    <AddressSelector
                        selectedAddressId={selectedAddressId}
                        onAddressSelect={handleAddressSelect}
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
                        userPoints={checkoutSlice?.point?.data + 10000}
                        onUsePoints={handlePointsUsage}
                    />
                    {error && <p className="text-sm text-red-500 pl-1">{error}</p>}
                    <button className="btn-primary" type="submit">
                        PAY NOW
                    </button>
                    <div className="text-sm border-t border-gray-400 mt-4 pt-4">
                        <Link to={'/refund-policy'} className="text-blue-500 underline">
                            Refund Policy
                        </Link>
                        <Link to={'/shipping-policy'} className="text-blue-500 underline ml-4">
                            Shipping Policy
                        </Link>
                        <Link to={'/privacy-policy'} className="text-blue-500 underline ml-4">
                            Privacy Policy
                        </Link>
                        <Link to={'/terms-of-service'} className="text-blue-500 underline ml-4">
                            Terms of Service
                        </Link>
                    </div>
                </form>
                <div className="p-10 md:sticky top-0">
                    <OrderDetail />
                </div>
            </div>
        </>
    );
};

export default Checkout;
