import { initRecipe } from '@/defaultValue/admin/recipe/recipe';
import { selectFilterOption } from '@/store/selector/admin/category/category.selector';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'recipe';

const RecipeSlide = createSlice({
    name,
    initialState: initRecipe,
    reducers: {
        setFoodList(state, { payload }: PayloadAction<any>) {
            state.food.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.food.totalPage = payload;
        },
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.food.loading = payload;
        },
        setSelectedFood(state, { payload }: PayloadAction<any>) {
            state.selectedFood = payload;
        },
        setFilterOption(state, { payload }: PayloadAction<any>) {
            state.filterOption = {
                ...state.filterOption,
                ...payload,
            };
        },
        setIngredients(state, { payload }: PayloadAction<any>) {
            state.ingredients = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = {
                ...state.filter,
                ...payload,
            };
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
    },
});

export const { actions } = RecipeSlide;
export default RecipeSlide;
