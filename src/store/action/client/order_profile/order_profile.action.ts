import { name } from '@/store/reducer/client/order_profile/order_profile.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const orderProfle = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(orderProfle.firstFetch);

export const changeTab = createAction(`${name}/CHANGE_TAB`, (state) => ({
    payload: state,
}));

export const updateOrder = createAction(`${name}/CANCEL_ORDER`, (state) => ({
    payload: state,
}));
