import { fetchMovieReviews } from "../../moviesService";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./MovieReviews.module.css";

const IMG_URL = "https://image.tmdb.org/t/p/w200";
const DEFAULT_IMG = "https://via.placeholder.com/50?text=No+Image";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results || []);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {reviews.length > 0
        ? reviews.map(({ id, author, content, author_details }) => (
            <article key={id}>
              <h3 className={css.reviewTitle}>{`Author: ${author}`}</h3>
              <div className={css.reviewContentWrapper}>
                <img
                  className={css.reviewImage}
                  src={
                    author_details.avatar_path
                      ? IMG_URL + author_details.avatar_path
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
          ))
        : !isLoading &&
          !error && <p className={css.reviewTitle}>No reviews available.</p>}
    </div>
  );
};

export default MovieReviews;
