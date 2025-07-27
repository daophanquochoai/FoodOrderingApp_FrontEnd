import { CheckoutSlice } from '@/type/store/client/checkout/checkout.style';

export const initCheckout: CheckoutSlice = {
    address: {
        address: '',
        name: '',
        phoneNumber: '',
    },
    totalPrice: null,
    payment_id: null,
    discountApply: null,
    ship_fee: {
        baseFee: 0,
        feePerKm: 0,
        minOrderForFeeShipping: 0,
        rushHourFee: 0,
    },
    transaction_code: null,
    status: null,
    tableNumber: null,
    loading: false,
    point: {
        data: null,
        used: 0,
    },
    subTotal: 0,
    ship: 0,
    total: 0,
};
