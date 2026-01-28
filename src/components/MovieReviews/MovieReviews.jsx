import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../moviesService";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

const IMG_URL = "https://image.tmdb.org/t/p/w200";
const DEFAULT_IMG = "https://ui-avatars.com/api/?name=User&size=128";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setMovie(data);
        console.log(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);
  const reviews = movie ? movie.results : [];
  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews &&
        reviews.map(({ id, author, content, author_details }) => (
          <article key={id}>
            <h3 className={css.reviewTitle}>{`Author: ${author}`}</h3>
            <div className={css.reviewContentWrapper}>
              <img
                className={css.reviewImage}
                src={
                  author_details.avatar_path
                    ? author_details.avatar_path.startsWith("/https")
                      ? author_details.avatar_path.slice(1)
                      : IMG_URL + author_details.avatar_path
                    : DEFAULT_IMG
                }
                alt={`${author} avatar`}
              />
              <div className={css.reviewContent}>
                <p className={css.reviewRating}>
                  Rating:
                  <span className={css.reviewRatingValue}>
                    {author_details.rating ? author_details.rating : "N/A"}
                  </span>
                </p>
                <p className={css.reviewDescription}>{content}</p>
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
