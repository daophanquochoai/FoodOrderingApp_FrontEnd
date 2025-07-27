import { initPaymentSlice } from '@/defaultValue/client/payment/payment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'payment';

const PaymentSlice = createSlice({
    name,
    initialState: initPaymentSlice,
    reducers: {
        setLoadingPayment(state, { payload }: PayloadAction<any>) {
            state.payment.loading = payload;
        },
        setFilterPayment(state, { payload }: PayloadAction<any>) {
            state.payment.filter = payload;
        },
        setPayment(state, { payload }: PayloadAction<any>) {
            state.payment.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.payment.totalPage = payload;
        },
    },
});

export const { actions } = PaymentSlice;
export default PaymentSlice;
