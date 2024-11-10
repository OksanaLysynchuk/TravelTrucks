import axios from "axios";

const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCampers = async (filters = {}, page = 1) => {
  const itemsPerPage = 4;
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== "" && value !== false && value != null
    )
  );

  const response = await api.get("/campers", {
    params: { ...cleanFilters, page, limit: itemsPerPage },
  });

  return response.data;
};

export const fetchCamperDetails = async (id) => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};
