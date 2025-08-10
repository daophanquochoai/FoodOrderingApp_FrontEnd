import { name } from '@/store/reducer/admin/dashboard/dashboard.reducer';
import { createAction } from '@reduxjs/toolkit';

export const fetchDashboardTotal = createAction(`${name}/FETCH_TOTAL`, (state) => ({
    payload: state,
}));

export const fetchMonthlyRevenue = createAction<{ year: number }>(`${name}/FETCH_MONTHLY_REVENUE`);

export const fetchOrderYears = createAction(`${name}/FETCH_ORDER_YEARS`);

export const setYearSelected = createAction(`${name}/SET_YEAR_SELECTED`, (year) => ({
    payload: year,
}));

export const getSellFood = createAction(`${name}/TOP_SELL_FOOD`, (year) => ({
    payload : year
}))