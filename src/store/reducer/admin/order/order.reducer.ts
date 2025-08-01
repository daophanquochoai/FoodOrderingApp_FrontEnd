import { initOrderSlice } from '@/defaultValue/admin/order/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'order';

const OrderSlice = createSlice({
    name,
    initialState: initOrderSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.orders.loading = payload;
        },
        setOrder(state, { payload }: PayloadAction<any>) {
            state.orders.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.orders.totalPage = payload;
        },
        setFilterOrder(state, { payload }: PayloadAction<any>) {
            state.orders.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectOrder(state, { payload }: PayloadAction<any>) {
            state.selectedOrder = payload;
        },
    },
});

export const { actions } = OrderSlice;
export default OrderSlice;
