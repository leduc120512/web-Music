const STORAGE_KEY = "music_search_history_v1";
const MAX_ITEMS = 12;

const normalizeKeyword = (keyword = "") => keyword.trim().toLowerCase();

const safeParse = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const read = () => safeParse(localStorage.getItem(STORAGE_KEY));

const write = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
};

const sortByLatest = (items) => [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const searchHistoryApi = {
  getAll: (limit = MAX_ITEMS) => sortByLatest(read()).slice(0, limit),

  addKeyword: (keyword) => {
    const cleaned = keyword?.trim();
    if (!cleaned) return;

    const keywordKey = `kw:${normalizeKeyword(cleaned)}`;
    const nextItem = {
      key: keywordKey,
      type: "keyword",
      keyword: cleaned,
      title: cleaned,
      createdAt: new Date().toISOString(),
    };

    const next = read().filter((item) => item.key !== keywordKey);
    next.unshift(nextItem);
    write(next);
  },

  addSong: (song) => {
    if (!song?.id) return;

    const songKey = `song:${song.id}`;
    const title = song.title || song.keyword || "Bai hat";
    const artist = song.artist || song.artistName || "";

    const nextItem = {
      key: songKey,
      type: "song",
      songId: song.id,
      keyword: title,
      title,
      artist,
      createdAt: new Date().toISOString(),
    };

    const next = read().filter((item) => item.key !== songKey);
    next.unshift(nextItem);
    write(next);
  },

  removeItem: (key) => {
    const next = read().filter((item) => item.key !== key);
    write(next);
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default searchHistoryApi;

