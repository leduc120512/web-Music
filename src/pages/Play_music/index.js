import React, { useState } from "react";
import Header from "../../compodens/Layout/DefaultLayout/header";

import classnames from "classnames/bind";
import styles from "./Play_music-module.scss";

import Music from "./Play_music-content";
import { useParams } from "react-router-dom";
const cx = classnames.bind(styles);



function Play_music() {const { id } = useParams();
  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("Music_main")}>
          <Music songId={id} />

      </div>
    </div>
  );
}

export default Play_music;
