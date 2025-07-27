export interface CheckoutSlice {
    address: {
        address: string;
        phoneNumber: string;
        name: string;
    };
    totalPrice: number;
    payment_id: number;
    discountApply: number;
    ship_fee: {
        baseFee: number;
        feePerKm: number;
        minOrderForFeeShipping: number;
        rushHourFee: number;
    };
    transaction_code: string;
    status: string;
    tableNumber: number;
    loading: boolean;
    point: {
        data: number;
        used: number;
    };
    subTotal: number;
    ship: number;
    total: number;
}

export enum EStatusOrder {
    CREATING = 'CREATING',
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETE = 'COMPLETE',
    SHIPPING = 'SHIPPING',
    RECEIVE = 'RECEIVE',
}
