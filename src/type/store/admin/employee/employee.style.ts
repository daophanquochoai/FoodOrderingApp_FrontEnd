import { Filter } from '../../common';

export interface Employee {
    id?: number;
    name: string;
    cccd: string;
    isActive: boolean;
    password?: string;
    role?: Role;
    email: string;
    lastLogin?: String;
}

export interface Role {
    id?: number;
    roleName?: string;
}

export interface FilterEmployee extends Filter {
    email: string[];
    phoneNumber: string[];
    cccd: string[];
    isActiveEmploy: boolean[];
}

export enum ERole {
    ROLE_ADMIN,
    ROLE_CHEF,
    ROLE_SHIPPER,
    ROLE_WAREHOUSE,
}

export interface EmployeeSlice {
    employee: {
        data: Employee[];
        totalPage: number;
        loading: boolean;
    };
    account: Employee;
    filter: FilterEmployee;
    selectEmployee: Employee;
    loadingComponent: boolean;
}
