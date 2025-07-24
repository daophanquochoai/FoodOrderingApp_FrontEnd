import { Ingredinets } from '../ingredients/ingredients.style';

export enum ETypeHistory {
    EXPORT,
    IMPORPT,
}

export enum EUnitType {
    KG,
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
