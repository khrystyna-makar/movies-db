import { fetchNextPage } from "../../reducers/movies"
import { connect } from 'react-redux'
import { RootState } from "../../store"
import { MovieCard } from "./MovieCard"
import { useContext, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Container, Grid, LinearProgress, Typography } from "@mui/material"
import { AuthContext, anonymousUser } from "../../AuthContext"
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver"

const Movies = () => {

    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.movies.top);
    const loading = useAppSelector((state) => state.movies.loading);
    const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

    const { user } = useContext(AuthContext);
    const loggedIn = user != anonymousUser;

    const [targetRef, entry] = useIntersectionObserver();

    useEffect(() => {
        if (entry?.isIntersecting && hasMorePages) {
            debugger;
            dispatch(fetchNextPage());
        }
    }, [dispatch, entry?.isIntersecting, hasMorePages]);

    return (
        <Container sx={{ py: 8 }} maxWidth="lg">
            <Typography variant="h4" align="center">Now Playing</Typography>
            <Grid container spacing={4}>
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
            </Grid>
            <div ref={targetRef}>
                {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
            </div>
        </Container>
    )
}

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading
})

const connector = connect(mapStateToProps);

export default connector(Movies)