import { Filter } from '../../common';
import { HistoryIngredientsDto } from '../history/history.style';

export interface IngredientsErrorSlice {
    ingredientsError: IngredientsError[];
    historyIngredients: HistoryIngredientsDto[];
    loadingHistory: boolean;
    loadingPage: boolean;
    loadingComponent: boolean;
    filter: IngredientsErrorFilter;
    totalPage: number;
    ingredientsErrorSelected: IngredientsError | null;
}

export interface IngredientsError {
    id: string;
    reason: string;
    quantity: number;
    unit: Unit;
    isActive: boolean;
}

export enum Unit {
    KG = 'KG',
    G = 'G',
    L = 'L',
    ML = 'ML',
}

export class IngredientsErrorFilter extends Filter {
    unit?: Unit[];
    isActive: true;
    minQuantity?: number;
    maxQuantity?: number;
}