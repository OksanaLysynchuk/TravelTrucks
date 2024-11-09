// src/components/CampersList/CampersList.jsx
import { CamperCard } from "../CamperCard/CamperCard.jsx";

export const CampersList = ({ items }) => {
  return (
    <div className="camper-list">
      {items.length > 0 ? (
        items.map((camper) => <CamperCard key={camper.id} camper={camper} />)
      ) : (
        <p>No campers available.</p>
      )}
    </div>
  );
};
