import React, { useState } from "react";

import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCirclePlay,
  faMicrophone,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Img_item_content_profule from "../1473409265946.webp";
const cx = classnames.bind(styles);

function Content_main() {
  return (
    <div className={cx("Contentt")}>
      <div className={cx("Contsssentt")}>
        {" "}
        <p>PLAYLIST | ALBULM</p>
        <div>
          <Link to="/Create_list_music">
            <button className={cx("Contsssentt_btn")}>
              <FontAwesomeIcon
                className={cx("Covvvntsssentt_btn")}
                icon={faPen}
              />
              <p>Tạo playList</p>
            </button>
          </Link>

          <button>
            <FontAwesomeIcon
              className={cx("Covvvntsssentt_btn")}
              icon={faPen}
            />
            <Link to="/Update_list_music">
              {" "}
              <p>Chỉnh sửa</p>
            </Link>
          </button>
        </div>
      </div>
      {/* cung cap voi content-content in profile  */}
      <div className={cx("leduxa")}>
        <div className={cx("Cossssntsssentt_btn Cossssntsssdssentt_btn")}>
          <img
            className={cx("Cossssssssntsssentt_btn")}
            src={Img_item_content_profule}
          />
          <div>
            <p className={cx("Cosssssssssssfsdntsssentt_btn")}>
              Bài hát yêu thích
            </p>
            <p>Đang cập nhật</p>
          </div>
        </div>
        <div className={cx("Cossssntsssentt_btn Cossssntsssdssentt_btn")}>
          <img
            className={cx("Cossssssssntsssentt_btn")}
            src={Img_item_content_profule}
          />
          <div>
            <p className={cx("Cosssssssssssfsdntsssentt_btn")}>
              Bài hát yêu thích
            </p>
            <p>Đang cập nhật</p>
          </div>
        </div>
        <div className={cx("Cossssntsssentt_btn Cossssntsssdssentt_btn")}>
          <img
            className={cx("Cossssssssntsssentt_btn")}
            src={Img_item_content_profule}
          />
          <div>
            <p className={cx("Cosssssssssssfsdntsssentt_btn")}>
              Bài hát yêu thích
            </p>
            <p>Đang cập nhật</p>
          </div>
        </div>
        <div className={cx("Cossssntsssentt_btn Cossssntsssdssentt_btn")}>
          <img
            className={cx("Cossssssssntsssentt_btn")}
            src={Img_item_content_profule}
          />
          <div>
            <p className={cx("Cosssssssssssfsdntsssentt_btn")}>
              Bài hát yêu thích
            </p>
            <p>Đang cập nhật</p>
          </div>
        </div>
        <div className={cx("Cossssntsssentt_btn Cossssntsssdssentt_btn")}>
          <img
            className={cx("Cossssssssntsssentt_btn")}
            src={Img_item_content_profule}
          />
          <div>
            <p className={cx("Cosssssssssssfsdntsssentt_btn")}>
              Bài hát yêu thích
            </p>
            <p>Đang cập nhật</p>
          </div>
        </div>
        <div className={cx("Cossssntsssentt_btn Cossssntsssdssentt_btn")}>
          <img
            className={cx("Cossssssssntsssentt_btn")}
            src={Img_item_content_profule}
          />
          <div>
            <p className={cx("Cosssssssssssfsdntsssentt_btn")}>
              Bài hát yêu thích
            </p>
            <p>Đang cập nhật</p>
          </div>
        </div>
      </div>
      <div className={cx("hskjdh")}>
        <p>
          <FontAwesomeIcon className={cx("hskjdh_oco")} icon={faCirclePlay} />
          <span>maileduc chưa có video nào lưu trong sự kiện</span>
        </p>
      </div>
    </div>
  );
}

export default Content_main;
