import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import styles from "../profile-module.scss";
import { faCircleDot, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// grid
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Img_avatar from "../avatar_default_2020.png";
import Contentt from "./Content_content-";
import Sibar from "./Sibar";
import { Outlet } from "react-router-dom";
const cx = classnames.bind(styles);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Profilee_content() {
  return (
    <div className={cx("Profilee_content")}>
      <div className={cx("Profilee_main")}>
        <div className={cx("Profilesssssse_content")}>
          <div className={cx("Profilesse_content")}>
            <img className={cx("Profilee_content_img")} src={Img_avatar} />
            <div className={cx("Prossfileess_content_img")}>
              <p className={cx("Prossfilee_cossssntdddent_img")}>Đức Le</p>
              <p>ID: 45316683</p>
              <p>Tên thật: Đức Le</p>
              <p>Sinh nhật: Đang cập nhật</p>
              <p>Giới tính: Khác</p>
            </div>
          </div>
          <div className={cx("Prossfisdsslee_cossssntdddent_img")}>
            <div className={cx("Prossfisdsslessssse_cossssntdddent_img")}>
              <p className={cx("Prossfisdsslessssdddse_cossssntdddent_img")}>
                <span>17</span>
              </p>
              <p>Lượt xem profile</p>
            </div>
            <div className={cx("Prossfisdsslessssse_cossssntdddent_img")}>
              <p>
                <span>0</span>
              </p>
              <p>Lượt nghe playList</p>
            </div>
          </div>
        </div>
        <ul className={cx("Profilee_nAV")}>
          <li>
            {" "}
            <FontAwesomeIcon className={cx("Profilee_nAVsss")} icon={faHome} />
          </li>
          <Link to="/Profile/Maiprofile">
            <li>PlayList</li>
          </Link>
          <Link to="/Profile/Contentt_Video">
            {" "}
            <li> Video</li>
          </Link>
          <Link to="/Profile/upload_proifle">
            <li> Tui Upload</li>
          </Link>
          <Link to="/Profile/Friend_live">
            {" "}
            <li> Bạn Bè</li>
          </Link>
        </ul>

        <Box className={cx("Profilee_container")} sx={{ flexGrow: 1 }}>
          <Grid className={cx("Profilee_container")} container spacing={2}>
            <Grid className={cx("Profilee_Contetnt-")} item xs={8} md={7}>
              <Outlet />
            </Grid>
            <Grid className={cx("Profileesss_sibar-")} item xs={4} md={3}>
              <Sibar />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Profilee_content;
