import React from "react";
import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faPen, faPlus, faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Img_item_content_profule from "../1473409265946.webp";

const cx = classnames.bind(styles);

const playlistItems = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  title: index === 0 ? "Bài hát yêu thích" : `Playlist ${index + 1}`,
  description: "Đang cập nhật",
}));

function Content_main() {
  return (
    <div className={cx("profileSection")}>
      <div className={cx("profileSectionHeader")}>
        <div>
          <p className={cx("sectionEyebrow")}>Thư viện</p>
          <h2>Playlist và album</h2>
        </div>
        <div className={cx("sectionActions")}>
          <Link to="/Create_list_music" className={cx("primaryAction")}>
            <FontAwesomeIcon icon={faPlus} />
            Tạo playlist
          </Link>
          <Link to="/Update_list_music" className={cx("secondaryAction")}>
            <FontAwesomeIcon icon={faPen} />
            Chỉnh sửa
          </Link>
        </div>
      </div>

      <div className={cx("playlistGrid")}>
        {playlistItems.map((item) => (
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
        <FontAwesomeIcon icon={faRecordVinyl} />
        <span>Bạn chưa có video nào được lưu trong sự kiện.</span>
      </div>
    </div>
  );
}

export default Content_main;
