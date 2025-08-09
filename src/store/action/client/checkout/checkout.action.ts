import { name } from '@/store/reducer/client/checkout/checkout.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const checkoutAction = getCommonActionsTypeByName(name);

// fetch checkout action
export const fetchFirst = createAction(checkoutAction.firstFetch);

// using point
export const usePointAction = createAction(`${name}/USE_POINT`, (state) => ({
    payload: state,
}));

// payment
export const paymentAction = createAction(`${name}/PAYMENT`, (state) => ({
    payload: state,
}));

// payment cart
export const paymentCartAction = createAction(`${name}/PAYMENT/CART`, (state) => ({
    payload: state,
}));
