import { filter } from '@/defaultValue/common';
import { FilterSource, Source, SourceSlice } from '@/type/store/admin/source/source.style';

const initSource: Source = {
    id: 0,
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    link: '',
    taxCode: '',
    isActive: null,
    createdAt: null,
};

const initFilter: FilterSource = filter;

export const initSourceSlice: SourceSlice = {
    sources: {
        data: null,
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilter,
    selectedFood: initSource,
    loadingComponent: false,
};
