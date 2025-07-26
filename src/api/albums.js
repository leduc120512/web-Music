import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8082/api/albums";

// 🔒 Hàm lấy token từ cookie
const getTokenFromCookie = () => {
    return Cookies.get("token"); // hoặc "access_token", tuỳ tên bạn đặt
};

// 📦 Hàm cấu hình headers
const getAuthHeaders = () => {
    const token = getTokenFromCookie();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// 📌 Lấy album mới nhất (có phân trang)
export const fetchLatestAlbums = async (page = 0, size = 20) => {
    const response = await axios.get(`${API_BASE_URL}/latest`, {
        params: { page, size },
    });
    return response.data;
};

// 🔍 Tìm kiếm album theo từ khóa
export const searchAlbums = async (keyword, page = 0, size = 20) => {
    const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { keyword, page, size },
    });
    return response.data;
};

// 📄 Lấy chi tiết 1 album theo ID
export const getAlbumById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, getAuthHeaders());
    return response.data;
};

// ➕ Tạo mới album
export const createAlbum = async (albumData) => {
    const response = await axios.post(`${API_BASE_URL}`, albumData, getAuthHeaders());
    return response.data;
};

// ✏️ Cập nhật album theo ID
export const updateAlbum = async (id, albumData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, albumData, getAuthHeaders());
    return response.data;
};

// ❌ Xoá album theo ID
export const deleteAlbum = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeaders());
    return response.data;
};
