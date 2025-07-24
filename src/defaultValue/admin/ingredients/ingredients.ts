import { filter } from '@/defaultValue/common';
import {
    FilterIngredient,
    FilterIngredientHistory,
    IngredientSlice,
} from '@/type/store/admin/ingredients/ingredients.style';

export const filterIngredients: FilterIngredient = {
    ...filter,
    unit: [],
    minThreshold: null,
    maxThreshold: null,
};

export const filterHistoryIngredient: FilterIngredientHistory = {
    ...filter,
    deep: 1,
    historyImportOrExportId: null,
    sourceId: null,
    inventory: null,
    isActive: null,
    ingredientsId: null,
    minPrice: null,
    maxPrice: null,
};

export const initIngredientsSlice: IngredientSlice = {
    ingredients: [],
    filter: filterIngredients,
    totalPPage: 0,
    loadingPage: false,
    loadingComponent: false,
    ingredientSelected: null,
    filterHistory: filterHistoryIngredient,
    loadingHistory: false,
    history: null,
};
