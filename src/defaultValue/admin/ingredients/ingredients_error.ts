import { filter } from '@/defaultValue/common';
import {
    IngredientsErrorFilter,
    IngredientsErrorSlice,
} from '@/type/store/admin/ingredients/ingredients_error.style';

export const filterIngredientsError: IngredientsErrorFilter = {
    ...filter,
    unit: [],
    isActive: true,
    minQuantity: undefined,
    maxQuantity: undefined,
};

export const initIngredientsErrorSlice: IngredientsErrorSlice = {
    ingredientsError: [],
    historyIngredients: [],
    loadingHistory: false,
    filter: filterIngredientsError,
    totalPage: 0,
    loadingPage: false,
    loadingComponent: false,
    ingredientsErrorSelected: null,
};
