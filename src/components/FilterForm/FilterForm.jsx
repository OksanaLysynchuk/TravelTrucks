// src/components/FilterForm/FilterForm.jsx
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setType,
  toggleAmenity,
} from "../../redux/filtersSlice.js";
import { fetchCampersThunk } from "../../redux/campersSlice.js";

const FilterForm = () => {
  const dispatch = useDispatch();

  // Get the current filter state (assuming filters are in the Redux state)
  const filters = useSelector((state) => state.filters);

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "location") {
      dispatch(setLocation(value));
    } else if (name === "type") {
      dispatch(setType(value));
    } else if (type === "checkbox") {
      dispatch(toggleAmenity(name)); // Toggle the amenity by its name
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass filters as an argument to fetch filtered campers
    dispatch(fetchCampersThunk(filters));
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      {/* Add filter fields with appropriate names and onChange handlers */}
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleFilterChange}
      />
      <select name="type" onChange={handleFilterChange}>
        <option value="">Select Type</option>
        <option value="campervan">Campervan</option>
        <option value="motorhome">Motorhome</option>
      </select>
      <label>
        <input type="checkbox" name="AC" onChange={handleFilterChange} />
        Air Conditioning
      </label>
      {/* Add other filter fields here */}
      <button type="submit" className="btn-primary">
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
