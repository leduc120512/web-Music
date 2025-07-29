// import axios from "axios";
// import Cookies from "js-cookie";
//
// const BASE_URL = "http://localhost:8082/api/songs";
// const PUBLIC_URL = `${BASE_URL}/public`;
//
// const getAuthHeader = () => {
//     const token = Cookies.get("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
// };
//
// const songApi = {
//     getLatestSongs: () =>
//         axios.get(`${BASE_URL}/latest`, {
//             headers: getAuthHeader(),
//         }),
//     getTop5List: () =>
//         axios.get(`${BASE_URL}/public/top5-playcount`, {
//             headers: getAuthHeader(),
//         }),
//     getActiveSongs: () =>
//         axios.get(`${BASE_URL}/public/active`, {
//             headers: getAuthHeader(),
//         }),
//
//     getPopularSongs: () =>
//         axios.get(`${BASE_URL}/popular`, {
//             headers: getAuthHeader(),
//         }),
//
//     getById: (id) =>
//         axios.get(`${BASE_URL}/${id}`, {
//             headers: getAuthHeader(),
//         }),
//
//
//     search: (keyword, page = 0, size = 20) =>
//         axios.get(`${BASE_URL}/search`, {
//             params: { keyword, page, size },
//             headers: getAuthHeader(),
//         }),
//
//     getByGenre: (genreName, page = 0, size = 20) =>
//         axios.get(`${BASE_URL}/genre/${genreName}`, {
//             params: { page, size },
//             headers: getAuthHeader(),
//         }),
//
//     // Public (không cần token)
//     getLatestSongsPublic: () => axios.get(`${PUBLIC_URL}/latest`),
//     getPopularSongsPublic: () => axios.get(`${PUBLIC_URL}/popular`),
//     getSongByIdPublic: (id) => axios.get(`${PUBLIC_URL}/${id}`),
//
//     // 🔹 Gợi ý 5 bài mới nhất và phổ biến
//     getLatestSuggestions: () => axios.get(`${PUBLIC_URL}/latest-suggestions`),
//     getPopularSuggestions: () => axios.get(`${PUBLIC_URL}/popular-suggestions`),
//
//     // CRUD
//     create: (songData) =>
//         axios.post(BASE_URL, songData, {
//             headers: getAuthHeader(),
//         }),
//
//     update: (id, songData) =>
//         axios.put(`${BASE_URL}/${id}`, songData, {
//             headers: getAuthHeader(),
//         }),
//
//     delete: (id) =>
//         axios.delete(`${BASE_URL}/${id}`, {
//             headers: getAuthHeader(),
//         }),
// };
//
// export default songApi;
// src/api/songApi.js

import axios from "axios";
import Cookies from "js-cookie";

// ✅ Base URL của API
const BASE_URL = "http://localhost:8082/api/songs";
const PUBLIC_URL = `${BASE_URL}/public`;

// ✅ Hàm tạo header nếu có token
const getAuthHeader = () => {
    const token = Cookies.get("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const songApi = {
    // 🔹 Lấy danh sách bài hát mới nhất (cần token)
    getLatestSongs: () =>
        axios.get(`${BASE_URL}/latest`, {
            headers: getAuthHeader(),
        }),

    // 🔹 Lấy top 5 bài có lượt phát cao nhất (public)
    getTop5List: () =>
        axios.get(`${PUBLIC_URL}/top5-playcount`, {
            headers: getAuthHeader(),
        }),

    // 🔹 Lấy danh sách bài hát đang active (public)
    getActiveSongs: () =>
        axios.get(`${PUBLIC_URL}/active`, {
            headers: getAuthHeader(),
        }),

    // 🔹 Lấy bài hát phổ biến (cần token)
    getPopularSongs: () =>
        axios.get(`${BASE_URL}/popular`, {
            headers: getAuthHeader(),
        }),

    // ✅ Lấy chi tiết bài hát (có hoặc không có token đều dùng 1 API)
    getById: (id) =>
        axios.get(`${BASE_URL}/${id}`, {
            headers: getAuthHeader(),
        }),

    // 🔍 Tìm kiếm bài hát
    search: (keyword, page = 0, size = 20) =>
        axios.get(`${BASE_URL}/search`, {
            params: { keyword, page, size },
            headers: getAuthHeader(),
        }),

    // 🔍 Lọc bài hát theo thể loại
    getByGenre: (genreName, page = 0, size = 20) =>
        axios.get(`${BASE_URL}/genre/${genreName}`, {
            params: { page, size },
            headers: getAuthHeader(),
        }),

    // ✅ Public API (không cần token)
    getLatestSongsPublic: () => axios.get(`${PUBLIC_URL}/latest`),
    getPopularSongsPublic: () => axios.get(`${PUBLIC_URL}/popular`),
    getSongByIdPublic: (id) => axios.get(`${PUBLIC_URL}/${id}`),

    // 🔹 Gợi ý bài hát mới và phổ biến
    getLatestSuggestions: () => axios.get(`${PUBLIC_URL}/latest-suggestions`),
    getPopularSuggestions: () => axios.get(`${PUBLIC_URL}/popular-suggestions`),

    // 📌 CRUD
    create: (songData) =>
        axios.post(`${BASE_URL}`, songData, {
            headers: getAuthHeader(),
        }),

    update: (id, songData) =>
        axios.put(`${BASE_URL}/${id}`, songData, {
            headers: getAuthHeader(),
        }),

    delete: (id) =>
        axios.delete(`${BASE_URL}/${id}`, {
            headers: getAuthHeader(),
        }),
};

export default songApi;
