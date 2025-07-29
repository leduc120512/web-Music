import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import classnames from "classnames/bind";
import styles from "../Play_music-module.scss";
import Video from "./mov_bbb.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCaretRight,
  faCopy,
  faDownload,
  faEllipsis,
  faExclamation,
  faHeart,
  faMusic,
  faPause,
  faPhone,
  faShare,
  faSortDown,
  faSortUp,
  faTag,
  faPlay,faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

import IMg_user from "./1709885058285.jpg";
import imglist from "./1438828376816.jpg";
import Text from "../../text";
import List_item_music from "../../results_search/results/List_item_musci1";
import songApi from "../../../api/api_music";

const cx = classnames.bind(styles);

function Music({ songId }) {
  const [songData, setSongData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);



  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        const response = await songApi.getLatestSongs();
        // response.data.data.content là mảng bài hát
        setSongs(response.data.data.content);
      } catch (error) {
        console.error('Lỗi khi lấy bài hát mới nhất:', error);
      }
    };

    fetchLatestSongs();
  }, []);
  console.log('songsa',songs)
  // ✅ Gọi API trực tiếp khi có songId
  useEffect(() => {
    if (!songId) return;

    // Lấy token từ cookie
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    axios
        .get(`http://localhost:8082/api/songs/${songId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then((res) => {
          setSongData(res.data?.data || null);
        })
        .catch((err) => {
          console.error("❌ Lỗi khi gọi API bài hát:", err);
        });
  }, [songId]);

  const toggleExpand = () => setExpanded(!expanded);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const componentsArray = Array(15).fill(
      <div className={cx("Musiacsa_right_header")}>
        <FontAwesomeIcon className={cx("Musiac_righst_header")} icon={faMusic} />
        <div>
          <p className={cx("Musiac_righsst_header")}>10/10</p>
          <p className={cx("Maausiac_righstss_header")}>Anh trai say hi, phạm đình</p>
        </div>
      </div>
  );

  const displayedComponents = isExpanded
      ? componentsArray
      : componentsArray.slice(0, 5);

  return (
      <div className={cx("Music")}>
        <Grid className={cx("Musicss")} container spacing={2}>
          <Grid item xs={12} md={8} className={cx("Music_left")}>
            <div className={cx("Music_nose")}>
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

              <p className={cx("Name_music")}>
                {songData?.title || "Đang tải..."}
              </p>

              <video className={cx("video_music")} controls>
                <source src={Video} type="video/mp4" />
                <source src={Video} type="video/ogg" />
                Your browser does not support the video tag.
              </video>

              {/* Tên nghệ sĩ, mô tả, album, thể loại */}
              <div className={cx("Music_info_block")}>
                <p><strong>Ca sĩ:</strong> {songData?.artistName || "Chưa rõ"}</p>
                <p><strong>Album:</strong> {songData?.albumTitle || "Chưa rõ"}</p>
                <p><strong>Thể loại:</strong> {songData?.genreName || "Chưa rõ"}</p>
                <p><strong>Mô tả:</strong> {songData?.description || "Không có mô tả"}</p>
                <p><strong>Lượt nghe:</strong> {songData?.playCount ?? 0}</p>
              </div>

              {/* Các nút chức năng giống như trước */}
              {/* ... (các đoạn JSX khác giữ nguyên như cũ) */}

              <div className={cx("music_subtitles", { expanded, collapsed: !expanded })}>
                <div className={cx("music_subtitlesssdd")}>
                  <h3>Lời bài hát</h3>
                  <p className={cx("music_subtitlesdd")}>
                    Lời đăng bởi: <span>khoiduyy</span>
                  </p>
                  <div className={cx("music_subtisastles")}>
                    <p>Hiện tại chưa có lời bài hát từ API.</p>
                  </div>
                  <div className={cx("musicd_subtitles")} onClick={toggleExpand}>
                    <p>{expanded ? "Thu gọn" : "Xem Thêm"}</p>
                    <FontAwesomeIcon
                        className={cx("musssicd_subtitles")}
                        icon={expanded ? faSortUp : faSortDown}
                    />
                  </div>
                </div>
              </div>

              <div className={cx("content")}>
                <div className={cx("list-music-lk")}>
                  <Text>LE XUAN DUC</Text>
                  <div className={cx("list-music")}>
                    <div className={cx("item-music")}>
                      <Link to="/Nhac">
                        <img className={cx("list-SINGER")} src={imglist} />
                        <FontAwesomeIcon
                            className={cx("list-SINGER_play")}
                            icon={faPlay}
                        />
                        <p>Tiềm Năng V-Pop</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <List_item_music />
            </div>
          </Grid>

          <Grid item xs={12} md={4} className={cx("Music_right")}>
            <div className={cx("Music_right_header")}>
              <div className={cx("Musisssac_right_header")}>
                <Text className={cx("Musisssac_right_hseader")}>NGHE TIẾP</Text>
                <div className={cx("Music_sright_header")}>
                  <p>Autoplay</p>
                  <div className={cx("Muasic_ssright_header")}>
                    <FontAwesomeIcon
                        className={cx("Muasicsss_ssright_header")}
                        icon={faExclamation}
                    />
                  </div>
                  <Switch {...label} defaultChecked />
                </div>
              </div>

              <div className={cx("Musiac_right_header")}>
                <div>
                  {(isExpanded ? songs : songs.slice(0, 4)).map((song) => (
                      <div key={song.id} className={cx("img_AAAAlist_item")}>
                        <div className={cx("EEimg_list_item")}>
                          <img
                              className={cx("img_list_item")}
                              src={song.coverImage || "https://via.placeholder.com/100"}
                              alt={song.title}
                          />
                          <div className={cx("img_AASSSAAlist_item")}>
                            <p className={cx("img_AASSssAAlist_item")}>{song.title}</p>
                            <p>{song.artistName}</p>
                          </div>
                        </div>

                        <div className={cx("iAAmg_AAAAlist_item")}>
                          <button className={cx("iAAmgSSSss_AAAAlist_item")}>Official</button>
                          <button className={cx("iAAmgSSS_AAAAlist_item")}>SQ</button>
                        </div>

                        <div className={cx("imAAg_AAAAlist_iaatem")}>
                          <div className={cx("imAAg_AAAAlist_item")}>
                            <FontAwesomeIcon icon={faHeadphones} />
                            <p>{song.playCount}</p>
                          </div>
                          <FontAwesomeIcon
                              className={cx("img_lisffst_item")}
                              icon={faHeart}
                              color={song.liked ? "red" : "gray"}
                          />
                          <FontAwesomeIcon className={cx("img_list_itemDD")} icon={faCopy} />
                        </div>
                      </div>
                  ))}

                  {songs.length > 4 && (
                      <button
                          className={cx("Maausiac_sssssrighstaaass_header")}
                          onClick={() => setIsExpanded(!isExpanded)}
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
