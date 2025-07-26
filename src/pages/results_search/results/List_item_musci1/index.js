import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames/bind";
import styles from "../../results_search-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faHeadphones, faHeart } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const cx = classnames.bind(styles);

function RecentlyPlayedList() {
  const [songs, setSongs] = useState([]);
  const token = "Bearer YOUR_ACCESS_TOKEN"; // ⚠️ Thay bằng token thực

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
            <div key={song.id} className={cx("img_AAAAlist_item")}>
              <div className={cx("EEimg_list_item")}>
                <img
                    className={cx("img_list_item")}
                    src={song.coverImage || "https://via.placeholder.com/150"}
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
      </div>
  );
}

export default RecentlyPlayedList;
