import {
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
};

export const historyIngredientsDto: HistoryIngredientsDto = {
    id: 0,
    quantity: 0,
    useUnit: 0,
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
