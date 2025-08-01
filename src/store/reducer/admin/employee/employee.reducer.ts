import { initEmployeeSlice } from '@/defaultValue/admin/employee/employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'employee';

const employeeSlice = createSlice({
    name,
    initialState: initEmployeeSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.employee.loading = payload;
        },
        setEmployee(state, { payload }: PayloadAction<any>) {
            state.employee.data = payload;
        },
        setTotalEmploye(state, { payload }: PayloadAction<any>) {
            state.employee.totalPage = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setPage(state, { payload }: PayloadAction<any>) {
            state.filter.pageNo = payload;
        },
        setSelectEmployee(state, { payload }: PayloadAction<any>) {
            state.selectEmployee = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setAccount(state, { payload }: PayloadAction<any>) {
            state.account = payload;
        },
    },
});

export const { actions } = employeeSlice;
export default employeeSlice;
