import { name } from '@/store/reducer/client/cart/cart.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';
import { selectState } from '@/store/selector/auth/auth.selector';

const cartAction = getCommonActionsTypeByName(name);

/**
 * fetch first
 */
export const fetchFirst = createAction(cartAction.firstFetch);

/**
 * delete cart item
 */
export const deleteCartItem = createAction(cartAction.delete, (state) => ({
    payload: state,
}));

/**
 * add to cart
 */
export const addToCart = createAction(`${name}/ADD_TO_CART`, (state) => ({
    payload: state,
}));
