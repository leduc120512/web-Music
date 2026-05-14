import * as React from "react";
import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

export default function FriendLive() {
  return (
    <div className={cx("profileSection")}>
      <div className={cx("profileSectionHeader")}>
        <div>
          <p className={cx("sectionEyebrow")}>Kết nối</p>
          <h2>Bạn bè</h2>
        </div>
      </div>

      <div className={cx("profileEmptyState", "profileEmptyStateLarge")}>
        <FontAwesomeIcon icon={faUserGroup} />
        <span>Bạn chưa có hoạt động bạn bè nào để hiển thị.</span>
      </div>
    </div>
  );
}
