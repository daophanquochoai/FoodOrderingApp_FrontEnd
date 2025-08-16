import {
    EStatusFood,
    FilterFood,
    Food,
    FoodSize,
    FoodSlice,
    Size,
} from '@/type/store/client/collection/food.style';
import { initCategory } from './collection';

export const initSize: Size = {
    id: 0,
    name: '',
    isActive: true,
};

export const initFoodSize: FoodSize = {
    id: 0,
    discount: 0,
    readyInMinutes: 0,
    price: 0,
    foodId: null,
    sizeId: initSize,
    isActive: true,
};

export const initFood: Food = {
    id: 0,
    name: '',
    image: '',
    desc: '',
    status: EStatusFood.ACTIVE,
    category: initCategory,
    foodSizes: [],
};

export const initFoodFilter: FilterFood = {
    pageNo: 0,
    pageSize: 10,
    search: '',
    sort: 'asc',
    order: 'id',
    startDate: null,
    endDate: null,
    deep: 1,
    id: [],
    statusFoods: [EStatusFood.ACTIVE],
    sizeIds: [],
    categoryId: null,
};

export const initFoodSlice: FoodSlice = {
    foods: [],
    totalPage : 0,
    filter: initFoodFilter,
    sizes: [],
    foodDetail: null,
};
