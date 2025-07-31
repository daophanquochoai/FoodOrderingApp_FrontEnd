import { name } from '@/store/reducer/admin/employee/employee.reducer';
import { EmployeeSlice } from '@/type/store/admin/employee/employee.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

export const selectFilter = createSelector(selectState, (state: EmployeeSlice) => state.filter);

export const selectEmployee = createSelector(selectState, (state: EmployeeSlice) => state.employee);

export const selectEmployeeSelected = createSelector(
    selectState,
    (state: EmployeeSlice) => state.selectEmployee
);

export const selectLoadingComponent = createSelector(
    selectState,
    (state: EmployeeSlice) => state.loadingComponent
);
