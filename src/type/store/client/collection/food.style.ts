import { Category } from './collection.style';
import { Filter } from '@/type/store/common';

export enum EStatusFood {
    DELETE,
    OUT_STOCK,
    ACTIVE,
}

export interface Food {
    id: number;
    name: string;
    image: string;
    desc: string;
    status: EStatusFood;
    category: Category;
    foodSizes: FoodSize[];
}

export interface FoodSize {
    id: number;
    discount: number;
    readyInMinutes: number;
    price: number;
    foodId: Food;
    sizeId: Size;
    isActive: boolean;
}

export interface Size {
    id: number;
    name: string;
    isActive: boolean;
}

export interface FilterFood extends Filter {
    deep?: number;
    id?: number[];
    statusFoods?: EStatusFood[];
    minDiscount?: number;
    maxDiscount?: number;
    minPrice?: number;
    maxPrice?: number;
    minReady?: number;
    maxReady?: number;
    sizeIds?: number[];
    categoryId?: number | null;
}

export interface FoodSlice {
    foods: Food[];
    filter: FilterFood;
    sizes: Size[];
    foodDetail: Food;
}
