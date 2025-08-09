import HttpService from '@/config/httpService';

class DashboardApi extends HttpService {
    getDashboardTotal = (token: string) => {
        return this.get('/dashboard/get-total', token);
    };
    getMonthlyRevenue = (year: number, token: string) => {
        return this.get(`/dashboard/get-monthly-revenue/${year}`, token);
    };
    getOrderYears = (token: string) => {
        return this.get('/dashboard/get-years', token);
    };
}

export const dashboardApi = new DashboardApi('dashboard');