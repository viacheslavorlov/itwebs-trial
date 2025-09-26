import {
    ApiError,
    ApiListResponse,
    ApiResult,
    CommonQueryParams,
    Endpoint,
    Photo,
    Posts,
    User,
    UsersQueryParams
} from '@/types/api';
import axios, { AxiosError, AxiosResponse } from 'axios';


const BASE_URL = process.env.API_URL || 'https://jsonplaceholder.typicode.com/';

export async function fetchFromApi<T>(
    endpoint: Endpoint,
    params?: CommonQueryParams
): Promise<ApiResult<T>> {
    try {
        const url = `${BASE_URL}${endpoint}`;

        const res: AxiosResponse<T> = await axios.get(url, {
            params,
            validateStatus: (status) => status < 500,
        });

        if (res.status >= 400) {
            const errorData = res.data as ApiError;
            console.error(`Ошибка API ${res.status}:`, errorData.message);
            return { error: errorData.message || `HTTP Error ${res.status}` };
        }

        if (!res.data) {
            console.error('Данные не получены от API');
            return { error: 'Данных не получено' };
        }

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiError>;

            if (axiosError.response?.data?.message) {
                console.error('Ошибка API:', axiosError.response.data.message);
                return { error: axiosError.response.data.message };
            }

            if (axiosError.code === 'NETWORK_ERROR') {
                console.error('Сетевая ошибка:', axiosError.message);
                return { error: 'Сетевая ошибка' };
            }
        }

        console.error('Непредвиденная ошибка:', error);
        return { error: 'Непредвиденная ошибка' };
    }
}

export const api = {
    photos: {
        getAll: (params?: CommonQueryParams) =>
            fetchFromApi<ApiListResponse<Photo>>('/photos', params),

        getById: (id: number) =>
            fetchFromApi<Photo>(`/photos/${id}`),

    },

    users: {
        getAll: (params?: UsersQueryParams) =>
            fetchFromApi<ApiListResponse<User>>('/users', params),

        getById: (id: number) =>
            fetchFromApi<User>(`/users/${id}`),
    },

    posts: {
        getAll: (params?: CommonQueryParams) =>
            fetchFromApi<ApiListResponse<Posts>>('/posts', params),

        getById: (id: number) =>
            fetchFromApi<Posts>(`/posts/${id}`),
    },


};
