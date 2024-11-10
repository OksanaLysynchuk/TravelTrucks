import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperDetails } from "./operations";

export const fetchCampersThunk = createAsyncThunk(
  "campers/fetchCampers",
  async ({ filters, page }) => {
    const response = await fetchCampers(filters, page);
    return {
      items: response.items,
      totalItems: response.totalItems,
    };
  }
);

export const fetchCamperByIdThunk = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    const response = await fetchCamperDetails(id);
    return response;
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    favorites: [],
    camperDetails: null,
    status: "idle",
    error: null,
    page: 1,
    totalItems: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampersThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
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
