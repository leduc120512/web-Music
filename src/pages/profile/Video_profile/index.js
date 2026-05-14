import React from "react";
import classnames from "classnames/bind";
import styles from "../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faPen, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Img_item_content_profule from "./1473409265946.webp";

const cx = classnames.bind(styles);

const videoItems = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  title: index === 0 ? "Video yêu thích" : `Video ${index + 1}`,
  description: "Đang cập nhật",
}));

function Content_main() {
  return (
    <div className={cx("profileSection")}>
      <div className={cx("profileSectionHeader")}>
        <div>
          <p className={cx("sectionEyebrow")}>Video</p>
          <h2>Video đã lưu</h2>
        </div>
        <div className={cx("sectionActions")}>
          <Link to="/UpLoad" className={cx("primaryAction")}>
            <FontAwesomeIcon icon={faPlus} />
            Tải video
          </Link>
          <Link to="/Update_list_music" className={cx("secondaryAction")}>
            <FontAwesomeIcon icon={faPen} />
            Quản lý
          </Link>
        </div>
      </div>

      <div className={cx("playlistGrid")}>
        {videoItems.map((item) => (
          <article key={item.id} className={cx("playlistCard")}>
            <div className={cx("playlistCoverWrap")}>
              <img className={cx("playlistCover")} src={Img_item_content_profule} alt={item.title} />
              <span className={cx("playlistPlay")}>
                <FontAwesomeIcon icon={faCirclePlay} />
              </span>
            </div>
            <div className={cx("playlistInfo")}>
              <p className={cx("playlistTitle")}>{item.title}</p>
              <p className={cx("playlistDescription")}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={cx("profileEmptyState")}>
        <FontAwesomeIcon icon={faVideo} />
        <span>Bạn chưa có video nào được công khai.</span>
      </div>
    </div>
  );
}

export default Content_main;
