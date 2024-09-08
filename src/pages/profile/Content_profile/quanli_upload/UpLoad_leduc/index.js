import React, { useState } from "react";

import classnames from "classnames/bind";
import styles from "../../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateBack,
  faCircle,
  faCirclePlay,
  faCloudArrowUp,
  faMicrophone,
  faPen,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Img_item_content_profule from "../../1473409265946.webp";
const cx = classnames.bind(styles);

function Content_main() {
  return (
    <div className={cx("Contentt")}>
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
      <div className={cx("Cosssssssssssfsdsdgsddntsssentt_btn")}>
        <div className={cx("Cossssgasdgssssssssfsdsdgsddntsssentt_btn")}>
          <FontAwesomeIcon
            className={cx("Cosssssssssssdsdgsfsdntsssentt_btn")}
            icon={faUpload}
          />
        </div>
        <div className={cx("Cossddssssssssssfsdntsssentt_btn")}>
          <div className={cx("Cossddssssssssssfsdntsssentt_btn")}>
            <p className={cx("Cosssssssdgasdgssssfsdntsssentt_btn")}>
              {" "}
              Bạn chưa upload bài hát hoặc video nào
            </p>
            <p className={cx("Cossssdgssssssssfsdntsssentt_btn")}>
              Website NhacCuaTui là nơi bạn có thể thoải mái upload và chia sẻ
              giai điệu/video yêu thích đến bạn bè, cũng như lưu trữ những ký ức
              du dương cho riêng bạn.
            </p>
            <p className={cx("Csdgosssssdggdsssssssfsdntsssentt_btn")}>
              {" "}
              Hãy upload và chia sẻ niềm vui đến cộng đồng yêu nhạc khắp mọi nơi
            </p>
          </div>
          <button className={cx("Cosdgsagdsssssssssssfsdntsssentt_btn")}>
            <p className={cx("Cosssssssssssfsdntsssentt_btn")}>
              <FontAwesomeIcon
                className={cx("Cosssssssssdgssfsdntsssentt_btn")}
                icon={faCloudArrowUp}
              />
              <span>Tải lên</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Content_main;
