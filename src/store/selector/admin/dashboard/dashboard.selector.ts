import { name } from '@/store/reducer/admin/dashboard/dashboard.reducer';
import { DashboardSlice } from '@/type/store/admin/dashboard/dashboard.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

export const selectDashboardTotal = createSelector(
    selectState,
    (state: DashboardSlice) => state.dashboardTotal
);

export const selectMonthlyRevenue = createSelector(
    selectState,
    (state: DashboardSlice) => state.monthlyRevenue
);

export const selectOrderYears = createSelector(
    selectState,
    (state: DashboardSlice) => state.orderYears
);

export const selectLoading = createSelector(
    selectState,
    (state: DashboardSlice) => state.loading
);

export const selectYearSelected = createSelector(
    selectState,
    (state: DashboardSlice) => state.yearSelected
);