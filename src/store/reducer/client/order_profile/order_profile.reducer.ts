import { initOrderProfileSlice } from '@/defaultValue/client/order/order_profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'order_profile';

const OrderProfileSlice = createSlice({
    name,
    initialState: initOrderProfileSlice,
    reducers: {
        setLoading(state, { payload }: PayloadAction<any>) {
            state.orders.loading = payload;
        },
        setOrder(state, { payload }: PayloadAction<any>) {
            state.orders.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.orders.totalPage = payload;
        },
        setFlter(state, { payload }: PayloadAction<any>) {
            state.orders.filter = payload;
        },
        setSelectedOrder(state, { payload }: PayloadAction<any>) {
            state.selectedOrder = payload;
        },
    },
});

export const { actions } = OrderProfileSlice;
export default OrderProfileSlice;
