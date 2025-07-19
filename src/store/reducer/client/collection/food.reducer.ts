import { initFoodSlice } from '@/defaultValue/client/collection/food';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'food';

const FoodSlice = createSlice({
    name,
    initialState: initFoodSlice,
    reducers: {
        setFood(state, { payload }: PayloadAction<any>) {
            state.foods = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setSize(state, { payload }: PayloadAction<any>) {
            state.sizes = payload;
        },
        setFoodDetail(state, { payload }: PayloadAction<any>) {
            state.foodDetail = payload;
        },
    },
});

export const { actions } = FoodSlice;
export default FoodSlice;
