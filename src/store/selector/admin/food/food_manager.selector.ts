import { name } from '@/store/reducer/admin/food/food_manager.reducer';
import { FoodManagerType } from '@/type/store/admin/food_manager/food_manager.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

/**
 * get food
 */
export const selectFoodManager = createSelector(
    selectState,
    (state: FoodManagerType) => state.foods
);

/**
 * get fitler
 */
export const selectFilter = createSelector(selectState, (state: FoodManagerType) => state.filter);

/**
 * get food selected
 */
export const selectFoodSelected = createSelector(
    selectState,
    (state: FoodManagerType) => state.foodSelected
);

/**
 * get loading
 */
export const selectLoadingPage = createSelector(
    selectState,
    (state: FoodManagerType) => state.loadngPage
);

/**
 * get filter option
 */
export const selectFitlerOption = createSelector(
    selectState,
    (state: FoodManagerType) => state.filterOption
);

/**
 * get loading component
 */
export const selectLoadingComponent = createSelector(
    selectState,
    (state: FoodManagerType) => state.loadingComponent
);

/**
 * get total page
 */
export const selectTotalPage = createSelector(
    selectState,
    (state: FoodManagerType) => state.totalPage
);
