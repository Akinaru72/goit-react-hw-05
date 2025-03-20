import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.title}>
      <h1 className={css.titleH}>404</h1>
      <p className={css.text}>
        Page not found. Please follow this <Link to="/">link</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
