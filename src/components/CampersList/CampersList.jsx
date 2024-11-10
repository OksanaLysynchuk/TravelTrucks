import { CamperCard } from "../CamperCard/CamperCard.jsx";
import css from "./CampersList.module.css";

export const CampersList = ({ items }) => {
  return (
    <div className={css.camperlist}>
      {items.length > 0 ? (
        items.map((camper) => <CamperCard key={camper.id} camper={camper} />)
      ) : (
        <p>No campers available.</p>
      )}
    </div>
  );
};
