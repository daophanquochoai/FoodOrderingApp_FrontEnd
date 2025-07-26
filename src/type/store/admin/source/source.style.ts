import { Filter, PageObject } from '../../common';

export interface Source {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    link: string;
    taxCode: string;
    isActive: boolean;
    createdAt: Date;
}

export interface FilterSource extends Filter {}

export interface SourceSlice {
    sources: PageObject<Source>;
    filter: FilterSource;
    selectedFood: Source;
    loadingComponent: boolean;
}
