import { useEffect, useState } from "react";
import { fetchMovieCredits } from "../../moviesService";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCredits(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  const cast = movie ? movie.cast : [];
  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <ul className={css.cardList}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li className={css.cardItem} key={id}>
              <img
                className={css.actorImage}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : defaultImg
                }
                alt={name}
              />
              <p className={css.actorName}>{name}</p>
              <p className={css.actorRole}>{character || "Unknown Role"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
