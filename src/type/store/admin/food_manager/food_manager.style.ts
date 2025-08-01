import { FilterFood, Food, Size } from '../../client/collection/food.style';

export interface FoodManagerType {
    foods: Food[];
    totalPage: number;
    filter: FilterFood;
    loadngPage: boolean;
    foodSelected: Food;
    filterOption: FilterOptionFoodManager;
    loadingComponent: boolean;
}

export interface FilterOptionFoodManager {
    size: Size[];
}
