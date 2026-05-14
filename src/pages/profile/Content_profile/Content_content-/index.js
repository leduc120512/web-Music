import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../profile-module.scss";
import { faMicrophone, faPen, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

import Img_item_content_profule from "../1473409265946.webp";

const cx = classnames.bind(styles);

function Contentt() {
  return (
    <div className={cx("profileSection")}>
      <div className={cx("profileSectionHeader")}>
        <div>
          <p className={cx("sectionEyebrow")}>Tổng quan</p>
          <h2>Hồ sơ âm nhạc</h2>
        </div>
        <div className={cx("sectionActions")}>
          <Link to="/Create_list_music" className={cx("primaryAction")}>
            <FontAwesomeIcon icon={faPlus} />
            Tạo playlist
          </Link>
          <Link to="/Profile/chinh-sua-thong-tin" className={cx("secondaryAction")}>
            <FontAwesomeIcon icon={faPen} />
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      <article className={cx("overviewCard")}>
        <img className={cx("overviewCover")} src={Img_item_content_profule} alt="Bài hát yêu thích" />
        <div className={cx("overviewInfo")}>
          <p className={cx("overviewTitle")}>Bài hát yêu thích</p>
          <p>
            <FontAwesomeIcon icon={faMicrophone} />
            <span>Đang cập nhật</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faUser} />
            <span>Thông tin cá nhân sẽ hiển thị tại đây</span>
          </p>
        </div>
      </article>
    </div>
  );
}

export default Contentt;
