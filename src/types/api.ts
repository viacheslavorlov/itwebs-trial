export interface ResourceBase {
    id: number;
    name: string;
    url: string;
    created: string;
}

export interface CharacterLocation {
    name: string;
    url?: string;
}

export interface Info {
    count: number; //total count of requestet objects
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface Character extends ResourceBase {
    status: 'Dead' | 'Alive' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: CharacterLocation;
    location: CharacterLocation;
    image: string;
    episode: string[];
}

export interface CharacterFilter {
    name?: string;
    type?: string;
    species?: string;
    status?: 'Dead' | 'Alive' | 'unknown';
    gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
    page?: number;
}

export interface CharacterListResponse {
    info: Info;
    results: Character[];
}

export interface Location extends ResourceBase {
    type?: string;
    dimension?: string;
    residents?: string[];
}

export interface LocationFilter {
    name?: string;
    type?: string;
    dimension?: string;
    page?: number;
}

export interface LocationListResponse {
    info: Info;
    results: Location[];
}

export interface Episode extends ResourceBase {
    air_date: string;
    episode: string;
    characters: string[];
}

export interface EpisodeFilter {
    name?: string;
    episode?: string;
    page?: number;
}

export interface EpisodeListResponse {
    info: Info;
    results: Episode[];
}

export interface ApiError {
    message: string;
    error: string;
}

export type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string; status?: number };