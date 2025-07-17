import {
    Category,
    Collection,
    FilterCategory,
} from '@/type/store/client/collection/collection.style';

export const initCategory: Category = {
    id: 0,
    name: '',
    image: '',
    desc: '',
    status: null,
    parent: null,
};

export const filterCategory: FilterCategory = {
    pageNo: 0,
    pageSize: 10,
    search: '',
    sort: 'asc',
    order: 'id',
    startDate: null,
    endDate: null,
    deep: 0,
    id: null,
    statusCategories: null,
};

export const initCollection: Collection = {
    selectedCategory: null,
    filter: filterCategory,
    category: [],
};
