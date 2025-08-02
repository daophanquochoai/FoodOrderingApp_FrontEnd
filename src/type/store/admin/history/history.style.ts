import { Ingredient } from '@/type/ingredient/ingredient';
import { Filter } from '../../common';
import { Ingredinets } from '../ingredients/ingredients.style';

export enum ETypeHistory {
    EXPORT,
    IMPORPT,
}

export enum EUnitType {
    KG,
}

export interface Source {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    link: string;
    taxCode: string;
    isActive: boolean;
}

export class HistoryImportOrExportDto {
    id: number;
    type: ETypeHistory;
    note: string;
    bathCode: string;
    source: string;
    isActive: boolean;
    historyIngredients: HistoryIngredientsDto[];
    createdAt: Date;
}
export class HistoryIngredientsDto {
    id: number;
    quantity: number;
    usedUnit: number;
    pricePerUnit: number;
    avgPrice: number;
    type: EUnitType;
    expiredTime: Date;
    isActive: boolean;
    ingredients: Ingredinets;
    errors: IngredientsErrorDto[];
    uses: IngredientsUseDto[];
}

export class IngredientsErrorDto {
    id: number;
    unit: EUnitType;
    quantity: number;
    reason: string;
    isActive: boolean;
    historyIngredients: HistoryIngredientsDto;
}
export class IngredientsUseDto {
    id: number;
    unit: EUnitType;
    quantity: number;
    orderItemId: number;
    isActive: boolean;
}

// ==================================== admin
export interface HistoryImportAdmin {
    id: number;
    type: ETypeHistory;
    note: string;
    bathCode: string;
    source: Source;
    isActive: boolean;
    historyIngredients: HistoryIngredientsDto[];
    createdAt: Date;
}

export interface FilterHistoryAdmin extends Filter {
    sourceId: number[];
    inventory: boolean;
    ingredientsId: number[];
    minPrice: number;
    maxPrice: number;
    historyImportOrExportId: number[];
    deep: number;
}

export interface HistoryImportAdminSlice {
    history: {
        data: HistoryImportAdmin[];
        loading: boolean;
        totalPage: number;
        filter: FilterHistoryAdmin;
    };
    selectedHistory: HistoryImportAdmin;
    loadingComponent: boolean;
    filterOption: {
        ingredient: Ingredient[];
        source: Source[];
    };
}
