
import axios from 'axios';
import { useState, useEffect } from 'react';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_image_service,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const useAxiosLoader = () => {
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let totalLoading = 0;

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            config => {
                ++totalLoading;
                setLoading(true);
                return config;
            },
            error => {
                --totalLoading;
                setLoading(false);
                return Promise.reject(error);
            }
        );
        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => {
                --totalLoading;
                totalLoading === 0 && setLoading(false);
                return response;
            },
            error => {
                --totalLoading;
                totalLoading === 0 && setLoading(false);
                return Promise.reject(error);
            }
        );
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return loading;
};

