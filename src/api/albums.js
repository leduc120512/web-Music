// src/api/albums.js
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8082/api/albums";

// 🔒 Lấy JWT token từ cookie
const getTokenFromCookie = () => {
    return Cookies.get("token"); // hoặc đổi thành "access_token" nếu bạn dùng tên khác
};

// 📦 Header có Bearer token
const getAuthHeaders = () => {
    const token = getTokenFromCookie();
    if (!token) {
        throw new Error("Token not found. Please login again.");
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// 📌 Lấy danh sách album mới nhất
const fetchLatestAlbums = async (page = 0, size = 20) => {
    const response = await axios.get(`${API_BASE_URL}/latest`, {
        params: { page, size },
    });
    return response.data;
};

// 🔍 Tìm kiếm album theo từ khóa
const searchAlbums = async (keyword, page = 0, size = 20) => {
    const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { keyword, page, size },
    });
    return response.data;
};

// 📄 Lấy album theo ID
const getAlbumById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, getAuthHeaders());
    return response.data;
};

// ➕ Tạo album mới
const createAlbum = async (albumData) => {
    const response = await axios.post(`${API_BASE_URL}`, albumData, getAuthHeaders());
    return response.data;
};

// ✏️ Cập nhật album
const updateAlbum = async (id, albumData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, albumData, getAuthHeaders());
    return response.data;
};

// ❌ Xoá album
const deleteAlbum = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeaders());
    return response.data;
};

// ✅ Export theo 2 cách
export {
    fetchLatestAlbums,
    searchAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
};

// ✅ Export default để dùng import albums from ...
export default {
    fetchLatestAlbums,
    searchAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
};
