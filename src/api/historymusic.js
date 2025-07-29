import axios from "axios";
import Cookies from "js-cookie";

const HISTORY_URL = "http://localhost:8082/api/history";

const getAuthHeader = () => {
    const token = Cookies.get("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const historyApi = {
    // Lấy danh sách bài hát đã nghe gần đây
    getRecentlyPlayed: (page = 0, size = 20) =>
        axios.get(`${HISTORY_URL}/recent`, {
            params: { page, size },
            headers: getAuthHeader(),
        }),

    // Đếm số lượt nghe của một bài hát cụ thể
    countPlaysBySong: (songId) =>
        axios.get(`${HISTORY_URL}/count/song/${songId}`, {
            headers: getAuthHeader(),
        }),

    // Đếm tổng số lượt nghe của người dùng hiện tại
    countPlaysByUser: () =>
        axios.get(`${HISTORY_URL}/count/user`, {
            headers: getAuthHeader(),
        }),

    // Xoá toàn bộ lịch sử nghe của người dùng
    clearUserHistory: () =>
        axios.delete(`${HISTORY_URL}/clear`, {
            headers: getAuthHeader(),
        }),

    // Xoá 1 bài hát khỏi lịch sử nghe của người dùng
    removeSongFromHistory: (songId) =>
        axios.delete(`${HISTORY_URL}/remove`, {
            params: { songId },
            headers: getAuthHeader(),
        }),

    // Cập nhật bài hát hoặc thời điểm đã nghe trong lịch sử
    updatePlayHistory: (historyId, newSongId = null, newPlayedAt = null) =>
        axios.put(`${HISTORY_URL}/update/${historyId}`, null, {
            params: {
                ...(newSongId && { newSongId }),
                ...(newPlayedAt && { newPlayedAt }),
            },
            headers: getAuthHeader(),
        }),
};

export default historyApi;
