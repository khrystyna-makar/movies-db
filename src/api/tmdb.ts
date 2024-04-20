import configuration from "../configuration";
import { MoviesFilters } from "../reducers/movies";

async function get<TBody>(relativeUrl: string): Promise<TBody> {
    const options = {
        method: 'GET', headers: {
            accept: 'application/json', 
            Authorization: `Bearer ${configuration.apiT}`
        }
    };

    const url = `${configuration.apiU}${relativeUrl}`;
    const response = await fetch(url, options);
    const json: TBody = await response.json();
    return json;
}

export interface MovieDetails {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    backdrop_path?: string;
}

interface PageResponse<TResult> {
    results: TResult[];
    page: number;
    total_pages: number;
}

interface PageDetails<TResult> {
    results: TResult[];
    page: number;
    totalPages: number;
}

interface Configuration {
    images: {
        base_url: string;
    }
}

export interface KeywordItem {
    id: number;
    name: string;
}

export const client = {
    async getConfiguration() {
        return get<Configuration>('/configuration');
    },
    async getMovies(page: number, filters: MoviesFilters) {
        const params = new URLSearchParams({
            page: page.toString()
        });
        if(filters.keywords){
            params.append("with_keywords", filters.keywords.join("|"))
        }
        const query = params.toString();
        const response = await get<PageResponse<MovieDetails>>(`/discover/movie?${query}`);
        return {
            results: response.results,
            page: response.page,
            totalPages: response.total_pages
        } 
    },
    async getNowPlaying(page: number = 1): Promise<PageDetails<MovieDetails>> {
        const response = await get<PageResponse<MovieDetails>>(`/movie/now_playing?page=${page}`);
        return {
            results: response.results,
            page: response.page,
            totalPages: response.total_pages
        } 
    },
    async getKeywords(query: string) {
        const response = await get<PageResponse<KeywordItem>>(`/search/keyword?query=${query}`);
        return response.results;
    }
}