import React, { useState } from "react";
import { validateCardNumber, validateCVV, validateCardholder, validateExpiry, formatCVV, formatCardNumber, formatExpiry } from "../../utils/validation/payment";

interface PaymentMethodProps {
    selectedMethod?: string;
    onMethodSelect?: (method: string) => void;
    creditCard: CreditCardInfo;
    onCreditCardChange: (form: CreditCardInfo) => void;
}

interface CreditCardInfo {
  cardholder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface ValidationErrors {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  cardholder?: string;
}

const PaymentMethod:React.FC<PaymentMethodProps> = ({
    selectedMethod,
    onMethodSelect,
    creditCard,
    onCreditCardChange
}) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleMethodSelect = (method: string) => {
        if (onMethodSelect) {
            onMethodSelect(method);
            setErrors({});
            setTouched({});
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiry') {
            formattedValue = formatExpiry(value);
        } else if (name === 'cvv') {
            formattedValue = formatCVV(value);
        }

        onCreditCardChange({
            ...creditCard,
            [name]: formattedValue
        });

        setTouched({...touched, [name]: true});

        let fieldError;
        switch (name) {
            case 'cardNumber':
                fieldError = validateCardNumber(formattedValue);
                break;
            case 'expiry':
                fieldError = validateExpiry(formattedValue);
                break;
            case 'cvv':
                fieldError = validateCVV(formattedValue);
                break;
            case 'cardholder':
                fieldError = validateCardholder(formattedValue);
                break;
        }

        setErrors({
            ...errors,
            [name]: fieldError
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched({...touched, [name]: true});
        
        // Validate on blur
        let fieldError;
        switch (name) {
            case 'cardNumber':
                fieldError = validateCardNumber(creditCard.cardNumber);
                break;
            case 'expiry':
                fieldError = validateExpiry(creditCard.expiry);
                break;
            case 'cvv':
                fieldError = validateCVV(creditCard.cvv);
                break;
            case 'cardholder':
                fieldError = validateCardholder(creditCard.cardholder);
                break;
        }
        
        // Update error state
        setErrors({
            ...errors,
            [name]: fieldError
        });
    };

    const hasError = (field: string): boolean => {
        return touched[field] === true && Boolean(errors[field as keyof ValidationErrors]);
    };

    return (
        <div className="flex flex-col gap-4">
            <strong className="text-lg">Payment</strong>
            <div className="space-y-4">
                <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedMethod === "cod"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleMethodSelect("cod")}
                >
                    <div className="flex items-start space-x-3">
                        <input
                            type="radio"
                            name="method"
                            value="cod"
                            checked={selectedMethod === "cod"}
                            onChange={() => handleMethodSelect("cod")}
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
                        selectedMethod === "card"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleMethodSelect("card")}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start space-x-3">
                            <input
                                type="radio"
                                name="method"
                                value="card"
                                checked={selectedMethod === "card"}
                                onChange={() => handleMethodSelect("card")}
                                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Credit or Debit Card
                                </p>
                            </div>
                        </div>
                        {selectedMethod === "card" && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="cardnumber"
                                        name="cardNumber"
                                        value={creditCard.cardNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maxLength={19}
                                        placeholder="Card Number"
                                        className={`peer inputBox ${hasError('cardNumber') ? 'border-red-500 focus:border-red-500' : ''}`}
                                        required
                                    />
                                    <label
                                        htmlFor="cardnumber"
                                        className={`absolute left-5 top-1 ${hasError('cardNumber') ? 'text-red-500' : 'text-gray-500'} text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:${hasError('cardNumber') ? 'text-red-500' : 'text-blue-500'}`}
                                    >
                                        Card Number
                                    </label>
                                    {hasError('cardNumber') && (
                                        <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            id="expiry"
                                            name="expiry"
                                            value={creditCard.expiry}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Expiration Date (MM/YY)"
                                            className={`peer inputBox ${hasError('expiry') ? 'border-red-500 focus:border-red-500' : ''}`}
                                            required
                                        />
                                        <label
                                            htmlFor="expiry"
                                            className={`absolute left-5 top-1 ${hasError('expiry') ? 'text-red-500' : 'text-gray-500'} text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:${hasError('expiry') ? 'text-red-500' : 'text-blue-500'}`}
                                        >
                                            Expiration Date (MM/YY)
                                        </label>
                                        {hasError('expiry') && (
                                            <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
                                        )}
                                    </div>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={creditCard.cvv}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="CVV"
                                            className={`peer inputBox ${hasError('cvv') ? 'border-red-500 focus:border-red-500' : ''}`}
                                            required
                                        />
                                        <label
                                            htmlFor="cvv"
                                            className={`absolute left-5 top-1 ${hasError('cvv') ? 'text-red-500' : 'text-gray-500'} text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:${hasError('cvv') ? 'text-red-500' : 'text-blue-500'}`}
                                        >
                                            CVV
                                        </label>
                                        {hasError('cvv') && (
                                            <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="cardholder"
                                        name="cardholder"
                                        value={creditCard.cardholder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Name on card"
                                        className={`peer inputBox ${hasError('cardholder') ? 'border-red-500 focus:border-red-500' : ''}`}
                                        required
                                    />
                                    <label
                                        htmlFor="cardholder"
                                        className={`absolute left-5 top-1 ${hasError('cardholder') ? 'text-red-500' : 'text-gray-500'} text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:${hasError('cardholder') ? 'text-red-500' : 'text-blue-500'}`}
                                    >
                                        Name on card
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;