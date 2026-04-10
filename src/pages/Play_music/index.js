import React from "react";
import Header from "../../compodens/Layout/DefaultLayout/header";

import classnames from "classnames/bind";
import styles from "./Play_music-module.scss";

import Music from "./Play_music-content";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buildSongPathFromId, extractSongIdFromSlug } from "../../utils/songRoute";
const cx = classnames.bind(styles);

function Play_music() {
  const { id, songSlug } = useParams();
  const navigate = useNavigate();
  const normalizedSongId = extractSongIdFromSlug(songSlug || id || "");

  useEffect(() => {
    if (id) {
      navigate(buildSongPathFromId(id), { replace: true });
    }
  }, [id, navigate]);

  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("Music_main")}>
          <Music songId={normalizedSongId} />

      </div>
    </div>
  );
}

export default Play_music;
