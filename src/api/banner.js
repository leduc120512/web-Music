import axios from "axios";
import Cookies from "js-cookie";

// ================== BASE URL ==================
const BANNER_API = "http://localhost:8082/api/banners";
const GENRE_API = "http://localhost:8082/api/genres";

// ================== AUTH ==================
const getTokenFromCookie = () => Cookies.get("token");

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
    },
});

// ================== API OBJECT ==================
const bannerApi = {
    // ================== BANNER ==================

    // PUBLIC: lấy tất cả banner
    fetchAllBanners: async () => {
        const res = await axios.get(`${BANNER_API}/public`);
        return res.data;
    },

    // PUBLIC: lấy banner theo ID
    getBannerById: async (id) => {
        const res = await axios.get(`${BANNER_API}/${id}`);
        return res.data;
    },

    // ADMIN: tạo banner
    createBanner: async (data) => {
        const res = await axios.post(
            `${BANNER_API}`,
            data,
            getAuthHeaders()
        );
        return res.data;
    },

    // ADMIN: cập nhật banner
    updateBanner: async (id, data) => {
        const res = await axios.put(
            `${BANNER_API}/${id}`,
            data,
            getAuthHeaders()
        );
        return res.data;
    },

    // ADMIN: xoá banner
    deleteBanner: async (id) => {
        const res = await axios.delete(
            `${BANNER_API}/${id}`,
            getAuthHeaders()
        );
        return res.data;
    },

    // ================== GENRE (GỘP) ==================

    // PUBLIC: lấy tất cả genre
    fetchAllGenres: async () => {
        const res = await axios.get(`${GENRE_API}/public`);
        return res.data;
    },

    // PUBLIC: lấy genre theo ID
    getGenreById: async (id) => {
        const res = await axios.get(`${GENRE_API}/${id}`);
        return res.data;
    },

    // ADMIN: tạo genre
    createGenre: async (data) => {
        const res = await axios.post(
            `${GENRE_API}`,
            data,
            getAuthHeaders()
        );
        return res.data;
    },

    // ADMIN: cập nhật genre
    updateGenre: async (id, data) => {
        const res = await axios.put(
            `${GENRE_API}/${id}`,
            data,
            getAuthHeaders()
        );
        return res.data;
    },

    // ADMIN: xoá genre
    deleteGenre: async (id) => {
        const res = await axios.delete(
            `${GENRE_API}/${id}`,
            getAuthHeaders()
        );
        return res.data;
    },
};

export default bannerApi;
