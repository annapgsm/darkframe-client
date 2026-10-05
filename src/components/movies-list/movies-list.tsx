import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import type { RootState } from "../../redux/store";
import "./movies-list.scss";

type MoviesListProps = {
  favoriteMovies?: string[];
  onAddFavorite?: (movieId: string) => void; //receives a movie ID, does something, returning value is not of importance
};

export const MoviesList = ({ favoriteMovies, onAddFavorite } : MoviesListProps) => {    
    const movies = useSelector((state: RootState) => state.movies.movies.list);
    const filter = useSelector((state: RootState) => state.movies.movies.filter).trim().toLowerCase();  
    const filteredMovies = movies.filter(
        (movie) =>
        !filter ||
        (movie.Title && movie.Title.toLowerCase().includes(filter))
    );

    return (
        <>
            <Row>
                {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4 mt-2" key={movie._id} xs={12} sm={6}md={3}>
                            <MovieCard 
                            movie={movie}
                            onAddFavorite={onAddFavorite}
                            favoriteMovies={favoriteMovies || []} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};

