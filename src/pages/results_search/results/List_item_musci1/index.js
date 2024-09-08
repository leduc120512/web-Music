import React from "react";

import classnames from "classnames/bind";
import styles from "../../results_search-module.scss";
import LIsst_muisic from "../1723784458729.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faHeadphones,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
const cx = classnames.bind(styles);

function List_item_music() {
  return (
    <div>
      <div className={cx("img_AAAAlist_item")}>
        <div className={cx("EEimg_list_item")}>
          {" "}
          <img className={cx("img_list_item")} src={LIsst_muisic} />
          <div className={cx("img_AASSSAAlist_item")}>
            <p className={cx("img_AASSssAAlist_item")}>Die With A Smile</p>
            <p>Lady Gaga, Bruno Mars</p>
          </div>
        </div>
        <div className={cx("iAAmg_AAAAlist_item")}>
          <button className={cx("iAAmgSSSss_AAAAlist_item")}>Official</button>
          <button className={cx("iAAmgSSS_AAAAlist_item")}>SQ</button>
        </div>
        <div className={cx("imAAg_AAAAlist_iaatem")}>
          <div className={cx("imAAg_AAAAlist_item")}>
            <FontAwesomeIcon icon={faHeadphones} />
            <p>77</p>
          </div>
          <FontAwesomeIcon className={cx("img_lisffst_item")} icon={faHeart} />
          <FontAwesomeIcon className={cx("img_list_itemDD")} icon={faCopy} />
        </div>
      </div>
      <div className={cx("img_AAAAlist_item")}>
        <div className={cx("EEimg_list_item")}>
          {" "}
          <img className={cx("img_list_item")} src={LIsst_muisic} />
          <div className={cx("img_AASSSAAlist_item")}>
            <p className={cx("img_AASSssAAlist_item")}>Die With A Smile</p>
            <p>Lady Gaga, Bruno Mars</p>
          </div>
        </div>
        <div className={cx("iAAmg_AAAAlist_item")}>
          <button className={cx("iAAmgSSSss_AAAAlist_item")}>Official</button>
          <button className={cx("iAAmgSSS_AAAAlist_item")}>SQ</button>
        </div>
        <div className={cx("imAAg_AAAAlist_iaatem")}>
          <div className={cx("imAAg_AAAAlist_item")}>
            <FontAwesomeIcon icon={faHeadphones} />
            <p>77</p>
          </div>
          <FontAwesomeIcon className={cx("img_lisffst_item")} icon={faHeart} />
          <FontAwesomeIcon className={cx("img_list_itemDD")} icon={faCopy} />
        </div>
      </div>
      <div className={cx("img_AAAAlist_item")}>
        <div className={cx("EEimg_list_item")}>
          {" "}
          <img className={cx("img_list_item")} src={LIsst_muisic} />
          <div className={cx("img_AASSSAAlist_item")}>
            <p className={cx("img_AASSssAAlist_item")}>Die With A Smile</p>
            <p>Lady Gaga, Bruno Mars</p>
          </div>
        </div>
        <div className={cx("iAAmg_AAAAlist_item")}>
          <button className={cx("iAAmgSSSss_AAAAlist_item")}>Official</button>
          <button className={cx("iAAmgSSS_AAAAlist_item")}>SQ</button>
        </div>
        <div className={cx("imAAg_AAAAlist_iaatem")}>
          <div className={cx("imAAg_AAAAlist_item")}>
            <FontAwesomeIcon icon={faHeadphones} />
            <p>77</p>
          </div>
          <FontAwesomeIcon className={cx("img_lisffst_item")} icon={faHeart} />
          <FontAwesomeIcon className={cx("img_list_itemDD")} icon={faCopy} />
        </div>
      </div>
    </div>
  );
}

export default List_item_music;
