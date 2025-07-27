import { name } from '@/store/reducer/client/checkout/checkout.reducer';
import { CheckoutSlice } from '@/type/store/client/checkout/checkout.style';
import { createSelector } from '@reduxjs/toolkit';

// select state
const selectState = (state: any) => state[name];

//get checkout
export const selectCheckout = createSelector(selectState, (state: CheckoutSlice) => state);

// get discount apply
export const selectDiscountApply = createSelector(
    selectState,
    (state: CheckoutSlice) => state.discountApply
);

export const selectPoint = createSelector(selectState, (state: CheckoutSlice) => state.point.used);

export const selectSubTotal = createSelector(selectState, (state: CheckoutSlice) => state.subTotal);

export const selectShip = createSelector(selectState, (state: CheckoutSlice) => state.ship);

export const selectTotal = createSelector(selectState, (state: CheckoutSlice) => state.total);
