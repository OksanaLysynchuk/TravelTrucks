import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";
import css from "./HomePage.module.css";
export const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNowClick = () => {
    navigate("/catalog");
  };
  return (
    <div className={css.container}>
      <Header />
      <div className={css.homepage}>
        <div className={css.main}>
          <div className={css.textcontainer}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.text}>
              You can find everything you want in our catalog
            </p>
          </div>
          <button onClick={handleViewNowClick} className={css.btn}>
            View Now
          </button>
        </div>
      </div>
    </div>
  );
};
