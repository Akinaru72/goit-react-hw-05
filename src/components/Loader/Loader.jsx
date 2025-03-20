import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.container}>
      <ClipLoader className={css.loader} color="#36d7b7" />
    </div>
  );
};

export default Loader;
