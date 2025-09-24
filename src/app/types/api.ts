
export interface CommonQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    searchFields?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface ProductsQueryParams extends CommonQueryParams {
    category?: string;
    price?: string;
    brand?: string;
    stock?: number | boolean;
}

export interface OrdersQueryParams extends CommonQueryParams {
    status?: string;
    userId?: number;
}

export interface ReviewsQueryParams extends CommonQueryParams {
    productId?: number;
    userId?: number;
    rating?: number;
}

export type UsersQueryParams = CommonQueryParams;

export interface ApiListResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    stock: number;
    image: string;
    specs: {
        color: string;
        weight: string;
        storage: string;
    };
    rating: {
        rate: number;
        count: number;
    };
}

export interface User {
    id: number;
    email: string;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        street: string;
        city: string;
        zipcode: string;
        country: string;
    };
    phone: string;
    orders: number[];
}

export interface Order {
    id: number;
    userId: number;
    products: Array<{
        productId: number;
        quantity: number;
    }>;
    totalAmount: number;
    status: string;
    orderDate: string;
    deliveryDate: string;
}

export interface Review {
    id: number;
    productId: number;
    userId: number;
    rating: number;
    title: string;
    content: string;
    date: string;
}

export interface ApiError {
    error: string;
    message: string;
}


// Success/Error union type
export type ApiResult<T> = T | { error: string };

// Endpoint configuration
export type Endpoint =
    | '/products'
    | '/products/categories'
    | `/products/category/${string}`
    | `/products/${number}`
    | `/products/${number}/reviews`
    | '/users'
    | `/users/${number}`
    | `/users/${number}/orders`
    | '/orders'
    | `/orders/${number}`
    | '/reviews';