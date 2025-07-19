import { Category, FilterCategory } from '../../client/collection/collection.style';

export interface CategorySlice {
    categorys: {
        page: number;
        totalPage: number;
        data: Category[];
    };
    filter: FilterCategory;
    filterOption: FilterOptions;
}

export interface FilterOptions {
    category: Category[];
}
