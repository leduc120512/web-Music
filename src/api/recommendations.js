import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8082/api/recommendations";

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const unwrapList = (response) => {
  const data = response?.data?.data ?? response?.data ?? null;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.users)) return data.users;
  return [];
};

const recommendationsApi = {
  getUsers: async (limit = 10) => {
    const response = await axios.get(`${API_BASE}/users`, {
      params: { limit },
      headers: getAuthHeader(),
    });
    return unwrapList(response);
  },
};

export default recommendationsApi;
