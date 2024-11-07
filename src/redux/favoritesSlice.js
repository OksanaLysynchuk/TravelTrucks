//src/redux/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite(state, action) {
      const camper = action.payload;
      if (!state.items.some((item) => item.id === camper.id)) {
        state.items.push(camper);
      }
    },
    removeFavorite(state, action) {
      const camperId = action.payload;
      state.items = state.items.filter((item) => item.id !== camperId);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
