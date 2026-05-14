import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8082/api/popup-ads";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const popupAdsApi = {
  getActive: () => axios.get(`${BASE_URL}/active`),
  getAll: () => axios.get(BASE_URL, { headers: getAuthHeaders() }),
  create: (formData) =>
    axios.post(BASE_URL, formData, {
      headers: getAuthHeaders(),
    }),
  update: (id, formData) =>
    axios.put(`${BASE_URL}/${id}`, formData, {
      headers: getAuthHeaders(),
    }),
  remove: (id) =>
    axios.delete(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    }),
};

export default popupAdsApi;
