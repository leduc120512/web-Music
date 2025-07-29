import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile-module.scss"; // Đường dẫn đúng đến file SCSS module
import { useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import ReusableModal from "../../../../../pages/Login_logOut/Login"; // Đảm bảo đường dẫn đúng
import Cookies from "js-cookie";
const cx = classnames.bind(styles);

const Profile = () => {

  const [openModal, setOpenModal] = useState(false);

  const handleLogoutClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
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


          <p onClick={handleLogout} style={{cursor: "pointer", color: "red"}}>
              Đăng xuất
          </p>


          <ReusableModal open={openModal} handleClose={handleCloseModal}/>
      </div>
  );
};

export default Profile;
