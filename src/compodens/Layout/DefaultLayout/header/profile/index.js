// Text.js

import React from "react";
import { Link } from "react-router-dom";
import styles from "./profile-module.scss"; // Đường dẫn đúng đến file SCSS module

import classnames from "classnames/bind";

const cx = classnames.bind(styles);

const Profile = () => {
  return (
    <div className={cx("Profile")}>
      <Link to="/Profile">
        {" "}
        <p>Trang cá nhân</p>
      </Link>
      <p>Nhạc của tui</p>
      <p>Tài khoản</p>
      <p>Lịch sử</p>
      <p>Đăng xuất</p>
    </div>
  );
};

export default Profile;
