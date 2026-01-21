// src/components/List_item_today/List_item.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import styles from "./List-item-today-module.scss";
import Text from "../../../../../pages/text";
import songApi from "../../../../../../src/api/api_music";
import defaultImg from "../ANH/SONTUNG.webp";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

// Ghép URL ảnh an toàn + fallback
const buildCover = (coverImage) => {
  if (!coverImage) return defaultImg;
  if (/^https?:\/\//i.test(coverImage)) return coverImage; // đã là URL tuyệt đối
  return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};

function ListItemToday() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await songApi.getLatestSongs();
        setSongs(res?.data?.data?.content || []);
      } catch (e) {
        console.error("❌ Lỗi khi lấy danh sách bài hát mới nhất:", e);
      }
    })();
  }, []);

  return (
      <div className={cx("content")}>
        <div className={cx("list-music-lk")}>
          <Text>BÀI HÁT MỚI NHẤT</Text>

          <div className={cx("list-music")}>
            {songs.map((song) => (
                <div key={song.id} className={cx("item-music")}>
                  <Link to={`/Nhac/${song.id}`}>
                    <div className={cx("image-wrapper")}>
                      <img
                          className={cx("list-SINGER")}
                          src={buildCover(song.coverImage)}
                          alt={song.title}
                          loading="lazy"
                      />
                      <FontAwesomeIcon className={cx("list-SINGER_play")} icon={faPlay} />
                    </div>
                    <p className={cx("song-title")}>{song.title}</p>
                    <p className={cx("song-artist")}>{song.artistName}</p>
                  </Link>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default ListItemToday;
