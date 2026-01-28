import { useEffect, useState } from "react";
import { fetchMovies } from "../../moviesService";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./Homepage.module.css";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTraidingMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovies();
        console.log(data);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getTraidingMovies();
  }, []);
  return (
    <>
      <h1 className={css.title}>Trending movies</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />};
    </>
  );
}
