import React from "react";

import classnames from "classnames/bind";
import styles from "../results_search-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faLightbulb } from "@fortawesome/free-solid-svg-icons";

import List_item_music from "./List_item_musci1";
import Play_list from "./Play_list";
const cx = classnames.bind(styles);

function Results() {
  return (
    <div className={cx("Results")}>
      <h2 className={cx("Results_header")}>TÌM KIẾM</h2>
      <div className={cx("Results_Link")}>
        <ul className={cx("Results_list Results_list_left")}>
          <li>Tất cả</li>
          <li>Bài hát</li>
          <li>Playlist</li>
          <li>Video</li>
          <li>Karaoke</li>
        </ul>
        <ul className={cx("Results_list Results_list_right")}>
          <li className={cx("Results_list222 ")}>Lọc</li>
          <li>
            <FontAwesomeIcon className={cx("Results_icon")} icon={faFile} />{" "}
          </li>
        </ul>
      </div>
      <p className={cx("Results_lissst_research")}>
        I'm Thinking About You <span>có 870,731 kết quả</span>
      </p>
      <p className={cx("Resssssults_list_How_to")}>
        <FontAwesomeIcon
          className={cx("Ressssssssults_list_How_to")}
          icon={faLightbulb}
        />
        Bạn muốn tìm <span>Bài Hát, Album</span> hay <span>Video</span> cho{" "}
        <span>I'm Thinking About You?</span>
      </p>
      <p className={cx("Ressssssssultsss_list_How_to")}>
        BÀI HÁT <span>(Có 696,555 kết quả)</span>
      </p>
      <List_item_music />
      <Play_list />
    </div>
  );
}

export default Results;
