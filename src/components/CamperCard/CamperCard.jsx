// src/components/CamperCard/CamperCard.jsx
import { useNavigate } from "react-router-dom";

export const CamperCard = ({ camper }) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate(`/catalog/${camper.id}`); // Перенаправляємо на деталі кемпера
  };

  return (
    <div className="camper-card">
      <img src={camper.image} alt={camper.name} />
      <h3>{camper.name}</h3>
      <p>Rental Price: ${camper.price}</p>
      <button onClick={handleShowMore} className="btn-secondary">
        Show More
      </button>
    </div>
  );
};
