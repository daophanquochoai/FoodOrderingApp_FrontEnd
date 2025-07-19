import { filterCategory } from '@/defaultValue/client/collection/collection';
import { CategorySlice } from '@/type/store/admin/category/category.style';

export const initCategorySlice: CategorySlice = {
    categorys: {
        page: 0,
        totalPage: 0,
        data: [],
    },
    filterOption: {
        category: [],
    },
    filter: {
        ...filterCategory,
        deep: 1,
    },
};
