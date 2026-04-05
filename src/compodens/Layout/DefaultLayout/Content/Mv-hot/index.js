import React, { useEffect, useState } from "react";
import styles from "./Mv-hot-module.scss";
import classnames from "classnames/bind";
import Text from "../../../../../pages/text";
import songApi from "../../../../../api/api_music";
import defaultImg from "../ANH/SONTUNG.webp";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

const buildCover = (coverImage) => {
  if (!coverImage) return defaultImg;
  if (/^https?:\/\//i.test(coverImage)) return coverImage;
  return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};

function Mv_hot() {
  const [songs, setSongs] = useState([]);
  const [top5, setTop5] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await songApi.getActiveSongs();
        const responseTop5 = await songApi.getTop5List();

        const result = response?.data?.data;
        const resultTop5 = responseTop5?.data?.data;

        setSongs(Array.isArray(result) ? result : []);
        setTop5(Array.isArray(resultTop5) ? resultTop5 : []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài hát:", error);
        setSongs([]);
        setTop5([]);
      }
    };

    fetchSongs();
  }, []);

  return (
      <div className={cx("Mvhot")}>
        <div className={cx("sectionHeader")}>
          <Text className={cx("sectionTitle")}>MV HOT</Text>
        </div>

        <div className={cx("Mvhot2")}>
          {songs.length > 0 ? (
              songs.map((song, index) => (
                  <div className={cx("Mvhot22")} key={song.id || index}>
                    <div className={cx("card")}>
                      <img
                          className={cx("Mvhot23")}
                          src={buildCover(song.coverImage)}
                          alt={song.title}
                          onError={(e) => {
                            e.currentTarget.src = defaultImg;
                          }}
                      />
                      <div className={cx("overlay")} />
                      <div className={cx("Mvhot-main-text123")}>
                        <p className={cx("Mvhot-main-tex22")} title={song.title}>
                          {song.title}
                        </p>
                        <p className={cx("Mvhot-main-text12")} title={song.artistName}>
                          {song.artistName}
                        </p>
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <p className={cx("emptyText")}>Không có bài hát nào.</p>
          )}
        </div>

        <div className={cx("icon_list_item_product1")}>
          <Text className={cx("topTitle")}>Top 5 MV hay nhất</Text>
        </div>

        <div className={cx("content-TOP100-IMG")}>
          {top5.length > 0 ? (
              top5.map((song, index) => (
                  <div className={cx("topCard")} key={song.id || index}>
                    <img
                        className={cx("content-TOP100-IMG-LIST")}
                        src={buildCover(song.coverImage)}
                        alt={song.title}
                        onError={(e) => {
                          e.currentTarget.src = defaultImg;
                        }}
                    />
                    <p className={cx("topCardTitle")} title={song.title}>
                      {song.title}
                    </p>
                    <p className={cx("topCardArtist")} title={song.artistName}>
                      {song.artistName}
                    </p>
                  </div>
              ))
          ) : (
              <p className={cx("emptyText")}>Không có top 5.</p>
          )}
        </div>
      </div>
  );
}

export default Mv_hot;