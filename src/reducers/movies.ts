import { Action, Reducer } from 'redux'
import { ActionWithPayload, createReducer } from '../redux/utils'

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
}

const initialState : MovieState = {
    top: [
        { id: 1, title: 'Inception', popularity: 98, overview: 'Dreams...'},
        { id: 2, title: 'The Godfather', popularity: 97, overview: 'Godfather...'},
        { id: 3, title: 'The Dark Knight', popularity: 96.5, overview: 'Batman...'},
        { id: 4, title: 'The Godfather Part II', popularity: 96, overview: 'Part II...'}
    ],
    loading: false
}

export const moviesLoaded = (movies: Movie[]) => ({
    type: "movies/loaded",
    payload: movies
})

export const moviesLoading = () => ({
    type: "movies/loading"
})

const moviesReducer = createReducer<MovieState>(initialState, {
    "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
        return {
            ...state,
            top: action.payload,
            loading: false
        }
    },
    "movies/loading": (state, action) => {
        return {
            ...state,
            loading: true
        }
    }
})

export default moviesReducer;