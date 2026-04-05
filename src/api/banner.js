import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8082/api/banners";

const getTokenFromCookie = () => Cookies.get("token");

const getAuthHeaders = () => {
    const token = getTokenFromCookie();
    if (!token) {
        throw new Error("Token not found");
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const bannerApi = {
    // Public endpoint for homepage banner slider
    getPublic: () => axios.get(`${BASE_URL}/public`),

    // 📌 GET all banners
    getAll: () =>
        axios.get(BASE_URL, getAuthHeaders()),

    // 📌 GET banner by id
    getById: (id) =>
        axios.get(`${BASE_URL}/${id}`, getAuthHeaders()),

    // 📌 CREATE banner
    create: (formData) => {
        const auth = getAuthHeaders();
        return axios.post(BASE_URL, formData, {
            ...auth,
            headers: {
                ...auth.headers,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // 📌 UPDATE banner
    update: (id, formData) => {
        const auth = getAuthHeaders();
        return axios.put(`${BASE_URL}/${id}`, formData, {
            ...auth,
            headers: {
                ...auth.headers,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // 📌 DELETE banner
    remove: (id) =>
        axios.delete(`${BASE_URL}/${id}`, getAuthHeaders()),
};

export default bannerApi;
