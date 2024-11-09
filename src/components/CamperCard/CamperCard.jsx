import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice"; // Замість цього шляху імпортуйте свою логіку
import css from "./CamperCard.module.css";

export const CamperCard = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // Стан обраних кемперів

  const isFavorite = favorites.some((fav) => fav.id === camper.id); // Перевірка, чи кемпер вже в обраному

  const handleShowMore = () => {
    navigate(`/catalog/${camper.id}`); // Перенаправляємо на деталі кемпера
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(camper.id)); // Видалити з обраного
    } else {
      dispatch(addToFavorites(camper)); // Додати в обране
    }
  };

  // Створення короткого опису для устаткування
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
      <img
        src={camper.gallery[0]?.thumb}
        alt={camper.name}
        className={css.img}
      />
      <h3>{camper.name}</h3>
      <p>Rental Price: ${camper.price}</p>
      <button onClick={toggleFavorite} className={css.favbtn}>
        <svg width="26" height="24" className={css.icon}>
          <use href="/public/sprite.svg#icon-heart"></use>
        </svg>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <p>Rating: {camper.rating} / 5</p>
      <p>Location: {camper.location}</p>
      <p>{camper.description.slice(0, 100)}...</p>{" "}
      {/* Відображення зкороченого опису */}
      <div className={css.camperequipment}>
        <h4>Equipment:</h4>
        <ul>
          {equipmentList.length > 0 ? (
            equipmentList.map((equipment, index) => (
              <li key={index}>{equipment}</li>
            ))
          ) : (
            <li>No equipment available</li>
          )}
        </ul>
      </div>
      <div className={css.campertype}>
        <h4>Type: {camper.form}</h4>
      </div>
      <button onClick={handleShowMore} className={css.showmore}>
        Show More
      </button>
    </div>
  );
};
