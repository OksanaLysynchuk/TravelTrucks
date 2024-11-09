import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload); // Додаємо кемпера в обране
    },
    removeFromFavorites: (state, action) => {
      return state.filter((camper) => camper.id !== action.payload); // Видаляємо кемпера з обраного
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
