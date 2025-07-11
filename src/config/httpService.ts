// src/services/HttpService.ts
import http from './http';

class HttpService {
    protected entity: string;

    constructor(entity: string) {
        this.entity = entity;
    }

    get = <T = any>(endpoint = '') => http.get<T>(`/${this.entity}/${endpoint}`);

    getOne = <T = any>(id: number) => http.get<T>(`/${this.entity}/${id}`);

    getList = <T = any>(params?: Record<string, any>) => http.get<T>(`/${this.entity}`, { params });

    post = <T = any>(data: any, endpoint = '') => http.post<T>(`/${this.entity}/${endpoint}`, data);

    put = <T = any>(id: string | number, data: any) => http.put<T>(`/${this.entity}/${id}`, data);

    patch = <T = any>(id: string | number, data: any) =>
        http.patch<T>(`/${this.entity}/${id}`, data);

    delete = <T = any>(id: string | number) => http.delete<T>(`/${this.entity}/${id}`);

    upload = <T = any>(data: FormData, endpoint = 'upload') =>
        http.post<T>(`/${this.entity}/${endpoint}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
}

export default HttpService;
