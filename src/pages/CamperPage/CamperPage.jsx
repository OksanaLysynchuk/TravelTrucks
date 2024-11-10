import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperByIdThunk } from "../../redux/campersSlice";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../components/Loader/Loader.jsx";

export const CamperPage = () => {
  const { camperId } = useParams();
  const dispatch = useDispatch();
  const { camperDetails, status, error } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    if (camperId) {
      dispatch(fetchCamperByIdThunk(camperId));
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
    </div>
  );
};
