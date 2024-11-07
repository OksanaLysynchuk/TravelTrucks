// redux/campersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperDetails } from "./operations";

// Create async thunk for fetching campers
// src/redux/campersSlice.js
export const fetchCampersThunk = createAsyncThunk(
  "campers/fetchCampers",
  async ({ filters, page }) => {
    const response = await fetchCampers(filters, page);
    return {
      items: response.items,
      totalItems: response.totalItems, // Передаємо totalItems з відповіді
    };
  }
);

// Create async thunk for fetching camper details by ID
export const fetchCamperByIdThunk = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    const response = await fetchCamperDetails(id); // Викликаємо функцію fetchCamperDetails з API
    return response;
  }
);

// src/redux/campersSlice.js
const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    favorites: [],
    camperDetails: null,
    status: "idle",
    error: null,
    page: 1,
    totalItems: 0, // Додаємо totalItems
  },
  reducers: {
    // інші редюсери
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampersThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems; // Зберігаємо загальну кількість
      })
      .addCase(fetchCampersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite, addReview, bookCamper } =
  campersSlice.actions;

export default campersSlice.reducer;
