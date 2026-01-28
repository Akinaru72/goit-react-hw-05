import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { fetchMovieSearch } from "../../moviesService";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [debounceQuery] = useDebounce(query, 500);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const changeSearchtext = (event) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("query", event.target.value);
    setSearchParams(nextParams);
  };

  const onClickLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (debounceQuery === "") {
      setMovies([]);
      setPage(1);
      return;
    }
    async function getSearchMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieSearch(debounceQuery, page);

        setMovies((prevMovies) =>
          page === 1 ? data.results : [...prevMovies, ...data.results],
        );

        setHasMore(page < data.total_pages);
        console.log(data, page);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getSearchMovie();
  }, [debounceQuery, page]);

  return (
    <div className={css.container}>
      <input
        className={css.field}
        type="text"
        value={query}
        onChange={changeSearchtext}
        placeholder="Search movies..."
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {hasMore && (
        <LoadMoreBtn onClick={onClickLoadMore} disabled={isLoading} />
      )}
    </div>
  );
}
