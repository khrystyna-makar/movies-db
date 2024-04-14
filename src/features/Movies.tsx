import { Movie, moviesLoaded, moviesLoading } from "../reducers/movies"
import { connect, useDispatch } from 'react-redux'
import { RootState } from "../store"
import { MovieCard } from "./MovieCard"
import styles from './Movies.module.scss'
import { useEffect } from "react"
import { client } from "../api/tmdb"

interface MoviesProps {
    movies: Movie[],
    loading: boolean
}

const Movies = ({ movies, loading }: MoviesProps) => {

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadData() {
            dispatch(moviesLoading());

            const config = await client.getConfiguration();
            const imageUrl = config.images.base_url;
            const results =await client.getNowPlaying();

            const mappedResults: Movie[] = results.map(m => ({
                id: m.id,
                title: m.title,
                overview: m.overview,
                popularity: m.popularity,
                image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined

            }))

            dispatch(moviesLoaded(mappedResults))
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