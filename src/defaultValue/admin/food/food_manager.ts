import { initFoodFilter } from '@/defaultValue/client/collection/food';
import { FoodManagerType } from '@/type/store/admin/food_manager/food_manager.style';
import { FilterFood } from '@/type/store/client/collection/food.style';

export const filterFoodManager: FilterFood = {
    pageNo: 0,
    pageSize: 10,
    search: '',
    sort: 'asc',
    order: 'id',
    startDate: null,
    endDate: null,
    deep: 1,
    id: [],
    statusFoods: [],
    sizeIds: [],
};

export const foodManager: FoodManagerType = {
    foods: [],
    totalPage: 0,
    filter: filterFoodManager,
    loadngPage: false,
    foodSelected: null,
    filterOption: {
        size: [],
    },
    loadingComponent: false,
};
