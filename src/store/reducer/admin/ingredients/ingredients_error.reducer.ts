import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initIngredientsErrorSlice } from '@/defaultValue/admin/ingredients/ingredients_error';

export const name = 'ingredientsError';

const IngredientsErrorSlice = createSlice({
    name,
    initialState: initIngredientsErrorSlice,
    reducers: {
        setIngredientsError(state, { payload }: PayloadAction<any>) {
            state.ingredientsError = payload;
        },
        setHistoryIngredients(state, { payload }: PayloadAction<any>) {
            state.historyIngredients = payload;
        },
        setLoadingHistory(state, { payload }: PayloadAction<boolean>) {
            state.loadingHistory = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.totalPage = payload;
        },
        setLoadingPage(state, { payload }: PayloadAction<boolean>) {
            state.loadingPage = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<boolean>) {
            state.loadingComponent = payload;
        },
        setIngredientsErrorSelected(state, { payload }: PayloadAction<any>) {
            state.ingredientsErrorSelected = payload;
        },
    }
});

export const { actions } = IngredientsErrorSlice;
export default IngredientsErrorSlice;