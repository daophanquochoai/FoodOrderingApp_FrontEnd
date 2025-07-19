// src/services/HttpService.ts
import axios, { AxiosInstance } from 'axios';
import { parseCookies, setCookie } from 'nookies';

class HttpService {
    protected entity: string;
    protected instance: AxiosInstance;

    constructor(entity: string) {
        this.entity = entity;
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });
        this.instance.interceptors.response.use((response) => response, this.handleError);
    }

    private async handleError(error: any) {
        let formatError = {};
        if (!error?.response) {
            // window.location.href = '/500';
        }
        if (error?.response) {
            const { data, status } = error.response;
            const isServer = typeof window === 'undefined';
            switch (status) {
                case 401:
                    if (!isServer) {
                        const cookies = parseCookies();
                        const refresh_token = cookies['refresh_token'];

                        try {
                            const response = await axios.post(
                                `${import.meta.env.VITE_BACKEND_URL}/auth/refreshToken`,
                                {
                                    refreshToken: refresh_token,
                                }
                            );
                            const accessToken = response.data.data.accessToken;
                            setCookie(null, 'token', accessToken, {
                                maxAge: 604800,
                                path: '/',
                            });
                            const newRequest = {
                                ...error.config,
                                headers: {
                                    ...error.config.headers,
                                    Authorization: 'Bearer ' + accessToken,
                                },
                            };
                            if (newRequest.url.includes('import')) {
                                newRequest.headers['Content-Type'] = 'multipart/form-data';
                            }
                            return await axios(newRequest);
                        } catch (error) {
                            if (error.response.status == 400 || error.response.status == 404) {
                                // BAD request
                                formatError = {
                                    status: error.response.status,
                                    message: error.response.data.message,
                                };
                                return Promise.reject(formatError);
                            } else {
                                // navigate to login
                                // window.location.href = '/500';
                                return;
                            }
                        }
                    }
                    break;
                case 503:
                    if (!isServer)
                        // navigate to 503
                        // window.location.href = '/500';
                        break;
                default:
                    break;
            }
            const { message, ...restData } = data;
            formatError = { message, status, ...restData };
        }

        // Aborted request case
        if (error?.code === 'ECONNABORTED') {
            formatError = { message: 'Request aborted', status: 'canceled' };
        }
        // For dev only
        return Promise.reject(formatError);
    }

    get = <T = any>(endpoint = '') => this.instance.get<T>(`/${this.entity}/${endpoint}`);

    getOne = <T = any>(id: number) => this.instance.get<T>(`/${this.entity}/${id}`);

    getList = <T = any>(params?: Record<string, any>) =>
        this.instance.get<T>(`/${this.entity}`, { params });

    post = <T = any>(data: any, endpoint = '') =>
        this.instance.post<T>(`/${this.entity}/${endpoint}`, data);

    put = <T = any>(id: string | number, data: any, path: string) =>
        this.instance.put<T>(`/${this.entity}/${path}/${id}`, data);

    patch = <T = any>(id: string | number, data: any) =>
        this.instance.patch<T>(`/${this.entity}/${id}`, data);

    delete = <T = any>(id: string | number) => this.instance.delete<T>(`/${this.entity}/${id}`);

    upload = <T = any>(data: FormData, endpoint = 'upload') =>
        this.instance.post<T>(`/${this.entity}/${endpoint}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
}

export default HttpService;
