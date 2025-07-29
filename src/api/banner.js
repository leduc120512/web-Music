// src/api/bannerApi.js
import axios from "axios";

const bannerApi = {
    getAll: () => axios.get("http://localhost:8082/api/banners"),
};

export default bannerApi;
