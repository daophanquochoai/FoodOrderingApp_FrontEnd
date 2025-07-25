import { name } from '@/store/reducer/admin/ingredients/ingredients.reducer';
import { IngredientSlice } from '@/type/store/admin/ingredients/ingredients.style';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const selectState = (state: any) => state[name];

/**
 * get ingredinet
 */
export const selectIngredients = createSelector(
    selectState,
    (state: IngredientSlice) => state.ingredients
);

/**
 * get loading
 */
export const selectLoading = createSelector(
    selectState,
    (state: IngredientSlice) => state.loadingPage
);

/**
 * get total page
 */
export const selectTotalPage = createSelector(
    selectState,
    (state: IngredientSlice) => state.totalPPage
);

/**
 * get filter
 */
export const selectFilter = createSelector(selectState, (state: IngredientSlice) => state.filter);

/**
 * get selected ingredients
 */
export const selectIngredientsSelected = createSelector(
    selectState,
    (state: IngredientSlice) => state.ingredientSelected
);

/**
 * get loading history
 */
export const selectLoadingHistory = createSelector(
    selectState,
    (state: IngredientSlice) => state.loadingHistory
);

/**
 * get filter history ingredients
 */
export const selectFilterHistoryIngredient = createSelector(
    selectState,
    (state: IngredientSlice) => state.filterHistory
);

/**
 * get history
 */
export const selectHistory = createSelector(selectState, (state: IngredientSlice) => state.history);

/**
 * get loading component
 */
export const selectLoadingComponent = createSelector(
    selectState,
    (state: IngredientSlice) => state.loadingComponent
);
