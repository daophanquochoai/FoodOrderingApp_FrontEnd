import { Account, Address, FilterAddress } from '@/type/store/client/account/account.style';

export const initAddress: Address = {
    id: 0,
    province: '',
    commune: '',
    address: '',
    isDefault: false,
    isActive: false,
    phoneNumber: '',
    name: '',
};

export const filterAddress: FilterAddress = {
    pageNo: 0,
    pageSize: 10,
    search: '',
    sort: 'desc',
    order: 'id',
    userId: 7,
    isActive: true,
};

export const initAccount: Account = {
    info: null,
    address: {
        data: [],
        loading: false,
        totalPage: 0,
        filter: filterAddress,
    },
    loading: false,
    loadingComponent: false,
};
