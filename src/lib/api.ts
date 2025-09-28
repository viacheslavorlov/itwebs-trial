import { ApiResponse, ApiError, CharacterFilter, CharacterListResponse, Character, LocationFilter, LocationListResponse, EpisodeFilter, EpisodeListResponse, Episode } from "@/types/api";
import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

class ApiClient {
    private async makeRequest<T>(url: string, params?: any): Promise<ApiResponse<T>> {
        try {
            const response = await axios.get<T>(url, {
                params,
                validateStatus: (status) => status < 500,
            });

            if (response.status >= 400) {
                const errorData = response.data as unknown as ApiError;
                return {
                    success: false,
                    error: errorData.message || `HTTP Error ${response.status}`,
                    status: response.status,
                };
            }

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ApiError>;

                if (axiosError.response?.data?.message) {
                    return {
                        success: false,
                        error: axiosError.response.data.message,
                        status: axiosError.response.status,
                    };
                }

                if (axiosError.code === 'NETWORK_ERROR' || axiosError.code === 'ECONNREFUSED') {
                    return {
                        success: false,
                        error: 'Network error: Unable to connect to API',
                    };
                }
            }

            return {
                success: false,
                error: 'Unexpected error occurred',
            };
        }
    }

    // ============ CHARACTER ENDPOINTS ============
    async getCharacters(params?: CharacterFilter): Promise<ApiResponse<CharacterListResponse>> {
        return this.makeRequest<CharacterListResponse>(`${BASE_URL}/character`, params);
    }

    async getCharacter(id: number): Promise<ApiResponse<Character>> {
        return this.makeRequest<Character>(`${BASE_URL}/character/${id}`);
    }

    async getLocations(params?: LocationFilter): Promise<ApiResponse<LocationListResponse>> {
        return this.makeRequest<LocationListResponse>(`${BASE_URL}/location`, params);
    }

    async getLocation(id: number): Promise<ApiResponse<Location>> {
        return this.makeRequest<Location>(`${BASE_URL}/location/${id}`);
    }

    async getEpisodes(params?: EpisodeFilter): Promise<ApiResponse<EpisodeListResponse>> {
        return this.makeRequest<EpisodeListResponse>(`${BASE_URL}/episode`, params);
    }

    async getEpisode(id: number): Promise<ApiResponse<Episode>> {
        return this.makeRequest<Episode>(`${BASE_URL}/episode/${id}`);
    }

    async getMultipleCharacters(ids: number[]): Promise<ApiResponse<Character[]>> {
        return this.makeRequest<Character[]>(`${BASE_URL}/character/${ids.join(',')}`);
    }

    async getMultipleEpisodes(ids: number[]): Promise<ApiResponse<Episode[]>> {
        return this.makeRequest<Episode[]>(`${BASE_URL}/episode/${ids.join(',')}`);
    }

    async getMultipleLocations(ids: number[]): Promise<ApiResponse<Location[]>> {
        return this.makeRequest<Location[]>(`${BASE_URL}/location/${ids.join(',')}`);
    }
}

export const api = {
    characters: {
        getAll: (params?: CharacterFilter) =>
            new ApiClient().getCharacters(params),
        getById: (id: number) =>
            new ApiClient().getCharacter(id),
        getMultiple: (ids: number[]) =>
            new ApiClient().getMultipleCharacters(ids),
    },

    locations: {
        getAll: (params?: LocationFilter) =>
            new ApiClient().getLocations(params),
        getById: (id: number) =>
            new ApiClient().getLocation(id),
        getMultiple: (ids: number[]) =>
            new ApiClient().getMultipleLocations(ids),
    },

    episodes: {
        getAll: (params?: EpisodeFilter) =>
            new ApiClient().getEpisodes(params),
        getById: (id: number) =>
            new ApiClient().getEpisode(id),
        getMultiple: (ids: number[]) =>
            new ApiClient().getMultipleEpisodes(ids),
    },
};