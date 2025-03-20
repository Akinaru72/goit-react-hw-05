import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";
import clsx from "clsx";
const getLinkStyle = (isActive) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <div className={css.header}>
      <NavLink to="/" className={getLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getLinkStyle}>
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
