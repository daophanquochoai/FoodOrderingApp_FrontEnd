import { name } from '@/store/reducer/client/cart/cart.reducer';
import { CartSlice } from '@/type/store/client/cart/cart.style';
import { createSelector } from '@reduxjs/toolkit';

// select state
const selectState = (state: any) => state[name];

/**
 * get cart filter
 */
export const selectFitler = createSelector(selectState, (state: CartSlice) => state.filter);

/**
 * get cart
 */
export const selectCart = createSelector(selectState, (state: CartSlice) => state.cart);

/**
 * get loading
 */
export const selectLoadingPage = createSelector(
    selectState,
    (state: CartSlice) => state.loadingPage
);
