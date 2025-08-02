// songApi.js
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Base URL cho tất cả các API liên quan đến bài hát
const BASE_URL = "http://localhost:8082/api/songs";
const PUBLIC_URL = `${BASE_URL}/public`;

/**
 * ✅ Lấy token từ cookie và trả về header Authorization
 */
const getAuthHeader = () => {
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTc1NDExNTYxNCwiZXhwIjoxNzU0MjAyMDE0fQ.ouuLXAxQGG8eaykgrEkxr61J1claPCZexgW5_mshk-RYIacE8hOeeaTxXDmyNxo_qSNktVXtp5Y1ftzNR-ufGw"; // test tạm
    return { Authorization: `Bearer ${token}` };
};

/**
 * ✅ Headers cho FormData khi upload file
 */
const getFormHeaders = (data) => {
    return data instanceof FormData
        ? { "Content-Type": "multipart/form-data", ...getAuthHeader() }
        : getAuthHeader();
};

/**
 * ✅ Các hàm gọi API bài hát
 */
const songApi = {
    // 🔥 Lấy danh sách bài hát phổ biến (có xác thực)
    getPopularSongs: () =>
        axios.get(`${BASE_URL}/popular`, {
            headers: getAuthHeader(),
        }),

    // 📥 Lấy danh sách bài hát mới nhất (có xác thực)
    getLatestSongs: () =>
        axios.get(`${BASE_URL}/latest`, {
            headers: getAuthHeader(),
        }),

    // 🔍 Tìm kiếm bài hát theo từ khóa
    search: (keyword, page = 0, size = 20) =>
        axios.get(`${BASE_URL}/search`, {
            params: { keyword, page, size },
            headers: getAuthHeader(),
        }),

    // 🔍 Tìm bài hát theo thể loại
    getByGenre: (genreName, page = 0, size = 20) =>
        axios.get(`${BASE_URL}/genre/${genreName}`, {
            params: { page, size },
            headers: getAuthHeader(),
        }),

    // 🎧 Lấy chi tiết bài hát theo ID
    getById: (id) =>
        axios.get(`${BASE_URL}/${id}`, {
            headers: getAuthHeader(),
        }),

    // 💡 Gợi ý tìm kiếm theo từ khóa (public)
    searchSuggestions: (keyword) =>
        axios.get(`${PUBLIC_URL}/search-suggestions`, {
            params: { keyword },
        }),

    // 🎧 API công khai không cần xác thực
    getLatestSongsPublic: () => axios.get(`${PUBLIC_URL}/latest`),
    getPopularSongsPublic: () => axios.get(`${PUBLIC_URL}/popular`),
    getActiveSongs: () => axios.get(`${PUBLIC_URL}/active`),
    getLatestSuggestions: () => axios.get(`${PUBLIC_URL}/latest-suggestions`),
    getTop5List: () => axios.get(`${PUBLIC_URL}/top5-playcount`),

    // ✏️ Tạo mới bài hát (form-data)
    create: (songData) =>
        axios.post(`${BASE_URL}`, songData, {
            headers: getFormHeaders(songData),
        }),

    // ✏️ Cập nhật bài hát (form-data)
    update: (id, songData) =>
        axios.put(`${BASE_URL}/${id}`, songData, {
            headers: getFormHeaders(songData),
        }),

    // ❌ Xóa bài hát
    delete: (id) =>
        axios.delete(`${BASE_URL}/${id}`, {
            headers: getAuthHeader(),
        }),
};

export default songApi;
