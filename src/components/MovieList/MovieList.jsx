import { Link, useLocation } from "react-router";
import css from "./MovieList.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log("MovieList", location);

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`} state={location}>
          <li className={css.item}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
              className={css.image}
            />
            <p>{movie.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default MovieList;
