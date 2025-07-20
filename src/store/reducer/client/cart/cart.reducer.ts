import { initCartSlice } from '@/defaultValue/client/cart/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'cart';
const CartSlice = createSlice({
    name,
    initialState: initCartSlice,
    reducers: {
        setCart(state, { payload }: PayloadAction<any>) {
            state.cart = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.loadingPage = payload;
        },
        setRiseCart(state, { payload }: PayloadAction<any>) {
            const { id, type } = payload;
            state.cart = {
                ...state.cart,
                cartItems: state?.cart?.cartItems?.map((item) => {
                    if (item.id == id) {
                        if (type === 'RISE') {
                            item.quantity += 1;
                        } else {
                            if (item.quantity > 0) {
                                item.quantity -= 1;
                            }
                        }
                    }
                    return item;
                }),
            };
        },
    },
});

export const { actions } = CartSlice;
export default CartSlice;
