import { name } from '@/store/reducer/client/account/account.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

export const accountAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(accountAction.firstFetch);

// logout
export const actionLogout = createAction(`${name}/LOGOUT`);

// update account
export const updateAccount = createAction(accountAction.update, (state) => ({ payload: state }));

//fetch address
export const fetchAddress = createAction(`${name}/FETCH/ADDRESS`);

// create address
export const createAddress = createAction(`${name}/CREATE_ADDRESS`, (state) => ({
    payload: state,
}));

// create address in profile
export const createAddressInProfile = createAction(`${name}/CREATE_ADDRESS/PROFILE`, (state) => ({
    payload: state,
}));

// update address in profile
export const updateAddressInProfile = createAction(`${name}/UPDATE_ADDRESS/PROFILE`, (state) => ({
    payload: state,
}));

// setDefault address
export const setDefaultAddress = createAction(`${name}/SET_DEFAULT`, (state) => ({
    payload: state,
}));
