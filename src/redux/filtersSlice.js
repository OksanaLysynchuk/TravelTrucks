//src/redux/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    type: "",
    amenities: {
      AC: false,
      kitchen: false,
      bathroom: false,
    },
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    toggleAmenity(state, action) {
      const amenity = action.payload;
      state.amenities[amenity] = !state.amenities[amenity];
    },
    resetFilters(state) {
      state.location = "";
      state.type = "";
      Object.keys(state.amenities).forEach((key) => {
        state.amenities[key] = false;
      });
    },
  },
});

export const { setLocation, setType, toggleAmenity, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
