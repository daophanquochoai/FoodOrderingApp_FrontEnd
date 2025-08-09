export interface IngredientsUse {
    id: number;
    unit: string;
    quantity: number;
    orderId: number;
    isActive: boolean;
    ingredients: Ingre;
}

export interface Ingre {
    id: number;
    name: string;
    unit: string;
    lowThreshold: number;
    isActive: boolean;
}

export interface IngredientUseSlice {
    ingredients: {
        data: IngredientsUse[];
        loading: boolean;
    };
    loadingComponent: boolean;
}
