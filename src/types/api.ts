
export interface CommonQueryParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
}


export type UsersQueryParams = CommonQueryParams;

export type ApiListResponse<T> = T[];

export interface Photo {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface User {
    id: number;
    email: string;
    username: string;
    name: string;

    address: {
        street: string;
        city: string;
        suite: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ApiError {
    error: string;
    message: string;
}


// Success/Error union type
export type ApiResult<T> = T | { error: string };

// Endpoint configuration
export type Endpoint =
    | '/photos'
    | `/photos/${number}`
    | '/users'
    | `/users/${number}`
    | `/users/${number}/posts`
    | '/posts'
    | `/posts/${number}`;