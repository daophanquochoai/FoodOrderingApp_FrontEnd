import { initIngredientsSlice } from '@/defaultValue/admin/ingredients/ingredients';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'ingredients';

const IngredientsSlice = createSlice({
    name,
    initialState: initIngredientsSlice,
    reducers: {
        setIngredient(state, { payload }: PayloadAction<any>) {
            state.ingredients = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.totalPPage = payload;
        },
        setLoading(state, { payload }: PayloadAction<any>) {
            state.loadingPage = payload;
        },
        setIngredientsSelected(state, { payload }: PayloadAction<any>) {
            state.ingredientSelected = payload;
        },
        setLoadingHistory(state, { payload }: PayloadAction<any>) {
            state.loadingHistory = payload;
        },
        setHistory(state, { payload }: PayloadAction<any>) {
            state.history = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
    },
});

export const { actions } = IngredientsSlice;
export default IngredientsSlice;
