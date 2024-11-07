// src/pages/CamperPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperByIdThunk } from "../../redux/campersSlice"; // імпортуємо екшн для завантаження даних кемпера
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../components/Loader/Loader.jsx";

export const CamperPage = () => {
  const { camperId } = useParams(); // Отримуємо ID кемпера з параметрів URL
  const dispatch = useDispatch();
  const { camperDetails, status, error } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    if (camperId) {
      dispatch(fetchCamperByIdThunk(camperId)); // Перевіряємо, чи є camperId перед тим, як робити запит
    }
  }, [dispatch, camperId]);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="camper-details">
      <h2>{camperDetails?.name}</h2>
      <img src={camperDetails?.image} alt={camperDetails?.name} />
      <p>{camperDetails?.description}</p>
      <p>Price: ${camperDetails?.price}</p>
      {/* Інші деталі кемпера */}
    </div>
  );
};
