import { Filter } from '../../common';
import { HistoryImportOrExportDto } from '../history/history.style';

export interface IngredientSlice {
    ingredients: Ingredinets[];
    loadingPage: boolean;
    loadingComponent: boolean;
    loadingHistory: boolean;
    history: HistoryIngredient;
    filter: FilterIngredient;
    totalPPage: number;
    ingredientSelected: Ingredinets;
    filterHistory: FilterIngredientHistory;
}

export interface Ingredinets {
    id: number;
    name: string;
    unit: Unit.KG;
    lowThreshold: number;
    isActive: true;
}

export enum Unit {
    KG = 'KG',
}

export class FilterIngredient extends Filter {
    unit: Unit[];
    minThreshold: number;
    maxThreshold: number;
}

export class FilterIngredientHistory extends Filter {
    deep?: number;
    historyImportOrExportId?: number[];
    sourceId?: number[];
    inventory?: boolean;
    isActive?: boolean;
    ingredientsId?: number[];
    minPrice?: number;
    maxPrice?: number;
}

export interface HistoryIngredient {
    history: HistoryImportOrExportDto[];
    totalPage: number;
}
