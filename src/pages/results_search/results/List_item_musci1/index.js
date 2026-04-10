import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "../../results_search-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faHeadphones, faHeart } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { buildSongPath } from "../../../../utils/songRoute";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

const buildCover = (coverImage) => {
  if (!coverImage) return "https://via.placeholder.com/150";
  if (/^https?:\/\//i.test(coverImage)) return coverImage;
  return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};

function RecentlyPlayedList() {
  const [songs, setSongs] = useState([]);
    useEffect(() => {
        const fetchRecentlyPlayedSongs = async () => {
            const token = Cookies.get("token");

            if (!token) {
                console.warn("Chưa đăng nhập hoặc không có token.");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:8082/api/history/recent?page=0&size=10",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data?.data?.content;
                if (Array.isArray(data)) {
                    setSongs(data);
                } else {
                    setSongs([]);
                }
            } catch (error) {
                console.error("Lỗi khi tải lịch sử phát bài hát:", error);
                if (error.response?.status === 401) {
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    // Optional: redirect to login page
                }
            }
        };

        fetchRecentlyPlayedSongs();
    }, []);

    return (
      <div>
        {songs.map((song) => (
            <Link to={buildSongPath(song)} key={song.id} className={cx("img_AAAAlist_item")}>
              <div className={cx("EEimg_list_item")}>
                <img
                    className={cx("img_list_item")}
                    src={buildCover(song.coverImage)}
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
                  <p>{song.playCount ?? 0}</p>
                </div>
                <FontAwesomeIcon
                    className={cx("img_lisffst_item")}
                    icon={faHeart}
                    color={song.liked ? "red" : "gray"}
                />
                <FontAwesomeIcon className={cx("img_list_itemDD")} icon={faCopy} />
              </div>
            </Link>
        ))}
      </div>
  );
}

export default RecentlyPlayedList;
