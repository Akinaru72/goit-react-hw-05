import { Link, NavLink, Outlet, useLocation, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { fetchMovieById } from "../../moviesService";

import MovieInfo from "../../components/MovieInfo/MovieInfo";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state);

  console.log("backLinkRef", backLinkRef);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);
  return (
    <div className={css.container}>
      <Link to={backLinkRef.current}>Go Back</Link>

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && <MovieInfo movie={movie} />}
      <ul>
        <h2 className={css.additionInfo}>Addition information</h2>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
