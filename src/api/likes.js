import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8082/api/likes";

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const likesApi = {
  likeSong: (songId) =>
    axios.post(`${BASE_URL}/${songId}`, null, {
      headers: getAuthHeader(),
    }),

  unlikeSong: (songId) =>
    axios.delete(`${BASE_URL}/${songId}`, {
      headers: getAuthHeader(),
    }),

  getLikeStatus: (songId) =>
    axios.get(`${BASE_URL}/status/${songId}`, {
      headers: getAuthHeader(),
    }),

  getMyLikedSongs: (page = 0, size = 20) =>
    axios.get(`${BASE_URL}/my`, {
      params: { page, size },
      headers: getAuthHeader(),
    }),

  getSongLikeCount: (songId) =>
    axios.get(`${BASE_URL}/song/${songId}/count`),
};

export default likesApi;

