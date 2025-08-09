import { DashboardSlice } from '@/type/store/admin/dashboard/dashboard.style';

export const dashboardInitialState: DashboardSlice = {
    dashboardTotal: null,
    monthlyRevenue: [],
    orderYears: [],
    yearSelected: null,
    loading: false,
};