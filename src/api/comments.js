import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8082/api/comments";

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

const normalizeCommentPage = (response) => {
  const data = unwrapData(response) || {};
  return {
    items: Array.isArray(data.items) ? data.items : [],
    page: Number(data.page || 0),
    size: Number(data.size || 0),
    totalItems: Number(data.totalItems || 0),
    totalPages: Number(data.totalPages || 0),
    hasNext: Boolean(data.hasNext),
  };
};

const commentsApi = {
  getSongComments: (songId, page = 0, size = 10, replySize = 2) =>
    axios.get(`${API_BASE}/song/${songId}`, {
      params: { page, size, replySize },
      headers: getAuthHeader(),
    }),

  getSongCommentsPage: async (songId, page = 0, size = 10, replySize = 2) =>
    normalizeCommentPage(await commentsApi.getSongComments(songId, page, size, replySize)),

  getCommentReplies: (commentId, page = 0, size = 10) =>
    axios.get(`${API_BASE}/${commentId}/replies`, {
      params: { page, size },
      headers: getAuthHeader(),
    }),

  createSongComment: (songId, payload) =>
    axios.post(`${API_BASE}/song/${songId}`, payload, {
      headers: getAuthHeader(),
    }),

  replyComment: (commentId, payload) =>
    axios.post(`${API_BASE}/${commentId}/replies`, payload, {
      headers: getAuthHeader(),
    }),

  updateComment: (commentId, payload) =>
    axios.put(`${API_BASE}/${commentId}`, payload, {
      headers: getAuthHeader(),
    }),

  reportComment: (commentId, payload) =>
    axios.post(`${API_BASE}/${commentId}/report`, payload, {
      headers: getAuthHeader(),
    }),

  unwrapData,
  normalizeCommentPage,
};

export default commentsApi;

