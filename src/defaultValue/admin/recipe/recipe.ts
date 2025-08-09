import { Recipe } from '@/type/store/admin/recipe/recipe.style';
import { filterFoodManager } from '../food/food_manager';

export const initRecipe: Recipe = {
    food: {
        data: [],
        totalPage: 0,
        loading: false,
    },
    loadingComponent: false,
    selectedFood: null,
    filterOption: {
        food: [],
        size: [],
        ingredients: [],
    },
    ingredients: [],
    filter: filterFoodManager,
};
