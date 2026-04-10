import Header from "../../../compodens/Layout/DefaultLayout/header";

import classnames from "classnames/bind";
import styles from "./top_100_module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Img_h from "./1699029204532.jpg";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCirclePlay,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Imr from "./1600250876973.webp";
import Cookies from "js-cookie";
import songApi from "../../../api/api_music";
import likesApi from "../../../api/likes";
import { buildSongPath } from "../../../utils/songRoute";

const cx = classnames.bind(styles);

const TAB_ITEMS = [
  { value: "1", label: "Nhạc trẻ", keywords: ["nhac tre", "vpop", "v-pop", "pop"] },
  { value: "2", label: "Trữ tình", keywords: ["tru tinh", "bolero", "dan ca"] },
  { value: "3", label: "Nhạc trịnh", keywords: ["nhac trinh", "trinh"] },
  { value: "4", label: "Tiền chiến", keywords: ["tien chien", "xua"] },
  { value: "5", label: "Rap Việt", keywords: ["rap", "hip hop", "hiphop"] },
  { value: "6", label: "Remix", keywords: ["remix", "edm", "dance"] },
];

const ASSET_BASE = "http://localhost:8082";

const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const buildCover = (coverImage) => {
  if (!coverImage) return Img_h;
  if (/^https?:\/\//i.test(coverImage)) return coverImage;
  return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};

const mapSongsByTab = (songs = []) => {
  const result = {};

  TAB_ITEMS.forEach((tab, index) => {
    const filtered = songs
      .filter((song) => {
        const genre = normalizeText(song?.genreName || "");
        return tab.keywords.some((keyword) => genre.includes(keyword));
      })
      .slice(0, 12);

    const fallbackStart = index * 12;
    result[tab.value] = filtered.length > 0 ? filtered : songs.slice(fallbackStart, fallbackStart + 12);
  });

  return result;
};

function Top100_() {
  const [value, setValue] = React.useState("1");
  const [songsByTab, setSongsByTab] = React.useState({});
  const [loadingSongs, setLoadingSongs] = React.useState(true);
  const [songError, setSongError] = React.useState("");
  const [updatedAt, setUpdatedAt] = React.useState("");
  const [allSongs, setAllSongs] = React.useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const patchLikeState = React.useCallback((songId, updater) => {
    setSongsByTab((prev) => {
      const next = {};
      Object.entries(prev).forEach(([key, list]) => {
        next[key] = (list || []).map((song) => (song.id === songId ? updater(song) : song));
      });
      return next;
    });
    setAllSongs((prev) => prev.map((song) => (song.id === songId ? updater(song) : song)));
  }, []);

  const handleToggleLike = async (event, song) => {
    event.stopPropagation();
    if (!song?.id) return;

    if (!Cookies.get("token")) {
      alert("Vui long dang nhap de tym bai hat.");
      return;
    }

    const isLiked = !!song.liked;
    const originalLikeCount = song.likeCount || 0;
    const optimisticCount = Math.max(0, originalLikeCount + (isLiked ? -1 : 1));

    patchLikeState(song.id, (item) => ({ ...item, liked: !isLiked, likeCount: optimisticCount }));

    try {
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
        patchLikeState(song.id, (item) => ({ ...item, likeCount: latestCount }));
      }
    } catch (error) {
      patchLikeState(song.id, (item) => ({ ...item, liked: isLiked, likeCount: originalLikeCount }));
    }
  };

  React.useEffect(() => {
    let cancelled = false;

    const fetchTopSongs = async () => {
      setLoadingSongs(true);
      setSongError("");
      try {
        const activeRes = await songApi.getActiveSongs();
        const activeSongs = Array.isArray(activeRes?.data?.data) ? activeRes.data.data : [];
        let songs = activeSongs;

        if (songs.length === 0) {
          const topRes = await songApi.getTop5List();
          songs = Array.isArray(topRes?.data?.data) ? topRes.data.data : [];
        }

        if (!cancelled) {
          setSongsByTab(mapSongsByTab(songs));
          setAllSongs(songs);
          setUpdatedAt(new Date().toLocaleString("vi-VN"));
        }
      } catch (error) {
        if (!cancelled) {
          setSongError("Khong tai duoc bang xep hang tu API.");
          setSongsByTab({});
          setAllSongs([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingSongs(false);
        }
      }
    };

    fetchTopSongs();

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    document.title = "Bang xep hang | Web Nhac";
  }, []);

  const activeTab = TAB_ITEMS.find((tab) => tab.value === value);
  const sidebarSongs = allSongs.slice(0, 3);

  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>

      <Grid className={cx("lew")} container spacing={2}>
        <Grid item md={7} sm={5} xs={12}>
          <div className={cx("lew_left")}>
            <p className={cx("lew_top")}>TOP 100 VIỆT NAM </p>
            <p className={cx("lew_detail")}>
              TOP 100 là danh sách 100 bài hát hot nhất thuộc các thể loại nhạc
              được nghe nhiều nhất trên NhacCuaTui. Danh sách bài hát này được
              hệ thống tự động đề xuất dựa trên lượt nghe, lượt share v.v của
              từng bài hát trên tất cả các nền tảng (Web, Mobile web, App). Top
              100 sẽ được cập nhật mỗi ngày dựa trên các chỉ số có được từ ngày
              đó.
            </p>
            <p className={cx("lew_time")}>
              * TOP 100 vừa được cập nhật vào: <span>{updatedAt || "Dang cap nhat..."} </span>
            </p>

            <Box>
              <TabContext value={value}>
                <Box>
                  <TabList
                    className={cx("lew_time_see")}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="Top 100 tabs"
                    sx={{
                      ".MuiTabs-indicator": {
                        display: "none",
                      },
                    }}
                  >
                    {TAB_ITEMS.map((tab) => (
                      <Tab
                        key={tab.value}
                        className={cx("lew_tab")}
                        value={tab.value}
                        label={
                          <span className={cx("lew_tab-p")}>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <span>{tab.label}</span>
                          </span>
                        }
                      />
                    ))}
                  </TabList>

                  <div className={cx("lew__p")}>
                    <p>
                      100 ca khúc <b>{activeTab?.label}</b> hay nhất trên
                      NhacCuaTui
                    </p>
                    <p className={cx("djjjrneutpoiu")}>
                      <FontAwesomeIcon className={cx("lew__p_")} icon={faCirclePlay} />
                      Xem toàn bộ
                    </p>
                  </div>
                </Box>

                {TAB_ITEMS.map((tab) => (
                  <TabPanel key={tab.value} className={cx("rankPanel")} value={tab.value}>
                    {loadingSongs && <p className={cx("rankStateText")}>Dang tai du lieu...</p>}
                    {!loadingSongs && songError && <p className={cx("rankStateText", "rankStateError")}>{songError}</p>}
                    {!loadingSongs && !songError && (songsByTab[tab.value] || []).map((song, index) => (
                      <div
                        key={`${tab.value}-${song.id || song.title}`}
                        className={cx("lew_tabpanel")}
                        onClick={() => navigate(buildSongPath(song))}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") navigate(buildSongPath(song));
                        }}
                      >
                        <div className={cx("lew_tabpanel_list")}>
                          <p className={cx("rankIndex")}>{index + 1}</p>
                          <img src={buildCover(song.coverImage)} alt={song.title} />
                          <div className={cx("leeetw_tabpanel")}>
                            <p className={cx("rankTitle")}>{song.title}</p>
                            <p className={cx("leesetw_tabpanel")}>{song.artistName || song.artist || "Dang cap nhat"}</p>
                          </div>
                        </div>
                        <div className={cx("lew_tabdfspanel_list")}>
                          <button
                            type="button"
                            className={cx("rankActionBtn", { liked: song.liked })}
                            aria-label={`Yeu thich ${song.title}`}
                            onClick={(event) => handleToggleLike(event, song)}
                          >
                            <FontAwesomeIcon className={cx("lewd_tabpanel")} icon={faHeart} />
                            <span className={cx("rankLikeCount")}>{song.likeCount ?? 0}</span>
                          </button>
                          <button
                            type="button"
                            className={cx("rankActionBtn")}
                            aria-label={`Phat ${song.title}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              navigate(buildSongPath(song));
                            }}
                          >
                            <FontAwesomeIcon className={cx("lewd_tabpanel")} icon={faPlay} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabContext>
            </Box>{" "}
          </div>
        </Grid>
        <Grid item md={3} xs={12}>
          <div className={cx("lew_right")}>
            <div className={cx("lesw_right")}></div>
            <div className={cx("ledsdgw_right")}>
                {sidebarSongs.map((song) => (
                  <div
                    key={`side-${song.id}`}
                    className={cx("ledsdgdsw_right")}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(buildSongPath(song))}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") navigate(buildSongPath(song));
                    }}
                  >
                    <p className={cx("ledsdgdswd_right")}>
                      <span>{song.genreName || "TOP 100"}</span>
                      <FontAwesomeIcon className={cx("ledsfrsdgw_right")} icon={faChevronRight} />
                    </p>
                    <div className={cx("ledsfrsfdgws_right")}>
                      <img
                        src={buildCover(song.coverImage) || Imr}
                        alt={song.title}
                        className={cx("ledsfrsdgws_right")}
                      />
                      <p className={cx("ledsdsfrsdgws_right")}>{song.title}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Top100_;
