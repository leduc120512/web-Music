import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Cookies from "js-cookie";
import classnames from "classnames/bind";
import styles from "../Play_music-module.scss";

import VideoSample from "./mov_bbb.mp4"; // video demo
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faExclamation,
  faHeadphones,
  faHeart,
  faCopy,
  faPlay,
  faSortDown,
  faSortUp,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import Text from "../../text";
import List_item_music from "../../results_search/results/List_item_musci1";
import songApi from "../../../api/api_music";
import imglist from "./1438828376816.jpg";

const cx = classnames.bind(styles);

// Đổi nếu server của bạn khác
const ASSET_BASE = "http://localhost:8082";

const joinUrl = (base, path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const needSlash =
      (base.endsWith("/") ? base.slice(0, -1) : base) +
      (String(path).startsWith("/") ? "" : "/");
  return needSlash + String(path);
};

function Music({ songId }) {
  const [songData, setSongData] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  const [songError, setSongError] = useState("");

  const [songs, setSongs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // panel “Nghe tiếp”
  const [expandedLyric, setExpandedLyric] = useState(false); // panel lời bài hát

  // Lấy danh sách mới nhất (panel phải)
  useEffect(() => {
    (async () => {
      try {
        const res = await songApi.getLatestSongs();
        setSongs(res?.data?.data?.content || []);
      } catch (e) {
        console.error("Lỗi khi lấy bài hát mới nhất:", e);
      }
    })();
  }, []);

  // Lấy chi tiết bài hát theo songId
  useEffect(() => {
    if (!songId) return;
    (async () => {
      try {
        setSongLoading(true);
        setSongError("");
        const token = Cookies.get("token");
        const res = await axios.get(`${ASSET_BASE}/api/songs/${songId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setSongData(res?.data?.data || null);
      } catch (e) {
        console.error("❌ Lỗi khi gọi API bài hát:", e);
        setSongError("Không tải được thông tin bài hát");
        setSongData(null);
      } finally {
        setSongLoading(false);
      }
    })();
  }, [songId]);

  const label = { inputProps: { "aria-label": "Autoplay" } };

  const audioSrc = songData?.filePath ? joinUrl(ASSET_BASE, songData.filePath) : "";

  return (
      <div className={cx("Music")}>
        <Grid className={cx("Musicss")} container spacing={2}>
          {/* LEFT */}
          <Grid item xs={12} md={8} className={cx("Music_left")}>
            <div className={cx("Music_nose")}>
              {/* Breadcrumb */}
              <div className={cx("Music_note")}>
                <div>
                  <p>Nghe nhạc</p>
                  <FontAwesomeIcon className={cx("icon_note")} icon={faCaretRight} />
                </div>
                <div>
                  <p>Playlist Nhạc trẻ</p>
                  <FontAwesomeIcon className={cx("icon_note")} icon={faCaretRight} />
                </div>
                <div>
                  <p>V.A</p>
                  <FontAwesomeIcon className={cx("icon_note")} icon={faCaretRight} />
                </div>
              </div>

              {/* Tiêu đề */}
              <p className={cx("Name_music")}>
                {songLoading ? "Đang tải..." : songData?.title || "Không có tiêu đề"}
              </p>

              {/* Video mẫu (nếu cần) */}
              <video className={cx("video_music")} controls preload="metadata">
                <source src={VideoSample} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Audio thực tế */}


              {/* Thông tin bài hát */}
              <div className={cx("Music_info_block")}>
                {audioSrc ? (
                    <audio
                        className={cx("audio_player")}
                        src={audioSrc}
                        controls
                        preload="metadata"
                        crossOrigin="anonymous"
                    />
                ) : (
                    <div className={cx("audio_fallback")}>
                      <FontAwesomeIcon icon={faMusic} />
                      <span>Chưa có file audio cho bài hát này.</span>
                    </div>
                )}
                <p>
                  <strong>Ca sĩ:</strong> {songData?.artistName || "Chưa rõ"}
                </p>
                <p>
                  <strong>Album:</strong> {songData?.albumTitle || "Chưa rõ"}
                </p>
                <p>
                  <strong>Thể loại:</strong> {songData?.genreName || "Chưa rõ"}
                </p>
                <p>
                  <strong>Mô tả:</strong> {songData?.description || "Không có mô tả"}
                </p>
                <p>
                  <strong>Lượt nghe:</strong> {songData?.playCount ?? 0}
                </p>
                {songError && <p className={cx("error")}>{songError}</p>}
              </div>

              {/* Lời bài hát */}
              <div className={cx("music_subtitles", { expanded: expandedLyric, collapsed: !expandedLyric })}>
                <div className={cx("music_subtitlesssdd")}>
                  <h3>Lời bài hát</h3>
                  <p className={cx("music_subtitlesdd")}>
                    <Link to={`/ProfileAuthor/${songData?.idartist}`}>
                      Lời đăng bởi: <span>{songData?.artistName || "Chưa rõ"}</span>
                    </Link>
                  </p>
                  <div className={cx("music_subtisastles")}>
                    <p>Hiện tại chưa có lời bài hát từ API.</p>
                  </div>
                  <div className={cx("musicd_subtitles")} onClick={() => setExpandedLyric((s) => !s)}>
                    <p>{expandedLyric ? "Thu gọn" : "Xem Thêm"}</p>
                    <FontAwesomeIcon
                        className={cx("musssicd_subtitles")}
                        icon={expandedLyric ? faSortUp : faSortDown}
                    />
                  </div>
                </div>
              </div>

              {/* Khối nội dung khác */}
              <div className={cx("content")}>
                <div className={cx("list-music-lk")}>
                <Text>LE XUAN DUC</Text>
                  <div className={cx("list-music")}>
                    <div className={cx("item-music")}>
                      <Link to="/Nhac">
                        <img className={cx("list-SINGER")} src={imglist} alt="list" />
                        <FontAwesomeIcon className={cx("list-SINGER_play")} icon={faPlay} />
                        <p>Tiềm Năng V-Pop</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <List_item_music />
            </div>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4} className={cx("Music_right")}>
            <div className={cx("Music_right_header")}>
              <div className={cx("Musisssac_right_header")}>
                <Text className={cx("Musisssac_right_hseader")}>NGHE TIẾP</Text>
                <div className={cx("Music_sright_header")}>
                  <p>Autoplay</p>
                  <div className={cx("Muasic_ssright_header")}>
                    <FontAwesomeIcon className={cx("Muasicsss_ssright_header")} icon={faExclamation} />
                  </div>
                  <Switch {...label} defaultChecked />
                </div>
              </div>

              <div className={cx("Musiac_right_header")}>
                <div>
                  {(isExpanded ? songs : songs.slice(0, 4)).map((s) => {
                    const cover = s.coverImage
                        ? joinUrl(ASSET_BASE, s.coverImage)
                        : "https://via.placeholder.com/100";
                    return (
                        <div key={s.id} className={cx("img_AAAAlist_item")}>
                          <div className={cx("EEimg_list_item")}>
                            <img className={cx("img_list_item")} src={cover} alt={s.title} />
                            <div className={cx("img_AASSSAAlist_item")}>
                              <p className={cx("img_AASSssAAlist_item")}>{s.title}</p>
                              <p>{s.artistName}</p>
                            </div>
                          </div>

                          <div className={cx("iAAmg_AAAAlist_item")}>
                            <button className={cx("iAAmgSSSss_AAAAlist_item")}>Official</button>
                            <button className={cx("iAAmgSSS_AAAAlist_item")}>SQ</button>
                          </div>

                          <div className={cx("imAAg_AAAAlist_iaatem")}>
                            <div className={cx("imAAg_AAAAlist_item")}>
                              <FontAwesomeIcon icon={faHeadphones} />
                              <p>{s.playCount ?? 0}</p>
                            </div>
                            <FontAwesomeIcon
                                className={cx("img_lisffst_item")}
                                icon={faHeart}
                                color={s.liked ? "red" : "gray"}
                            />
                            <FontAwesomeIcon className={cx("img_list_itemDD")} icon={faCopy} />
                          </div>
                        </div>
                    );
                  })}

                  {songs.length > 4 && (
                      <button
                          className={cx("Maausiac_sssssrighstaaass_header")}
                          onClick={() => setIsExpanded((v) => !v)}
                      >
                        <p>{isExpanded ? "Rút Gọn" : "Xem Thêm"}</p>
                      </button>
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
  );
}

export default Music;
