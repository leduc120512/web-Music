// src/compodens/Layout/DefaultLayout/Sidebar/music-anh/index.js
import React, { useEffect, useState } from "react";
import styles from "./Muisic-chauau-module.scss";
import classnames from "classnames/bind";
import Imgvb from "../1699029204532.jpg";
import imgt from "../12437.jpg";
import Text from "../../../../../pages/text";
import axios from "axios";

const cx = classnames.bind(styles);

const API_ORIGIN =
    import.meta?.env?.VITE_API_ORIGIN || "http://localhost:8082";

const resolveImage = (path) => {
  if (!path) return Imgvb;
  return /^https?:\/\//i.test(path) ? path : `${API_ORIGIN}${path}`;
};
const rankText = (n) => String(n).padStart(2, "0");

function MUSICANH({ id = 16 }) {
  // Album
  const [album, setAlbum] = useState(null);
  const [loadingAlbum, setLoadingAlbum] = useState(true);
  const [errAlbum, setErrAlbum] = useState("");

  // Songs
  const [songs, setSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [errSongs, setErrSongs] = useState("");

  // Hot albums
  const [hotAlbums, setHotAlbums] = useState([]);
  const [loadingHot, setLoadingHot] = useState(true);
  const [errHot, setErrHot] = useState("");

  // Fetch album
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoadingAlbum(true);
        const res = await axios.get(`${API_ORIGIN}/api/albums/${id}`);
        if (!ignore) setAlbum(res?.data?.data || null);
      } catch (e) {
        if (!ignore) setErrAlbum(e?.message || "Không tải được album");
      } finally {
        if (!ignore) setLoadingAlbum(false);
      }
    })();
    return () => { ignore = true; };
  }, [id]);

  // Fetch songs by album
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoadingSongs(true);
        const res = await axios.get(`${API_ORIGIN}/api/songs/by-album/${id}`);
        if (!ignore) setSongs(res?.data?.data?.content || []);
      } catch (e) {
        if (!ignore) setErrSongs(e?.message || "Không tải được danh sách bài hát");
      } finally {
        if (!ignore) setLoadingSongs(false);
      }
    })();
    return () => { ignore = true; };
  }, [id]);

  // Fetch latest albums & filter title === "1"
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoadingHot(true);
        const res = await axios.get(`${API_ORIGIN}/api/albums/latest`, {
          params: { page: 0, size: 20 },
        });
        const raw =
            res?.data?.data?.content ||
            res?.data?.data ||
            res?.data?.content ||
            res?.data ||
            [];
        const filtered = (Array.isArray(raw) ? raw : []).filter(
            (a) => String(a?.title || "").trim() === "1"
        );
        if (!ignore) setHotAlbums(filtered);
      } catch (e) {
        if (!ignore) setErrHot(e?.message || "Không tải được albums mới");
      } finally {
        if (!ignore) setLoadingHot(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  // Header Album
  const HeaderAlbum = () => {
    if (loadingAlbum) {
      return (
          <div className={cx("Musicvchauau-list", "Mvhot-main-text12314", "skeleton")} />
      );
    }
    if (errAlbum) {
      return (
          <div className={cx("Musicvchauau-list", "Mvhot-main-text12314")}>
            <div className={cx("error-box")}>Lỗi album: {errAlbum}</div>
          </div>
      );
    }
    const title = album?.title || "Đang tải...";
    const artistName = album?.artistName || "";
    const cover = resolveImage(album?.coverImage);
    return (
        <div className={cx("Musicvchauau-list", "Mvhot-main-text12314")}>
          <img
              className={cx("Musicvchauau-img")}
              src={cover}
              alt={title}
              onError={(e) => (e.currentTarget.src = Imgvb)}
          />
          <div className={cx("Mvhot-main-text1234", "Mvhot-main-text12314s")}>
            <p className={cx("Mvhot-main-tex22", "Mvhot-masin-tex22")}>{title}</p>
            <p className={cx("Mvhot-main-text12", "Mvhots-main-text12")}>
              {artistName}
            </p>
          </div>
        </div>
    );
  };

  return (
      <div className={cx("Musicvchauau")}>
        {/* ======= ALBUM HEADER ======= */}
        <HeaderAlbum />

        {/* ======= SONG LIST ======= */}
        {loadingSongs && (
            <>
              <div className={cx("skeleton", "Musicvchauau-list")} />
              <div className={cx("skeleton", "Musicvchauau-list")} />
              <div className={cx("skeleton", "Musicvchauau-list")} />
            </>
        )}
        {!loadingSongs && !errSongs && songs.map((song, idx) => (
            <div
                key={song.id}
                className={cx(
                    "Musicvchauau-list",
                    "Mussicvchauau-list",
                    "Mvhot-main-text12314"
                )}
            >
              <p
                  className={cx("Musicvchauau-l2")}
                  style={{ fontWeight: 600, letterSpacing: "0.5px" }}
              >
                {rankText(idx + 1)}
              </p>
              <div className={cx("Mvhot-main-text1234", "Mvhot-main-text12314s")}>
                <p
                    className={cx(
                        "Mvhot-main-tex22",
                        "Mvhsot-main-tex22",
                        "Mvhot-masin-tex22"
                    )}
                    title={song.title}
                >
                  {song.title || "Untitled"}
                </p>
                <p
                    className={cx("Mvhot-main-text12", "Mvhots-main-text12")}
                    title={song.artistName || ""}
                >
                  {song.artistName || "Không rõ nghệ sĩ"}
                </p>
              </div>
            </div>
        ))}
        {!loadingSongs && errSongs && (
            <div className={cx("error-box")}>Lỗi bài hát: {errSongs}</div>
        )}

        {/* ======= TYPE HOT ======= */}
        <div className={cx("type-hot")}>
          <Text>CHỦ ĐỀ HOT</Text>
          <div className={cx("type-hot-list")}>
            {loadingHot && (
                <>
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                </>
            )}
            {!loadingHot && !errHot && hotAlbums.length > 0 && (
                hotAlbums.slice(0, 5).map((alb) => (
                    <img
                        key={alb.id}
                        className={cx("type-hot-img")}
                        src={resolveImage(alb.coverImage)}
                        alt={alb.title}
                        title={alb.title}
                        onError={(e) => (e.currentTarget.src = imgt)}
                    />
                ))
            )}
            {!loadingHot && !errHot && hotAlbums.length === 0 && (
                <>
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                </>
            )}
            {!loadingHot && errHot && (
                <>
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                  <img className={cx("type-hot-img")} src={imgt} alt="" />
                </>
            )}
          </div>
        </div>
      </div>
  );
}

export default MUSICANH;
