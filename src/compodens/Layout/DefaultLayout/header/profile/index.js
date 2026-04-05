import React from "react";
import { Link } from "react-router-dom";
import styles from "./profile-module.scss"; // Đường dẫn đúng đến file SCSS module
import { useNavigate } from "react-router-dom";
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
          <Link to="/Profile">
              <p>Trang cá nhân</p>
          </Link>
          <p>Nhạc của tui</p>

          <Link to="/profile/account">
              <p>Tài khoản</p>
          </Link>

          <Link to="/profile/history">
              <p>Lịch sử Xem</p>
          </Link>
          <button type="button" className={cx("logoutBtn")} onClick={handleLogout}>
              Đăng xuất
          </button>
      </div>
  );
};

export default Profile;
