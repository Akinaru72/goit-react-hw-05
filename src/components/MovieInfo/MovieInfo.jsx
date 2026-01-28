import css from "./MovieInfo.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieInfo({
  movie: { backdrop_path, title, vote_average, overview, genres },
}) {
  const score = vote_average ? Math.round(vote_average * 10) : "N/A";
  return (
    <div className={css.contentWrapper}>
      <img
        className={css.posterImg}
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
            : defaultImg
        }
        alt={title}
      />
      <div className={css.content}>
        <p className={css.contentTitle}>{title}</p>
        <span className={css.score}>User Score: {score}%</span>
        <span className={css.overviewTitle}>Overview</span>
        <p className={css.overviewText}>{overview}</p>
        <span className={css.genresTitle}>Genres</span>
        <p className={css.genresText}>
          {genres && genres.length > 0
            ? genres.map((genre) => genre.name).join(", ")
            : "No genres available"}
        </p>
      </div>
    </div>
  );
}
