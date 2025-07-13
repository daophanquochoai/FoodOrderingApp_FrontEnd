export interface Ingredient {
    key: string;
    name: string;
    unit: string;
    quantity: number;
    low_threshold: number;
    late_update_time?: string;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
}
