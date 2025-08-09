import { FilterFood, Food, Size } from '../../client/collection/food.style';
import { Ingredient } from '@/type/ingredient/ingredient';

export interface Recipe {
    food: {
        data: Food[];
        totalPage: number;
        loading: boolean;
    };
    loadingComponent: boolean;
    selectedFood: Food;
    filterOption: FilterOptionRecipe;
    ingredients: Ingredient[];
    filter: FilterFood;
}

export interface FilterOptionRecipe {
    food: Food[];
    size: Size[];
    ingredients: Ingredient[];
}
