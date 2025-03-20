import { fetchMovieCredits } from "../../moviesService";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./MovieCast.module.css";

const IMG_URL = "https://image.tmdb.org/t/p/w200";
const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCredits(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  const cast = movie?.cast || [];

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      <ul className={css.cardList}>
        {cast.length > 0
          ? cast.map(({ id, name, character, profile_path }) => (
              <li className={css.cardItem} key={id}>
                <img
                  className={css.actorImage}
                  src={profile_path ? IMG_URL + profile_path : defaultImg}
                  alt={name}
                />
                <p className={css.actorName}>{name}</p>
                <p className={css.actorRole}>{character || "Unknown Role"}</p>
              </li>
            ))
          : !isLoading &&
            !error && (
              <p className={css.noCast}>No cast information available.</p>
            )}
      </ul>
    </div>
  );
};

export default MovieCast;
