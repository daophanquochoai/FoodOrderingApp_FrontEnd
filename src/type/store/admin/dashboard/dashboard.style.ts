export interface DashboardSlice {
    dashboardTotal: DashboardTotal | null;
    monthlyRevenue: MonthlyRevenue[];
    orderYears: OrderYear[];
    yearSelected: number | null;
    loading: boolean;
}

export interface DashboardTotal {
    totalRevenue: number;
    totalFoods: number;
    totalOrders: number;
    totalSupplier: number;
}

export interface MonthlyRevenue {
    month: number;
    year: number;
    revenue: number;
}

export interface OrderYear {
    year: number;
}