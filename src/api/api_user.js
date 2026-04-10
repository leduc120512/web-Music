// src/api/userApi.js
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8082/api/auth";

// ✅ Hàm tiện ích để lấy Authorization header từ Cookie
const getAuthHeader = () => {
    const token = Cookies.get("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const isFormData = (value) => typeof FormData !== "undefined" && value instanceof FormData;

const toSignupFormData = (payload = {}) => {
    if (isFormData(payload)) return payload;

    const form = new FormData();
    const fields = ["username", "email", "fullName", "password", "gender", "avatar"];
    fields.forEach((key) => {
        const val = payload[key];
        if (val !== undefined && val !== null && val !== "") {
            form.append(key, val);
        }
    });
    return form;
};

const userApi = {
    // 🔹 Đăng nhập + lưu token vào Cookie
    signin: async (credentials) => {
        const res = await axios.post(`${BASE_URL}/signin`, credentials);
        const { data } = res.data;

        if (data?.accessToken) {
            Cookies.set("token", data.accessToken); // ✅ Lưu token vào cookie
        }

        return res.data;
    },

    // 🔹 Đăng ký tài khoản (multipart/form-data)
    signup: (data) => {
        const formData = toSignupFormData(data);
        return axios.post(`${BASE_URL}/signup`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    // 🔹 Lấy thông tin người dùng hiện tại
    getMe: () =>
        axios.get(`${BASE_URL}/me`, {
            headers: getAuthHeader(),
        }),

    // 🔹 Cập nhật thông tin user hiện tại
    updateMe: (data) =>
        axios.put(`${BASE_URL}/update`, data, {
            headers: {
                ...getAuthHeader(),
                ...(isFormData(data) ? { "Content-Type": "multipart/form-data" } : {}),
            },
        }),

    // 🔹 Xoá user hiện tại
    deleteMe: () =>
        axios.delete(`${BASE_URL}/delete`, {
            headers: getAuthHeader(),
        }),

    // ---------- ADMIN CRUD ----------
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
            headers: {
                ...getAuthHeader(),
                ...(isFormData(data) ? { "Content-Type": "multipart/form-data" } : {}),
            },
        }),

    deleteUserById: (id) =>
        axios.delete(`${BASE_URL}/users/${id}`, {
            headers: getAuthHeader(),
        }),

    // ---------- Upload avatar ----------
    updateUserWithAvatar: (id, formData) =>
        axios.put(`${BASE_URL}/users/${id}/avatar`, formData, {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        }),

    // ---------- Lịch sử đăng nhập ----------
    // 🔸 Lấy lịch sử đăng nhập của chính mình
    getMyLogins: (page = 0, size = 20) =>
        axios.get(`${BASE_URL}/me/logins?page=${page}&size=${size}`, {
            headers: getAuthHeader(),
        }),

    // 🔸 (Admin) Lấy lịch sử đăng nhập của user khác
    getUserLogins: (userId, page = 0, size = 20) =>
        axios.get(`${BASE_URL}/users/${userId}/logins?page=${page}&size=${size}`, {
            headers: getAuthHeader(),
        }),

    // 🔹 Đăng xuất: xoá token
    logout: () => Cookies.remove("token"),
};

export default userApi;
