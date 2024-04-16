import { FetchMovies, Movie } from "../reducers/movies"
import { connect } from 'react-redux'
import { RootState } from "../store"
import { MovieCard } from "./MovieCard"
import { useContext, useEffect } from "react"
import { useAppDispatch } from "../hooks"
import { Container, Grid, LinearProgress, Typography } from "@mui/material"
import { AuthContext, anonymousUser } from "../AuthContext"

interface MoviesProps {
    movies: Movie[],
    loading: boolean
}

const Movies = ({ movies, loading }: MoviesProps) => {

    const dispatch = useAppDispatch();

    const {user} = useContext(AuthContext);
    const loggedIn = user != anonymousUser;

    useEffect(() => {
        dispatch(FetchMovies())
    }, [dispatch]);

    return (
        <Container sx={{ py: 8 }} maxWidth="lg">
            <Typography variant="h4" align="center">Now Playing</Typography>
            {loading ? <LinearProgress color="secondary" /> :
                (<Grid container spacing={4}>
                    {movies.map(m => (
                        <Grid item key={m.id} xs={12} sm={6} md={4}>
                            <MovieCard
                                id={m.id}
                                key={m.id}
                                title={m.title}
                                overview={m.overview}
                                enableUserActions={loggedIn}
                                image={m.image}
                                popularity={m.popularity} />
                        </Grid>
                    ))}
                </Grid>)}
        </Container>
    )
}

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading
})

const connector = connect(mapStateToProps);

export default connector(Movies)