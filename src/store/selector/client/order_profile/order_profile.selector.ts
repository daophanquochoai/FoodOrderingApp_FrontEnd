import { name } from '@/store/reducer/client/order_profile/order_profile.reducer';
import { RootReducerType } from '@/store/reducer/rooReducer';
import { OrderSlice } from '@/type/store/admin/order/order.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state[name];

export const selectLoading = createSelector(
    selectState,
    (state: OrderSlice) => state.orders.loading
);

export const selectData = createSelector(selectState, (state: OrderSlice) => state.orders.data);

export const selectFilter = createSelector(selectState, (state: OrderSlice) => state.orders.filter);

export const selectOrderSelected = createSelector(
    selectState,
    (state: OrderSlice) => state.selectedOrder
);

export const selectTotalPage = createSelector(
    selectState,
    (state: OrderSlice) => state.orders.totalPage
);
