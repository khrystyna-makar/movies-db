import { Link } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
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

export const MovieCard = ({id, title, overview, popularity}: MovieCardProps) => {
    return (
        <div className="movies-card">
            <Link to={`/movies/${id}`}>{title}</Link>
            <div className="movies-card-overview">{overview}</div>
            <div className="movies-card-pop">{popularity}</div>
        </div>
    )
}