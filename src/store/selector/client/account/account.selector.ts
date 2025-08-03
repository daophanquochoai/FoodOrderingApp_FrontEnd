import { name } from '@/store/reducer/client/account/account.reducer';
import { Account } from '@/type/store/client/account/account.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

// get account info
export const selectAddress = createSelector(selectState, (state: Account) => state.address);

// get loading
export const selectLoading = createSelector(selectState, (state: Account) => state.loading);

// get info
export const selectInfo = createSelector(selectState, (state: Account) => state.info);

// get loading component
export const selectLoadingComponent = createSelector(
    selectState,
    (state: Account) => state.loadingComponent
);

// get filter address
export const selectFilterAddress = createSelector(
    selectState,
    (state: Account) => state.address.filter
);

export const selectAddressSelected = createSelector(
    selectState,
    (state: Account) => state.address.selectedAccount
);
