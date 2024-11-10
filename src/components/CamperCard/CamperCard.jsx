import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice";
import css from "./CamperCard.module.css";

export const CamperCard = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.id === camper.id);

  const handleShowMore = () => {
    navigate(`/catalog/${camper.id}`);
  };

  const favIconStyle = {
    isFavorite: { fill: "#E44848" },
    notFavorite: { fill: "#101828" },
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(camper.id));
    } else {
      dispatch(addToFavorites(camper));
    }
  };

  const equipmentList = Object.entries(camper)
    .filter(
      ([key, value]) =>
        value === true &&
        key !== "id" &&
        key !== "name" &&
        key !== "price" &&
        key !== "rating" &&
        key !== "location" &&
        key !== "description" &&
        key !== "gallery" &&
        key !== "reviews"
    )
    .map(([key]) => key);

  return (
    <div className={css.campercard}>
      <div className={css.card}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={css.img}
        />
        <div className={css.info}>
          <div className={css.cardheader}>
            <div className={css.cardtitle}>
              <h3 className={css.campername}>{camper.name}</h3>
              <div className={css.end}>
                <p className={css.camperprice}> €{camper.price}</p>
                <button onClick={toggleFavorite} className={css.favbtn}>
                  <svg
                    width="26"
                    height="24"
                    className={css.hearticon}
                    style={
                      isFavorite
                        ? favIconStyle.isFavorite
                        : favIconStyle.notFavorite
                    }
                  >
                    <use href="/public/sprite.svg#icon-heart"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={css.cardsubtitle}>
            <p className={css.camperrating}>
              {/* <svg
              width="26"
              height="24"
              className={css.staricon}
              // style={
              //   isFavorite ? favIconStyle.isFavorite : favIconStyle.notFavorite
              // }
            >
              <use href="/public/sprite.svg#icon-yellow-star"></use>
            </svg>{" "} */}
              {camper.rating}
            </p>
            <p className={css.camperlocation}>
              {" "}
              <svg width="20" height="20" className={css.locationicon}>
                <use href="/public/sprite.svg#icon-map"></use>
              </svg>{" "}
              {camper.location}
            </p>
          </div>
          <p>{camper.description.slice(0, 50)}...</p>{" "}
          <div className={css.camperequipment}>
            <ul className={css.equiplist}>
              {equipmentList.length > 0 ? (
                equipmentList.map((equipment, index) => (
                  <li key={index}>{equipment}</li>
                ))
              ) : (
                <li>No equipment available</li>
              )}
            </ul>
          </div>
          <button onClick={handleShowMore} className={css.showmore}>
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};
