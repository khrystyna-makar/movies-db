import { ActionWithPayload, createReducer } from '../redux/utils'
import { AppThunk } from '../store';
import { client } from '../api/tmdb';

export interface Movie {
    id: number,
    title: string,
    popularity: number,
    overview: string,
    image?: string
}

interface MovieState {
    top: Movie[];
    loading: boolean;
    page: number;
    hasMorePages: boolean;
}

const initialState : MovieState = {
    top: [],
    loading: false,
    page: 0,
    hasMorePages: true
}

const moviesLoaded = (movies: Movie[], page: number, hasMorePages: boolean) => ({
    type: "movies/loaded",
    payload: {movies, page, hasMorePages}
})

const loading = () => ({
    type: "movies/loading"
})


export function fetchNextPage(): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        const nextPage = getState().movies.page + 1;
        dispatch(fetchPage(nextPage));
    }
}

function fetchPage(page: number): AppThunk<Promise<void>> {
    return async (dispatch) => {
        dispatch(loading());

        const config = await client.getConfiguration();
        const imageUrl = config.images.base_url;
        const nowPlaying = await client.getNowPlaying(page);

        const mappedResults: Movie[] = nowPlaying.results.map(m => ({
            id: m.id,
            title: m.title,
            overview: m.overview,
            popularity: m.popularity,
            image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined
        }))

        const hasMorePages = nowPlaying.page < nowPlaying.totalPages;

        dispatch(moviesLoaded(mappedResults, page, hasMorePages));
    }
}

const moviesReducer = createReducer<MovieState>(initialState, {
    "movies/loading": (state) => {
        return {
            ...state,
            loading: true
        }
    },
    "movies/loaded": (state, action: ActionWithPayload<{movies: Movie[], page: number, hasMorePages: boolean}>) => {
        return {
            ...state,
            top: [...state.top, ...action.payload.movies],
            page: action.payload.page,
            hasMorePages: action.payload.hasMorePages,
            loading: false
        }
    }
})

export default moviesReducer;