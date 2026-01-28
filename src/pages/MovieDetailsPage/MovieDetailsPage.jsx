import { useEffect, useState, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { fetchMovieById } from "../../moviesService";

import MovieInfo from "../../components/MovieInfo/MovieInfo";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state);

  useEffect(() => {
    async function getMovieById() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMovieById(movieId);

        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieById();
  }, [movieId]);
  return (
    <div className={css.container}>
      <Link to={backLinkRef.current}>Go Back</Link>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movie && <MovieInfo movie={movie} />}
      <h2 className={css.additionInfo}>Addition information</h2>
      <ul>
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
}
