import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8082/api/auth";

// ✅ Hàm tiện ích dùng chung để lấy token từ Cookie
const getAuthHeader = () => {
    const token = Cookies.get("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const userApi = {
    // 🔹 Đăng nhập + lưu token vào Cookies
    signin: async (credentials) => {
        const res = await axios.post(`${BASE_URL}/signin`, credentials);
        const { data } = res.data;

        if (data?.accessToken) {
            Cookies.set("token", data.accessToken); // ✅ lưu token vào cookie
        }

        return res.data;
    },

    // 🔹 Đăng ký tài khoản
    signup: (data) =>
        axios.post(`${BASE_URL}/signup`, data),

    // 🔹 Lấy thông tin người dùng hiện tại
    getMe: () =>
        axios.get(`${BASE_URL}/me`, {
            headers: getAuthHeader(),
        }),

    // 🔹 Cập nhật thông tin user hiện tại
    updateMe: (data) =>
        axios.put(`${BASE_URL}/update`, data, {
            headers: getAuthHeader(),
        }),

    // 🔹 Xoá user hiện tại
    deleteMe: () =>
        axios.delete(`${BASE_URL}/delete`, {
            headers: getAuthHeader(),
        }),

    // 🔹 ADMIN CRUD
    getAllUsers: () =>
        axios.get(`${BASE_URL}/users`, {
            headers: getAuthHeader(),
        }),

    getUserById: (id) =>
        axios.get(`${BASE_URL}/users/${id}`, {
            headers: getAuthHeader(),
        }),

    updateUserById: (id, data) =>
        axios.put(`${BASE_URL}/users/${id}`, data, {
            headers: getAuthHeader(),
        }),

    deleteUserById: (id) =>
        axios.delete(`${BASE_URL}/users/${id}`, {
            headers: getAuthHeader(),
        }),

    // 🔹 Đăng xuất: xoá token
    logout: () => Cookies.remove("token"),
};

export default userApi;
