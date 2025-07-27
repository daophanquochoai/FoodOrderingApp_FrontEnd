import { name } from '@/store/reducer/client/payment/payment.reducer';
import { PaymentSlice } from '@/type/store/client/payment/payment.style';
import { createSelector } from '@reduxjs/toolkit';

export const selectState = (state: any) => state[name];

export const selectPayment = createSelector(selectState, (state: PaymentSlice) => state.payment);
