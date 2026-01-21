import React from "react";

import classnames from "classnames/bind";
import styles from "./profile_option-module.scss";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Img_main from "../avatar_default_2020.png";
import Video from "./profile_Videos";
import History from "./History_";
import Friend from "./friend";
import LogOut from "./LogOut";
import Manager_device from "./MANAGER_device";
import Playlist_profile from "./PlayList";
import Manager_user from "./MANAGER_USER/index.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const cx = classnames.bind(styles);

function Profile_option() {
  return (
    <div className={cx("Profile_option")}>
      <div className={cx("Profile_optsion")}>
        <img className={cx("Profile_option_img")} src={Img_main} />
        <p>Đức Lê</p>
        <ul className={cx("Profile_option_list")}>
          <li>Quản lý tài khoản</li>
          <li>Bạn bè</li>
          <li>Playlist</li>
          <li>Video</li>
          <li>Lịch sử</li>

          <li>Quản lí thiết bị</li>
          <li className={cx("Profile_option_list_bottton")}>Đăng xuất</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile_option;
