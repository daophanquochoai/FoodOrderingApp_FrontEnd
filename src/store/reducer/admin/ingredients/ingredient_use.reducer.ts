import { initIngredientUseSlice } from '@/defaultValue/admin/ingredients/ingredient_use';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IngredientsSlice from './ingredients.reducer';

export const name = 'ingredients_use';

const IngredientUseSlice = createSlice({
    name,
    initialState: initIngredientUseSlice,
    reducers: {
        setLoading(state, { payload }: PayloadAction<any>) {
            state.ingredients.loading = payload;
        },
        setIngreedientUse(state, { payload }: PayloadAction<any>) {
            state.ingredients.data = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
    },
});

export const { actions } = IngredientsSlice;
export default IngredientUseSlice;
