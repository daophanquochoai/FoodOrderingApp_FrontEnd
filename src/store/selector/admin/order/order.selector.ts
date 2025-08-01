import { RootReducerType } from '@/store/reducer/rooReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.order;

export const selectOrders = createSelector(selectState, (state) => state.orders);

export const selectFilterOrder = createSelector(selectState, (state) => state.orders.filter);

export const selectTotalPage = createSelector(selectState, (state) => state.orders.totalPage);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);

export const selectSelectedOrder = createSelector(selectState, (state) => state.selectedOrder);
