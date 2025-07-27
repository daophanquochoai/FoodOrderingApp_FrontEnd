import { initCheckout } from '@/defaultValue/client/checkout/checkout';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'checkout';

const CheckoutSlice = createSlice({
    name,
    initialState: initCheckout,
    reducers: {
        setLoading(state, { payload }: PayloadAction<any>) {
            state.loading = payload;
        },
        setPoint(state, { payload }: PayloadAction<any>) {
            state.point.data = payload;
        },
        setUsePoint(state, { payload }: PayloadAction<any>) {
            state.point.used = payload;
        },
        setShip(state, { payload }: PayloadAction<any>) {
            state.ship_fee = payload;
        },
        setDiscountApply(state, { payload }: PayloadAction<any>) {
            state.discountApply = payload;
        },
        setSubTotal(state, { payload }: PayloadAction<any>) {
            state.subTotal = payload;
        },
        setTotal(state, { payload }: PayloadAction<any>) {
            state.total = payload;
        },
        setFeeShip(state, { payload }: PayloadAction<any>) {
            state.ship = payload;
        },
    },
});

export const { actions } = CheckoutSlice;
export default CheckoutSlice;
