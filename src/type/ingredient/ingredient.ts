<<<<<<< HEAD
export interface IngredientRaw {
    id: string;
    name: string;
    unit: string;
    low_threshold: number;
    history: {
        quantity: number;
        used_unit: number;
    }[];
    late_update_time: string;
}

export interface Ingredient {
    id?: string;
    name: string;
    unit: string;
    quantity?: number;
    low_threshold?: number;
    late_update_time?: string;
    status?: 'in_stock' | 'low_stock' | 'out_of_stock';
=======
export interface Ingredient {
    key: string;
    name: string;
    unit: string;
    quantity: number;
    low_threshold: number;
    late_update_time?: string;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
>>>>>>> main
}
