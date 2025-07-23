import { foodManager } from '@/defaultValue/admin/food/food_manager';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'food_manager';

const FoodManagerSlice = createSlice({
    name,
    initialState: foodManager,
    reducers: {
        setLoading(state, { payload }: PayloadAction<any>) {
            state.loadngPage = payload;
        },
        setFood(state, { payload }: PayloadAction<any>) {
            state.foods = payload;
        },
        setFoodSelected(state, { payload }: PayloadAction<any>) {
            state.foodSelected = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setFilterOption(state, { payload }: PayloadAction<any>) {
            state.filterOption = {
                ...state.filterOption,
                ...payload,
            };
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.totalPage = payload;
        },
    },
});

export const { actions } = FoodManagerSlice;
export default FoodManagerSlice;
