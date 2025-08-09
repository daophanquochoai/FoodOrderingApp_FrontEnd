import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { selectErrorStripe } from '@/store/selector/admin/order/order.selector';

interface PaymentMethodProps {
    selectedMethod?: string;
    onMethodSelect?: (method: string) => void;
}

interface CreditCardInfo {
    cardholder: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
    selectedMethod,
    onMethodSelect,
}) => {

    // selector 
    const stripeError = useSelector(selectErrorStripe);

    // function
    const handleMethodSelect = (method: string) => {
        if (onMethodSelect) {
            onMethodSelect(method);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <strong className="text-lg">Payment</strong>
            <div className="space-y-4">
                <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedMethod === 'CASH'
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleMethodSelect('CASH')}
                >
                    <div className="flex items-start space-x-3">
                        <input
                            type="radio"
                            name="method"
                            value="CASH"
                            checked={selectedMethod === 'CASH'}
                            onChange={() => handleMethodSelect('CASH')}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Cash on Delivery (COD)
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedMethod === 'CARD'
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleMethodSelect('CARD')}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start space-x-3">
                            <input
                                type="radio"
                                name="method"
                                value="CARD"
                                checked={selectedMethod === 'CARD'}
                                onChange={() => handleMethodSelect('CARD')}
                                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Credit or Debit Card
                                </p>
                            </div>
                        </div>
                        {selectedMethod === 'CARD' && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <CardElement className="inputBox px-5 py-2 pt-5 pb-1" />
                                </div>
                                {stripeError && <p className="text-red-500">{stripeError}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
