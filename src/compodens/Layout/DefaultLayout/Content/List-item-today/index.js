import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import styles from "./List-item-today-module.scss";
import Text from "../../../../../pages/text";
import songApi from "../../../../../../src/api/api_music";
import defaultImg from "../ANH/SONTUNG.webp";
import { buildSongPath } from "../../../../../utils/songRoute";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

const buildCover = (coverImage) => {
  if (!coverImage) return defaultImg;
  if (/^https?:\/\//i.test(coverImage)) return coverImage;
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
        console.error("Lỗi khi lấy danh sách bài hát mới nhất:", e);
      }
    })();
  }, []);

  return (
      <div className={cx("content")}>
        <div className={cx("list-music-lk")}>
          <Text className={cx("section-title")}>BÀI HÁT MỚI NHẤT</Text>

          <div className={cx("list-music")}>
            {songs.map((song) => (
                <div key={song.id} className={cx("item-music")}>
                  <Link to={buildSongPath(song)} className={cx("item-link")}>
                    <div className={cx("image-wrapper")}>
                      <img
                          className={cx("list-SINGER")}
                          src={buildCover(song.coverImage)}
                          alt={song.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = defaultImg;
                          }}
                      />

                      <div className={cx("overlay")} />
                      <div className={cx("play-button")}>
                        <FontAwesomeIcon
                            className={cx("list-SINGER_play")}
                            icon={faPlay}
                        />
                      </div>
                    </div>

                    <p className={cx("song-title")} title={song.title}>
                      {song.title}
                    </p>
                    <p className={cx("song-artist")} title={song.artistName}>
                      {song.artistName}
                    </p>
                  </Link>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default ListItemToday;