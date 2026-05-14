import React from "react";
import { Link } from "react-router-dom";
import styles from "./profile-module.scss";
import classnames from "classnames/bind";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faList,
  faMicrophone,
  faMusic,
  faPen,
  faRightFromBracket,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { logoutNow } from "../../../../../utils/authSession";

const cx = classnames.bind(styles);

const safeParseUser = () => {
  try {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  } catch (error) {
    return null;
  }
};

const Profile = () => {
  const user = safeParseUser();

  const menuItems = [
    { to: "/Profile", label: "Trang cá nhân", icon: faUser },
    { to: "/Profile/Maiprofile", label: "Playlist của tôi", icon: faList },
    { to: "/Profile/chinh-sua-thong-tin", label: "Chỉnh sửa thông tin", icon: faPen },
    { to: "/Profile/Friend_live", label: "Bạn bè", icon: faUsers },
    { to: "/dang-ky-tac-gia", label: "Đăng ký làm tác giả", icon: faMicrophone },
  ];

  const displayName = user?.fullName || user?.username || "Người dùng";
  const displayMeta = user?.email || user?.username || "Tài khoản của bạn";

  const handleLogout = () => {
    logoutNow("/");
  };

  return (
    <div className={cx("Profile")}>
      <div className={cx("profileHeader")}>
        <div className={cx("avatar")}>{displayName.charAt(0).toUpperCase()}</div>
        <div className={cx("profileInfo")}>
          <p className={cx("profileName")}>{displayName}</p>
          <p className={cx("profileMeta")}>{displayMeta}</p>
        </div>
      </div>

      <div className={cx("menuSection")}>
        <p className={cx("menuTitle")}>
          <FontAwesomeIcon icon={faMusic} />
          Nhạc của tôi
        </p>

        {menuItems.map((item) => (
          <Link key={item.to} className={cx("menuLink")} to={item.to}>
            <span className={cx("menuItem")}>
              <span className={cx("menuIcon")}>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className={cx("menuText")}>{item.label}</span>
              <FontAwesomeIcon className={cx("menuArrow")} icon={faChevronRight} />
            </span>
          </Link>
        ))}
      </div>

      <div className={cx("footerSection")}>
        <button type="button" className={cx("logoutBtn")} onClick={handleLogout}>
          <span className={cx("menuIcon")}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Profile;
