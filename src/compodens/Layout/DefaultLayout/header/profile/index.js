import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./profile-module.scss";
import classnames from "classnames/bind";
import Cookies from "js-cookie";

const cx = classnames.bind(styles);

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    navigate("/");
  };

  return (
    <div className={cx("Profile")}>
      <div className={cx("menuSection")}>
        <Link className={cx("menuLink")} to="/Profile">
          <span className={cx("menuItem")}>Trang cá nhân</span>
        </Link>
        <p className={cx("menuStatic")}>Nhạc của tui</p>
        <Link className={cx("menuLink")} to="/Profile/Maiprofile">
          <span className={cx("menuItem")}>PlayList</span>
        </Link>
        <Link className={cx("menuLink")} to="/Profile/chinh-sua-thong-tin">
          <span className={cx("menuItem")}>Chinh sua thong tin</span>
        </Link>
        <Link className={cx("menuLink")} to="/Profile/Friend_live">
          <span className={cx("menuItem")}>Ban be</span>
        </Link>

        <Link className={cx("menuLink")} to="/dang-ky-tac-gia">
          <span className={cx("menuItem")}>Đăng ký làm tác giả</span>
        </Link>
      </div>

      <div className={cx("footerSection")}>
        <button type="button" className={cx("logoutBtn")} onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Profile;
