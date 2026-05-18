import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8082/api/favorite-albums";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
};

const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

const favoriteAlbumsApi = {
  getMine: async () => {
    const response = await axios.get(`${BASE_URL}/my`, { headers: getAuthHeaders() });
    const data = unwrapData(response);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    return [];
  },

  getById: async (albumId) => {
    const response = await axios.get(`${BASE_URL}/${albumId}`, { headers: getAuthHeaders() });
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await axios.post(BASE_URL, payload, { headers: getAuthHeaders() });
    return unwrapData(response);
  },

  update: async (albumId, payload) => {
    const response = await axios.put(`${BASE_URL}/${albumId}`, payload, { headers: getAuthHeaders() });
    return unwrapData(response);
  },

  remove: async (albumId) => {
    const response = await axios.delete(`${BASE_URL}/${albumId}`, { headers: getAuthHeaders() });
    return unwrapData(response);
  },

  addSong: async (albumId, songId) => {
    const response = await axios.post(`${BASE_URL}/${albumId}/songs/${songId}`, null, {
      headers: getAuthHeaders(),
    });
    return unwrapData(response);
  },

  removeSong: async (albumId, songId) => {
    const response = await axios.delete(`${BASE_URL}/${albumId}/songs/${songId}`, {
      headers: getAuthHeaders(),
    });
    return unwrapData(response);
  },
};

export default favoriteAlbumsApi;
