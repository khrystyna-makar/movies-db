import { Link } from "react-router-dom";
import styles from './MovieCard.module.scss'

interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    image?: string;
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    original_language?: string;
    original_title?: string;
    poster_path?: string;
    release_date?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export const MovieCard = ({ id, title, overview, popularity, image = "/movie-thumb.png" }: MovieCardProps) => {
    return (
        <div className={styles.card}>
            <img className={styles.thumbnail}
                src={image}
                alt="movie-thumb" />
            <div className={styles.content}>
                <div>
                    <Link to={`/movies/${id}`}>{title}</Link>
                </div>
                <div className={styles.overview}>{overview}</div>
                <div className={styles.popularity}>{popularity}</div>
            </div>
        </div>
    )
}