import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCampersThunk } from "../../redux/campersSlice";
import css from "./Filters.module.css";

export const Filters = ({ filters, onFilterChange }) => {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState([]);
  const [camperTypes, setCamperTypes] = useState([]);
  const [equipments, setEquipments] = useState([]);

  const equipmentIcons = {
    AC: "icon-ac",
    bathroom: "icon-shower",
    kitchen: "icon-cup",
    TV: "icon-tv",
    radio: "icon-radio",
    refrigerator: "icon-fridge",
    microwave: "icon-microwave",
    gas: "icon-gas",
    water: "icon-water",
  };

  const camperTypeIcons = {
    panelTruck: "icon-van",
    fullyIntegrated: "icon-fully-integrated",
    alcove: "icon-alcove",
  };

  const camperTypeName = {
    panelTruck: "Van",
    fullyIntegrated: "Fully Integrated",
    alcove: "Alcove",
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(
          "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
        );
        const data = await response.json();
        const uniqueLocations = [
          ...new Set(data.items.map((camper) => camper.location)),
        ];
        const uniqueTypes = [
          ...new Set(data.items.map((camper) => camper.form)),
        ];
        const uniqueEquipments = [
          "AC",
          "bathroom",
          "kitchen",
          "TV",
          "radio",
          "refrigerator",
          "microwave",
          "gas",
          "water",
        ];
        setLocations(uniqueLocations);
        setCamperTypes(uniqueTypes);
        setEquipments(uniqueEquipments);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleEquipmentChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange({ target: { name, value: checked } });
  };

  const handleTypeChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange({ target: { name, value: checked } });
  };

  const handleSearch = () => {
    dispatch(fetchCampersThunk({ filters, page: 1 }));
  };

  return (
    <div className={css.filters}>
      <div className={css.locationcontainer}>
        <label htmlFor="location" className={css.locationlabel}>
          Location
        </label>
        <div className={css.locationinput}>
          <svg width="20" height="20" className={css.locationicon}>
            <use href="/public/sprite.svg#icon-map"></use>
          </svg>

          <select
            name="location"
            id="location"
            value={filters.location}
            onChange={onFilterChange}
            className={`${css.locationselect} ${
              filters.location === "" ? css.placeholder : ""
            }`}
          >
            <option value="" className={css.locationoption}>
              City
            </option>
            {locations.map((location, index) => (
              <option
                key={index}
                value={location}
                className={css.locationoption}
              >
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className={css.text}>Filters</p>
      <div className={css.filtercontainer}>
        <div className={css.equipmentcontainer}>
          <label className={css.equipmentlabel}>Vehicle equipment</label>
          <div className={css.equipment}>
            {equipments.map((equipment, index) => (
              <div
                key={index}
                className={`equipmentcheckbox ${
                  filters[equipment] ? "active" : ""
                }`}
                style={{
                  width: "112px",
                  height: "96px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  letterSpacing: "-0.005em",
                  textAlign: "center",

                  borderRadius: "12px",
                  border: filters[equipment]
                    ? "1px solid #E44848"
                    : "1px solid #dadde1",
                }}
              >
                <input
                  type="checkbox"
                  id={equipment}
                  name={equipment}
                  checked={filters[equipment] || false}
                  onChange={handleEquipmentChange}
                  className={css.equipmentinput}
                />
                <label htmlFor={equipment} className={css.equipmentname}>
                  <span className={css.equipmenticon}>
                    <svg width="20" height="20" className={css.icon}>
                      <use
                        href={`/public/sprite.svg#${equipmentIcons[equipment]}`}
                      ></use>
                    </svg>
                  </span>
                  {equipment}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={css.typecontainer}>
          <label className={css.typelabel}>Vehicle type</label>
          <div className={css.type}>
            {camperTypes.map((type, index) => (
              <div
                key={index}
                className={`typecheckbox ${
                  filters.form === type ? "active" : ""
                }`}
                style={{
                  width: "112px",
                  height: "96px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  letterSpacing: "-0.005em",
                  textAlign: "center",

                  borderRadius: "12px",
                  border: filters.form
                    ? "1px solid #E44848"
                    : "1px solid #dadde1",
                }}
              >
                <input
                  type="checkbox"
                  id={type}
                  name={type}
                  checked={filters.form === type}
                  onChange={handleTypeChange}
                  className={css.typeinput}
                />
                <label htmlFor={type} className={css.typename}>
                  <span>
                    <svg width="20" height="20" className={css.typeicon}>
                      <use
                        href={`/public/sprite.svg#${camperTypeIcons[type]}`}
                      ></use>
                    </svg>
                  </span>
                  {camperTypeName[type]}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleSearch} className={css.searchbtn}>
        Search
      </button>
    </div>
  );
};
