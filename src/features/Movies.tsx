import { FetchMovies, Movie } from "../reducers/movies"
import { connect } from 'react-redux'
import { RootState } from "../store"
import { MovieCard } from "./MovieCard"
import styles from './Movies.module.scss'
import { useEffect } from "react"
import { useAppDispatch } from "../hooks"

interface MoviesProps {
    movies: Movie[],
    loading: boolean
}

const Movies = ({ movies, loading }: MoviesProps) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function loadData() {
            dispatch(FetchMovies())
        }
        loadData();
    }, [dispatch]);

    return (
        <section>
            <div className={styles.list}>
                {loading ? <h3>Loading...</h3> :

                movies.map(m => (
                    <MovieCard
                        id={m.id}
                        key={m.id}
                        title={m.title}
                        overview={m.overview}
                        image={m.image}
                        popularity={m.popularity} />
                ))}
            </div>
        </section>
    )
}

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading
})

const connector = connect(mapStateToProps);

export default connector(Movies)