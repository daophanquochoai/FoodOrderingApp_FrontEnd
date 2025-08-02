import { filter } from '@/defaultValue/common';
import {
    FilterHistoryAdmin,
    HistoryImportAdminSlice,
    HistoryImportOrExportDto,
    HistoryIngredientsDto,
    IngredientsErrorDto,
    IngredientsUseDto,
} from '@/type/store/admin/history/history.style';

export const historyImportOrExport: HistoryImportOrExportDto = {
    id: 0,
    type: null,
    note: '',
    bathCode: '',
    source: '',
    isActive: null,
    historyIngredients: [],
    createdAt: null,
};

export const historyIngredientsDto: HistoryIngredientsDto = {
    id: 0,
    quantity: 0,
    usedUnit: 0,
    pricePerUnit: 0,
    avgPrice: 0,
    type: null,
    expiredTime: null,
    isActive: null,
    ingredients: null,
    errors: [],
    uses: [],
};

export const ingredientsErrorDto: IngredientsErrorDto = {
    id: 0,
    unit: 0,
    quantity: 0,
    reason: null,
    isActive: null,
    historyIngredients: null,
};

export const ingredientsUseDto: IngredientsUseDto = {
    id: 0,
    unit: null,
    quantity: 0,
    orderItemId: 0,
    isActive: null,
};

// =========================== admin ==========================
export const initFilterHistoryAdmin: FilterHistoryAdmin = {
    ...filter,
    sourceId: null,
    inventory: null,
    ingredientsId: null,
    minPrice: null,
    maxPrice: null,
    historyImportOrExportId: null,
    deep: 1,
};

export const initHistoryAdminSlice: HistoryImportAdminSlice = {
    history: {
        data: [],
        loading: false,
        filter: initFilterHistoryAdmin,
        totalPage: 0,
    },
    selectedHistory: null,
    loadingComponent: false,
    filterOption: null,
};
