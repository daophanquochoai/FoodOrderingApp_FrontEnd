import HttpService from '@/config/httpService';

class CategoryApi extends HttpService {
    createCategory = (data: any) => {
        return this.post(data, 'add');
    };
    updateCategory = (data: any) => {
        return this.put(data?.id, data, 'update');
    };
}

export const categoryApi = new CategoryApi('category');
