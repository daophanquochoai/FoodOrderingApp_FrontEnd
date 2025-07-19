import { Category, FilterCategory } from '../../client/collection/collection.style';

export interface CategorySlice {
    categorys: {
        page: number;
        totalPage: number;
        data: Category[];
    };
    filter: FilterCategory;
    filterOption: FilterOptions;
    loadingTable: boolean;
}

export interface FilterOptions {
    category: Category[];
}
