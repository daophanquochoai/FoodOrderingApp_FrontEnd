// src/services/HttpService.ts
import { deleteAllCookies, getCookies } from '@/utils/cookies/cookies';
import axios, { AxiosInstance } from 'axios';
import { setCookie } from 'nookies';
import type { ResponseType as AxiosResponseType } from 'axios';

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
            window.location.href = '500';
        }
        if (error?.response) {
            const { data, status } = error.response;
            const isServer = typeof window === 'undefined';
            switch (status) {
                case 401:
                    if (!isServer) {
                        const refresh_token_raw = getCookies('refresh_token');
                        const access_token_raw = getCookies('access_token');

                        const refresh_token = JSON.parse(refresh_token_raw);
                        const access_token = JSON.parse(access_token_raw);

                        if (
                            refresh_token == null ||
                            refresh_token == undefined ||
                            access_token == null ||
                            access_token == undefined
                        ) {
                            deleteAllCookies();
                            window.location.href = '/login';
                        }
                        try {
                            const response = await axios.post(
                                `${
                                    import.meta.env.VITE_BACKEND_URL
                                }/auth/refreshToken/${access_token}/${refresh_token}`
                            );
                            const accessToken = response.data.access_token;
                            const refreshToken = response.data.refresh_token;
                            setCookie(null, 'access_token', accessToken, {
                                maxAge: 604800,
                                path: '/',
                            });
                            setCookie(null, 'refresh_token', refreshToken, {
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
                                deleteAllCookies();
                                window.location.href = 'login';
                                return;
                            }
                        }
                    }
                    break;
                case 503:
                    if (!isServer) deleteAllCookies();
                    window.location.href = '500';
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

    get = <T = any>(
        endpoint: string,
        token?: string,
        params: Record<string, any> = {},
        responseType: AxiosResponseType = 'json'
    ) => {
        return this.instance.get<T>(endpoint, {
            params,
            responseType,
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
                'Content-Type': 'application/json',
            },
        });
    };

    getOne = <T = any>(id: number) => this.instance.get<T>(`/${this.entity}/${id}`);

    getList = <T = any>(params?: Record<string, any>) =>
        this.instance.get<T>(`/${this.entity}`, { params });

    post = <T = any>(data: any, endpoint = '', token?: string) =>
        this.instance.post<T>(`/${this.entity}/${endpoint}`, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
                'Content-Type': 'application/json',
            },
        });

    put = <T = any>(id: string | number, data: any, path: string, token?: string) =>
        this.instance.put<T>(`/${this.entity}/${path}/${id}`, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
                'Content-Type': 'application/json',
            },
        });

    patch = <T = any>(id: string | number, data: any) =>
        this.instance.patch<T>(`/${this.entity}/${id}`, data);

    delete = <T = any>(id: string | number) => this.instance.delete<T>(`/${this.entity}/${id}`);

    upload = <T = any>(data: FormData, endpoint = 'upload') =>
        this.instance.post<T>(`/${this.entity}/${endpoint}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
}

export default HttpService;
