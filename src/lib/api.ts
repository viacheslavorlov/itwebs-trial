import {
    ApiError,
    ApiListResponse,
    ApiResult,
    CommonQueryParams,
    Endpoint,
    Order,
    OrdersQueryParams,
    Product,
    ProductsQueryParams,
    Review,
    ReviewsQueryParams,
    User,
    UsersQueryParams
} from '@/app/types/api';
import axios, { AxiosError, AxiosResponse } from 'axios';


const BASE_URL = process.env.API_URL || 'https://fakeapi.net';

export async function fetchFromApi<T>(
    endpoint: Endpoint,
    params?: CommonQueryParams | ProductsQueryParams | OrdersQueryParams | ReviewsQueryParams
): Promise<ApiResult<T>> {
    try {
        const url = `${BASE_URL}${endpoint}`;

        const res: AxiosResponse<T> = await axios.get(url, {
            params,
            validateStatus: (status) => status < 500,
        });

        if (res.status >= 400) {
            const errorData = res.data as ApiError;
            console.error(`API Error ${res.status}:`, errorData.message);
            return { error: errorData.message || `HTTP Error ${res.status}` };
        }

        if (!res.data) {
            console.error('No data received from API');
            return { error: 'No data received' };
        }

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiError>;

            if (axiosError.response?.data?.message) {
                console.error('API Error:', axiosError.response.data.message);
                return { error: axiosError.response.data.message };
            }

            if (axiosError.code === 'NETWORK_ERROR') {
                console.error('Network error:', axiosError.message);
                return { error: 'Network connection failed' };
            }
        }

        console.error('Unexpected error:', error);
        return { error: 'An unexpected error occurred' };
    }
}

export const api = {
    products: {
        getAll: (params?: ProductsQueryParams) =>
            fetchFromApi<ApiListResponse<Product>>('/products', params),

        getById: (id: number) =>
            fetchFromApi<Product>(`/products/${id}`),

        getCategories: () =>
            fetchFromApi<string[]>('/products/categories'),

        getByCategory: (category: string) =>
            fetchFromApi<ApiListResponse<Product>>(`/products/category/${category}`),

        getReviews: (productId: number) =>
            fetchFromApi<ApiListResponse<Review>>(`/products/${productId}/reviews`),
    },

    users: {
        getAll: (params?: UsersQueryParams) =>
            fetchFromApi<ApiListResponse<User>>('/users', params),

        getById: (id: number) =>
            fetchFromApi<User>(`/users/${id}`),

        getOrders: (userId: number) =>
            fetchFromApi<ApiListResponse<Order>>(`/users/${userId}/orders`),
    },

    orders: {
        getAll: (params?: OrdersQueryParams) =>
            fetchFromApi<ApiListResponse<Order>>('/orders', params),

        getById: (id: number) =>
            fetchFromApi<Order>(`/orders/${id}`),
    },

    reviews: {
        getAll: (params?: ReviewsQueryParams) =>
            fetchFromApi<ApiListResponse<Review>>('/reviews', params),
    },
};
