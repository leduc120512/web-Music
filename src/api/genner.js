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

// ==================================================
// ================== BANNER API ====================
// ==================================================

// PUBLIC
export const fetchAllBanners = async () => {
    const response = await axios.get(`${BANNER_API}/public`);
    return response.data;
};

export const getBannerById = async (id) => {
    const response = await axios.get(`${BANNER_API}/${id}`);
    return response.data;
};

// ADMIN
export const createBanner = async (data) => {
    const response = await axios.post(
        `${BANNER_API}`,
        data,
        getAuthHeaders()
    );
    return response.data;
};

export const updateBanner = async (id, data) => {
    const response = await axios.put(
        `${BANNER_API}/${id}`,
        data,
        getAuthHeaders()
    );
    return response.data;
};

export const deleteBanner = async (id) => {
    const response = await axios.delete(
        `${BANNER_API}/${id}`,
        getAuthHeaders()
    );
    return response.data;
};

// ==================================================
// ================== GENRE API (GỘP) ================
// ==================================================

// PUBLIC
export const fetchAllGenres = async () => {
    const response = await axios.get(`${GENRE_API}/public`);
    return response.data;
};

export const getGenreById = async (id) => {
    const response = await axios.get(`${GENRE_API}/${id}`);
    return response.data;
};

// ADMIN
export const createGenre = async (data) => {
    const response = await axios.post(
        `${GENRE_API}`,
        data,
        getAuthHeaders()
    );
    return response.data;
};

export const updateGenre = async (id, data) => {
    const response = await axios.put(
        `${GENRE_API}/${id}`,
        data,
        getAuthHeaders()
    );
    return response.data;
};

export const deleteGenre = async (id) => {
    const response = await axios.delete(
        `${GENRE_API}/${id}`,
        getAuthHeaders()
    );
    return response.data;
};
const bannerApi = {
    fetchAllBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
};

export default bannerApi;
