import HttpService from '@/config/httpService';

class CategoryApi extends HttpService {}

export const categoryApi = new CategoryApi('category');
