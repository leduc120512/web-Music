import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8082/api";

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const unwrapApiResponseData = (response) => response?.data?.data;

const getPageContent = (response) => {
  const data = unwrapApiResponseData(response);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
};

const artistApi = {
  // Public endpoints
  getProfilePublic: (artistId) =>
    axios.get(`${API_BASE}/artists/${artistId}/profile`),

  getNewsPublic: (artistId, page = 0, size = 10) =>
    axios.get(`${API_BASE}/artists/${artistId}/news`, {
      params: { page, size },
    }),

  getNewsDetailPublic: (artistId, newsId) =>
    axios.get(`${API_BASE}/artists/${artistId}/news/${newsId}`),

  // Artist studio endpoints (require Bearer token)
  getMyProfile: () =>
    axios.get(`${API_BASE}/artist-studio/me/profile`, {
      headers: getAuthHeader(),
    }),

  updateMyProfile: (payload) =>
    axios.put(`${API_BASE}/artist-studio/me/profile`, payload, {
      headers: getAuthHeader(),
    }),

  getMyNews: (page = 0, size = 10) =>
    axios.get(`${API_BASE}/artist-studio/me/news`, {
      params: { page, size },
      headers: getAuthHeader(),
    }),

  createMyNews: (payload) =>
    axios.post(`${API_BASE}/artist-studio/me/news`, payload, {
      headers: getAuthHeader(),
    }),

  updateMyNews: (newsId, payload) =>
    axios.put(`${API_BASE}/artist-studio/me/news/${newsId}`, payload, {
      headers: getAuthHeader(),
    }),

  deleteMyNews: (newsId) =>
    axios.delete(`${API_BASE}/artist-studio/me/news/${newsId}`, {
      headers: getAuthHeader(),
    }),

  // Response helpers
  unwrapData: unwrapApiResponseData,
  unwrapPageContent: getPageContent,
};

export default artistApi;

