import { IngredientUseSlice } from '@/type/store/admin/ingredients/ingredients_use.style';

export const initIngredientUseSlice: IngredientUseSlice = {
    ingredients: {
        data: [],
        loading: false,
    },
    loadingComponent : false
};
