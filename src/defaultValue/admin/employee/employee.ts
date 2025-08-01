import { filter } from '@/defaultValue/common';
import { EmployeeSlice, FilterEmployee } from '@/type/store/admin/employee/employee.style';

export const initFilterEmployee: FilterEmployee = {
    ...filter,
    email: null,
    phoneNumber: null,
    cccd: null,
    isActiveEmploy: null,
};

export const initEmployeeSlice: EmployeeSlice = {
    employee: {
        data: [],
        totalPage: 0,
        loading: false,
    },
    account : null,
    filter: initFilterEmployee,
    selectEmployee: null,
    loadingComponent: false,
};
