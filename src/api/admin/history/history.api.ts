import HttpService from '@/config/httpService';

class HistoryApi extends HttpService {
    getHistoryIngredientByFilter = (filter: any, token: string) => {
        return this.post(filter, 'all', token);
    };
    updateHistory = (id: any, token: string) => {
        return this.put(id, null, 'update', token);
    };
    addHistory = (data: any, token) => {
        return this.post(data, 'add', token);
    };
}

export const historyApi = new HistoryApi('history_import_or_export');
