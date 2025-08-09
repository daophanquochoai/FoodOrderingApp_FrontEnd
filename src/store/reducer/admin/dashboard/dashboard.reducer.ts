import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dashboardInitialState } from '@/defaultValue/admin/dashboard/dashboard';

export const name = 'dashboard';

const DashboardSlice = createSlice({
    name,
    initialState: dashboardInitialState,
    reducers: {
        setDashboardTotal(state, { payload }: PayloadAction<any>) {
            state.dashboardTotal = payload;
        },
        setDashboardLoading(state, { payload }: PayloadAction<boolean>) {
            state.loading = payload;
        },
        setMonthlyRevenue(state, { payload }: PayloadAction<any>) {
            state.monthlyRevenue = payload;
        },
        setOrderYears(state, { payload }: PayloadAction<any>) {
            state.orderYears = payload;
        },
        setYearSelected(state, { payload }: PayloadAction<any>) {
            state.yearSelected = payload;
        }
    }
});

export const { actions } = DashboardSlice;
export default DashboardSlice;