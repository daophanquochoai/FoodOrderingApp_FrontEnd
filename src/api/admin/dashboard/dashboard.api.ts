import HttpService from '@/config/httpService';

class DashboardApi extends HttpService {
    getDashboardTotal = (year: any, token: string) => {
        return this.get(`/dashboard/get-total/${year}`, token);
    };
    getMonthlyRevenue = (year: number, token: string) => {
        return this.get(`/dashboard/get-monthly-revenue/${year}`, token);
    };
    getOrderYears = (token: string) => {
        return this.get('/dashboard/get-years', token);
    };
    getSellFood = (year : string, token : string) => {
        return this.get(`/dashboard/get-sell-food/${year}`, token);
    }
}

export const dashboardApi = new DashboardApi('dashboard');
