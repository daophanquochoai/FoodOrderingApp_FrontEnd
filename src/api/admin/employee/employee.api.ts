import HttpService from '@/config/httpService';

class EmployeeApi extends HttpService {
    getEmployeeByFilter = (fitler: any, token: string) => {
        return this.post(fitler, 'all', token);
    };
    createEmployee = (data: any, token: string) => {
        return this.post(data, 'add', token);
    };
    updateEmployee = (id: any, data: any, token: string) => {
        return this.put(id, data, 'update', token);
    };
    updatePasswrod = (id: any, token: string) => {
        return this.put(id, '@Hoai100303', 'update/password', token);
    };
}

export const employeeApi = new EmployeeApi('employee');
