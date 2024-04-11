import { Movie } from "../reducers/movies"
import { connect } from 'react-redux'
import { RootState } from "../store"
import { MovieCard } from "./MovieCard"
import './Movies.css'

interface MoviesProps {
    movies: Movie[]
}

const Movies = ({ movies }: MoviesProps) => {
    return (
        <section>
            <div className="movies-list">
                {movies.map(m => (
                    <MovieCard
                        id={m.id}
                        key={m.id}
                        title={m.title}
                        overview={m.overview}
                        popularity={m.popularity} />
                ))}
            </div>
        </section>
    )
}

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top
})

const connector = connect(mapStateToProps);

export default connector(Movies)