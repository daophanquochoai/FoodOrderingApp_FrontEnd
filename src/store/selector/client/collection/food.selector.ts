import { name } from '@/store/reducer/client/collection/food.reducer';
import { FoodSlice } from '@/type/store/client/collection/food.style';
import { createSelector } from '@reduxjs/toolkit';

export const selectState = (state: any) => state[name];

/**
 * get food
 */
export const selectFood = createSelector(selectState, (state: FoodSlice) => {
    return state.foods;
});

/**
 * get filter
 */
export const selectFilter = createSelector(selectState, (state: FoodSlice) => state.filter);

/**
 * get size
 */
export const selectSize = createSelector(selectState, (state: FoodSlice) => state.sizes);

/**
 * get food detail
 */
export const selectFoodDetail = createSelector(selectState, (state: FoodSlice) => state.foodDetail);
