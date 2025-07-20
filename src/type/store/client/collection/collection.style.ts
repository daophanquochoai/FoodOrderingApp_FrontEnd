import { Food } from '@/type/product/product';

export enum EStatusCategory {
    DELETE,
    EXPIRED,
    ACTIVE,
}

export interface Category {
    id: number;
    name: string;
    image: string;
    desc: string;
    status: EStatusCategory;
    parent: Category;
    foods?: Food[];
}

export interface FilterCategory {
    pageNo?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    order?: string;
    startDate?: Date;
    endDate?: Date;
    deep?: number;
    id?: number[];
    statusCategories?: EStatusCategory[];
}

export interface Collection {
    selectedCategory: Category;
    filter: FilterCategory;
    category: Category[];
}
