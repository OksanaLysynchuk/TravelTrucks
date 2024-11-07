// import { useDispatch, useSelector } from "react-redux";
// import { fetchCampers } from "../store/campersSlice";
// import CamperCard from "../components/CamperCard";
// import { useEffect } from "react";

// export const CatalogList = () => {
//   const dispatch = useDispatch();
//   const campers = useSelector((state) => state.campers.items);
//   const status = useSelector((state) => state.campers.status);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCampers());
//     }
//   }, [status, dispatch]);

//   return (
//     <div className="camper-list">
//       {campers.map((camper) => (
//         <CamperCard key={camper.id} camper={camper} />
//       ))}
//     </div>
//   );
// };

//---------------------------------------------------------
