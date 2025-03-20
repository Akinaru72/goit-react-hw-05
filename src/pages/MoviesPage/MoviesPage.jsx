import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovieSearch } from "../../moviesService";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setPage(1);
      return;
    }

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMovieSearch(query, page);

        setMovies((prevMovies) =>
          page === 1 ? data.results : [...prevMovies, ...data.results]
        );
        setHasMore(page < data.total_pages);
      } catch (error) {
        setIsError(true);
        toast.error("Something went wrong! Try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedFetch = debounce(fetchMovies, 500);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [query, page]);

  const handleSearch = (event) => {
    const newQuery = event.target.value;

    setSearchParams({ query: newQuery });
    setPage(1);
    setMovies([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <input
        className={css.field}
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search movies..."
      />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}

      {movies.length > 0 && hasMore && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default MoviesPage;
