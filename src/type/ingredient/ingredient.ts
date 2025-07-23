export interface IngredientRaw {
    id: string;
    name: string;
    unit: string;
    low_threshold: number;
    avg_price: number;
    create_at: string;
    history: {
        quantity: number;
        used_unit: number;
        avg_price: number;
    }[];
    late_update_time: string;
}

export interface Ingredient {
    id?: string;
    name: string;
    unit: string;
    quantity?: number;
    low_threshold?: number;
    avg_price?: number;
    late_update_time?: string;
    create_at: string;
    status?: 'in_stock' | 'low_stock' | 'out_of_stock';
}
