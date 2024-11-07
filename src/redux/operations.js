// src/redux/operations.js
import axios from "axios";

const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

// Axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch campers with optional filtering

export const fetchCampers = async (filters = {}) => {
  console.log("Fetching campers with filters:", filters); // логуємо фільтри

  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== "" && value !== false
    )
  );

  const response = await api.get("/campers", { params: cleanFilters });
  console.log("API response:", response); // Перевірте повну відповідь від API

  return response.data; // повертаємо тільки data, якщо це масив кемперів
};

// Fetch camper details by ID
export const fetchCamperDetails = async (id) => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};
