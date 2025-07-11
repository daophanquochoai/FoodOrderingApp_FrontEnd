// src/utils/http.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_REFRESH_URL}`,
                    {
                        refreshToken,
                    }
                );

                const newAccessToken = res.data?.accessToken;
                localStorage.setItem('access_token', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return http(originalRequest);
            } catch (refreshError) {
                window.location.href = '/login';
            }
        }

        if (status === 500) {
            window.location.href = '/500';
        }

        if (status === 503) {
            window.location.href = '/maintenance';
        }

        return Promise.reject(error.response?.data || error);
    }
);

export default http;
