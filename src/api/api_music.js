// songApi.js
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Base URL cho tất cả các API liên quan đến bài hát
const BASE_URL = "http://localhost:8082/api/songs";
const PUBLIC_URL = `${BASE_URL}/public`;
const DETAIL_CACHE_TTL_MS = 4000;
const publicSongDetailCache = new Map();

/**
 * ✅ Lấy token từ cookie và trả về header Authorization
 */
const getAuthHeader = () => {
    const token = Cookies.get("token"); // 🔥 Lấy token từ cookie
    if (!token) {
        console.warn("⚠️ Không tìm thấy token trong cookie!");
        return {};
    }
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

const unwrapSongList = (response) => {
    const data = response?.data?.data ?? response?.data ?? null;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.items)) return data.items;
    return [];
};

const readSongArtistId = (song) =>
    song?.artistId ?? song?.idartist ?? song?.artist?.id ?? song?.artist?.artistId ?? null;

const byArtistId = (artistId, song) => String(readSongArtistId(song)) === String(artistId);
const hasToken = () => Boolean(Cookies.get("token"));

/**
 * ✅ Các hàm gọi API bài hát
 */
const songApi = {
    // 🔥 Lấy danh sách bài hát phổ biến (có xác thực)
    getPopularSongs: () =>
        axios.get(`${BASE_URL}/popular`, { headers: getAuthHeader() }),

    // 📥 Lấy danh sách bài hát mới nhất (có xác thực)
    getLatestSongs: () =>
        axios.get(`${BASE_URL}/latest`, { headers: getAuthHeader() }),

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
        axios.get(`${BASE_URL}/${id}`, { headers: getAuthHeader() }),

    // 🎧 Chi tiết bài hát public cho người dùng chưa đăng nhập
    getByIdPublic: (id) =>
        axios.get(`${PUBLIC_URL}/find-by-id`, { params: { id } }),

    // 🎧 Dung cache ngan de tranh goi API detail lap tuc 2 lan
    getByIdPublicCached: async (id) => {
        const cacheKey = String(id);
        const now = Date.now();
        const cacheItem = publicSongDetailCache.get(cacheKey);

        if (cacheItem && now - cacheItem.at < DETAIL_CACHE_TTL_MS) {
            return cacheItem.response;
        }

        const response = await axios.get(`${PUBLIC_URL}/find-by-id`, { params: { id } });
        publicSongDetailCache.set(cacheKey, { at: now, response });
        return response;
    },

    // 💡 Gợi ý tìm kiếm theo từ khóa (public)
    searchSuggestions: (keyword) =>
        axios.get(`${PUBLIC_URL}/search-suggestions`, { params: { keyword } }),

    // 🎧 API công khai không cần xác thực
    getLatestSongsPublic: () => axios.get(`${PUBLIC_URL}/latest`),
    getPopularSongsPublic: () => axios.get(`${PUBLIC_URL}/popular`),
    getActiveSongs: () => axios.get(`${PUBLIC_URL}/active`),
    getLatestSuggestions: () => axios.get(`${PUBLIC_URL}/latest-suggestions`),
    getTop5List: () => axios.get(`${PUBLIC_URL}/top5-playcount`),

    // 🎧 Lấy bài hát theo album theo hướng guest-safe (ưu tiên public endpoint)
    getSongsByAlbumPublic: async (albumId) => {
        if (albumId === undefined || albumId === null || albumId === "") return [];

        const publicCandidates = [
            { url: `${PUBLIC_URL}/by-album/${albumId}` },
            { url: `${PUBLIC_URL}/by-album`, params: { albumId } },
            { url: `${PUBLIC_URL}/album/${albumId}` },
            { url: `${PUBLIC_URL}/find-by-album`, params: { albumId } },
        ];

        for (const candidate of publicCandidates) {
            try {
                const response = await axios.get(candidate.url, { params: candidate.params });
                const songs = unwrapSongList(response);
                if (songs.length > 0) return songs;
            } catch (error) {
                // Try next public candidate.
            }
        }

        if (!hasToken()) {
            return [];
        }

        try {
            const protectedRes = await axios.get(`${BASE_URL}/by-album/${albumId}`, { headers: getAuthHeader() });
            return unwrapSongList(protectedRes);
        } catch (error) {
            return [];
        }
    },

    // 🎧 Lấy danh sách bài hát public theo nghệ sĩ (kèm fallback endpoint)
    getSongsByArtistPublic: async (artistId) => {
        if (artistId === undefined || artistId === null || artistId === "") return [];

        const candidates = [
            { url: `${PUBLIC_URL}/artist/${artistId}` },
            { url: `${PUBLIC_URL}/by-artist`, params: { artistId } },
            { url: `${PUBLIC_URL}/find-by-artist`, params: { artistId } },
            { url: `${BASE_URL}/artist/${artistId}` },
        ];

        for (const candidate of candidates) {
            try {
                const response = await axios.get(candidate.url, {
                    params: candidate.params,
                    headers: candidate.url.startsWith(BASE_URL) ? getAuthHeader() : undefined,
                });
                const songs = unwrapSongList(response);
                if (!songs.length) continue;

                const matchedSongs = songs.filter((song) => byArtistId(artistId, song));
                if (matchedSongs.length > 0) return matchedSongs;

                // Một số endpoint đã tự scope theo artist và không trả artistId trong item.
                return songs;
            } catch (error) {
                // Continue with next candidate endpoint.
            }
        }

        const activeRes = await axios.get(`${PUBLIC_URL}/active`);
        return unwrapSongList(activeRes).filter((song) => byArtistId(artistId, song));
    },

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

    // ✏️ Cập nhật riêng lyrics (JSON, hỗ trợ nhiều dòng)
    updateLyrics: (id, lyrics) =>
        axios.patch(
            `${BASE_URL}/${id}/lyrics`,
            { lyrics: String(lyrics ?? "") },
            { headers: getAuthHeader() }
        ),

    // ❌ Xóa bài hát
    delete: (id) =>
        axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeader() }),

    // 🎯 Lấy danh sách bài hát của tài khoản tác giả hiện tại (kèm fallback endpoint)
    getMySongsWithStats: async () => {
        const endpoints = [
            `${BASE_URL}/me`,
            `${BASE_URL}/my`,
            "http://localhost:8082/api/artist-studio/me/songs",
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios.get(endpoint, { headers: getAuthHeader() });
                const songs = unwrapSongList(response);
                if (songs.length > 0) return songs;
            } catch (error) {
                // Try next candidate endpoint.
            }
        }

        return [];
    },
};

export default songApi;
