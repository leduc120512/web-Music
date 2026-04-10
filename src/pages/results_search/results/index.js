import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "../results_search-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faHeart,
  faLightbulb,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import songApi from "../../../api/api_music";
import likesApi from "../../../api/likes";
import searchHistoryApi from "../../../api/search_history";
import defaultImg from "../../../compodens/Layout/DefaultLayout/Content/ANH/SONTUNG.webp";
import { buildSongPath } from "../../../utils/songRoute";

const ASSET_BASE = "http://localhost:8082";
const cx = classnames.bind(styles);

const logNetwork = (label, payload) => {
  // Debug helper for tracking request lifecycle in browser console.
  // eslint-disable-next-line no-console
  console.log(`[results-network] ${label}`, payload || "");
};

const buildCover = (coverImage) => {
  if (!coverImage) return defaultImg;
  if (/^https?:\/\//i.test(coverImage)) return coverImage;
  return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};

const getArtistLabel = (song) => song?.artist || song?.artistName || "Dang cap nhat";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyItems, setHistoryItems] = useState([]);

  const keyword = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("keyword") || "").trim();
  }, [location.search]);

  useEffect(() => {
    document.title = keyword ? `Tim kiem: ${keyword} | Web Nhac` : "Tim kiem nhac | Web Nhac";
  }, [keyword]);

  const loadHistory = () => {
    setHistoryItems(searchHistoryApi.getAll(10));
  };

  const patchSongLike = (songId, updater) => {
    setSongs((prev) => prev.map((song) => (song.id === songId ? updater(song) : song)));
  };

  const handleToggleLike = async (event, song) => {
    event.preventDefault();
    event.stopPropagation();

    if (!song?.id) return;
    if (!Cookies.get("token")) {
      alert("Vui long dang nhap de tym bai hat.");
      return;
    }

    const isLiked = !!song.liked;
    const originalLikeCount = song.likeCount || 0;
    const optimisticCount = Math.max(0, originalLikeCount + (isLiked ? -1 : 1));

    patchSongLike(song.id, (item) => ({ ...item, liked: !isLiked, likeCount: optimisticCount }));

    try {
      logNetwork("toggle-like:start", { songId: song.id, nextLiked: !isLiked });
      if (isLiked) {
        await likesApi.unlikeSong(song.id);
      } else {
        await likesApi.likeSong(song.id);
      }

      const countRes = await likesApi.getSongLikeCount(song.id);
      const countData = countRes?.data?.data;
      const latestCount = Number(
        typeof countData === "object" && countData !== null ? countData.likeCount : countData
      );
      if (!Number.isNaN(latestCount)) {
        patchSongLike(song.id, (item) => ({ ...item, likeCount: latestCount }));
      }
      logNetwork("toggle-like:success", { songId: song.id, likeCount: latestCount });
    } catch (error) {
      logNetwork("toggle-like:error", {
        songId: song.id,
        message: error?.response?.data?.message || error?.message,
      });
      patchSongLike(song.id, (item) => ({ ...item, liked: isLiked, likeCount: originalLikeCount }));
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchByKeyword = async () => {
      setLoading(true);
      setError("");

      // Server search is preferred; fallback to public suggestions for guests.
      const applySongs = (items = []) => {
        if (!ignore) {
          setSongs(Array.isArray(items) ? items : []);
        }
      };

      try {
        logNetwork("search:start", { keyword, endpoint: "/api/songs/search" });
        const res = await songApi.search(keyword, 0, 20);
        const content = res?.data?.data?.content;
        if (res?.data?.success && Array.isArray(content)) {
          logNetwork("search:success", { keyword, total: content.length, source: "search" });
          applySongs(content);
        } else {
          logNetwork("search:empty", { keyword, source: "search" });
          applySongs([]);
        }
      } catch (err) {
        logNetwork("search:error", {
          keyword,
          endpoint: "/api/songs/search",
          message: err?.response?.data?.message || err?.message,
        });
        try {
          logNetwork("search-fallback:start", { keyword, endpoint: "/api/songs/public/search-suggestions" });
          const fallback = await songApi.searchSuggestions(keyword);
          const suggestions = fallback?.data?.data;
          if (fallback?.data?.success && Array.isArray(suggestions)) {
            logNetwork("search-fallback:success", { keyword, total: suggestions.length, source: "suggestions" });
            applySongs(suggestions);
          } else {
            logNetwork("search-fallback:empty", { keyword, source: "suggestions" });
            applySongs([]);
            if (!ignore) setError("Khong the tim kiem bai hat. Vui long thu lai.");
          }
        } catch (fallbackErr) {
          logNetwork("search-fallback:error", {
            keyword,
            endpoint: "/api/songs/public/search-suggestions",
            message: fallbackErr?.response?.data?.message || fallbackErr?.message,
          });
          if (!ignore) {
            setSongs([]);
            setError("Khong the tim kiem bai hat. Vui long thu lai.");
          }
        }
      }

      if (!ignore && keyword) {
        searchHistoryApi.addKeyword(keyword);
        loadHistory();
      }

      if (!ignore) {
        setLoading(false);
      }
    };

    const run = async () => {
      if (keyword) {
        await fetchByKeyword();
        return;
      }

      setSongs([]);
      setError("");
    };

    run();

    return () => {
      ignore = true;
    };
  }, [keyword]);

  return (
    <div className={cx("Results")}>
      <h2 className={cx("Results_header")}>TIM KIEM</h2>

      <p className={cx("Results_lissst_research")}>
        {keyword || (songs[0] && songs[0].title) || "Nhap tu khoa de tim kiem"}
        <span>{songs.length > 0 ? `${songs.length} ket qua` : ""}</span>
      </p>

      <p className={cx("Resssssults_list_How_to")}>
        <FontAwesomeIcon
          className={cx("Ressssssssults_list_How_to")}
          icon={faLightbulb}
        />
        Tim nhanh theo tu khoa hoac chon lai tu <span>lich su tim kiem</span>.
      </p>

      <div className={cx("SearchHistoryPanel")}>
        <div className={cx("SearchHistoryHeader")}>
          <p>
            <FontAwesomeIcon icon={faClockRotateLeft} /> Lich su tim kiem
          </p>
          <button
            type="button"
            onClick={() => {
              searchHistoryApi.clearAll();
              loadHistory();
            }}
            disabled={historyItems.length === 0}
          >
            <FontAwesomeIcon icon={faTrashCan} /> Xoa tat ca
          </button>
        </div>

        {historyItems.length > 0 ? (
          <div className={cx("SearchHistoryList")}>
            {historyItems.map((item) => (
              <div key={item.key} className={cx("SearchHistoryItem")}>
                <button
                  type="button"
                  className={cx("SearchHistorySelect")}
                  onClick={() => {
                    if (item.type === "song" && item.songId) {
                      navigate(buildSongPath({ id: item.songId, title: item.title || item.keyword }));
                    } else {
                      navigate(`/tim-kiem?keyword=${encodeURIComponent(item.keyword)}`);
                    }
                  }}
                >
                  <p>{item.title || item.keyword}</p>
                  {item.artist && <span>{item.artist}</span>}
                </button>
                <button
                  type="button"
                  className={cx("SearchHistoryRemove")}
                  onClick={() => {
                    searchHistoryApi.removeItem(item.key);
                    loadHistory();
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={cx("SearchHistoryEmpty")}>Ban chua co lich su tim kiem.</p>
        )}
      </div>

      <p className={cx("Ressssssssultsss_list_How_to")}>BAI HAT</p>

      {loading && <p className={cx("SearchMessage")}>Dang tai ket qua...</p>}
      {!loading && error && <p className={cx("SearchError")}>{error}</p>}
      {!loading && !error && songs.length === 0 && keyword && (
        <p className={cx("SearchMessage")}>Khong tim thay bai hat phu hop.</p>
      )}

      <div className={cx("SearchResultList")}> 
        {songs.map((song) => (
          <Link
            key={song.id}
            to={buildSongPath(song)}
            className={cx("song_card")}
            onClick={() => searchHistoryApi.addSong(song)}
          >
            <img
              alt={song.title}
              src={buildCover(song.coverImage)}
              className={cx("song_thumbnail")}
            />
            <div className={cx("song_info")}>
              <p className={cx("song_title")}>{song.title}</p>
              <p className={cx("song_artist")}>{getArtistLabel(song)}</p>
            </div>

            <div className={cx("song_actions_inline")}>
              <button
                type="button"
                className={cx("song_like_btn", { liked: song.liked })}
                onClick={(event) => handleToggleLike(event, song)}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span>{song.likeCount ?? 0}</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Results;
