import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8082/api";

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const sanitizeArtistRequestPayload = (payload = {}) => {
  const reason = String(payload.reason || "").trim();
  const portfolioUrl = String(payload.portfolioUrl || "").trim();
  const normalized = { reason };

  // Send optional field only when it has a non-empty value.
  if (portfolioUrl) {
    normalized.portfolioUrl = portfolioUrl;
  }

  return normalized;
};

const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

const unwrapList = (response) => {
  const data = unwrapData(response);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

const normalizeArtistStatusForApi = (status = "PENDING") => {
  const value = String(status || "PENDING").toUpperCase();
  if (value === "RESOLVED") return "APPROVED";
  return value;
};

const moderationApi = {
  // User flows
  requestBecomeArtist: (payload) =>
    axios.post(`${API_BASE}/artist-requests/me`, sanitizeArtistRequestPayload(payload), {
      headers: getAuthHeader(),
    }),

  getMyArtistRequests: () =>
    axios.get(`${API_BASE}/artist-requests/me`, {
      headers: getAuthHeader(),
    }),

  cancelMyArtistRequest: (requestId) =>
    axios.put(`${API_BASE}/artist-requests/me/${requestId}/cancel`, null, {
      headers: getAuthHeader(),
    }),

  reportSongViolation: (songId, payload) =>
    axios.post(`${API_BASE}/song-violation-reports/songs/${songId}`, payload, {
      headers: getAuthHeader(),
    }),

  // Admin moderation list flows
  getArtistRequests: async (status = "PENDING") => {
    const normalizedStatus = normalizeArtistStatusForApi(status);
    const headers = getAuthHeader();
    const variants = [
      { status: normalizedStatus },
      { requestStatus: normalizedStatus },
      {},
    ];

    let lastError;
    for (const params of variants) {
      try {
        return await axios.get(`${API_BASE}/admin/moderation/artist-requests`, {
          params,
          headers,
        });
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  },

  getSongViolationReports: (status = "PENDING") =>
    axios.get(`${API_BASE}/admin/moderation/song-violation-reports`, {
      params: { status },
      headers: getAuthHeader(),
    }),

  getCommentReports: (status = "PENDING") =>
    axios.get(`${API_BASE}/admin/moderation/comment-reports`, {
      params: { status },
      headers: getAuthHeader(),
    }),

  // Admin moderation actions
  moderateArtistRequest: async (requestId, payload) => {
    const headers = getAuthHeader();
    const normalizedPayload = {
      ...payload,
      status: normalizeArtistStatusForApi(payload?.status),
    };

    try {
      return await axios.put(`${API_BASE}/admin/moderation/artist-requests/${requestId}`, normalizedPayload, {
        headers,
      });
    } catch (error) {
      // Some backends still use RESOLVED instead of APPROVED.
      if (normalizedPayload.status === "APPROVED") {
        return axios.put(
          `${API_BASE}/admin/moderation/artist-requests/${requestId}`,
          { ...normalizedPayload, status: "RESOLVED" },
          { headers }
        );
      }
      throw error;
    }
  },

  moderateSongViolationReport: (reportId, payload) =>
    axios.put(`${API_BASE}/admin/moderation/song-violation-reports/${reportId}`, payload, {
      headers: getAuthHeader(),
    }),

  resolveSongViolationAndHideSong: (reportId, adminNote = "") =>
    axios.put(`${API_BASE}/admin/moderation/song-violation-reports/${reportId}/resolve-hide-song`, null, {
      params: { adminNote },
      headers: getAuthHeader(),
    }),

  moderateCommentReport: (reportId, payload) =>
    axios.put(`${API_BASE}/admin/moderation/comment-reports/${reportId}`, payload, {
      headers: getAuthHeader(),
    }),

  // Response helpers
  unwrapData,
  unwrapList,
};

export default moderationApi;

