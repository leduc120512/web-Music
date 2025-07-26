import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import img_list_video from "./1473409265946.webp";
import Cookies from "js-cookie";
import Crud from "../../../../crud/index"
import userApi from "../../../../api/api_user";
const cx = classnames.bind(styles);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const userCookie = Cookies.get("user");
const user = userCookie ? JSON.parse(userCookie) : null;
function Manager_user({ goToPlaylistTab, goTovideoTab }) {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item md={5} xs={8}>
            <div className={cx("Manager_user")}>
              <p>QUẢN LÍ TÀI KHOẢN</p>
              <div className={cx("Manager_user_box")}>
                <div>
                  <p>Giới thiệu</p>
                  <div>
                    <p>ID: 45316683</p>
                    <p>Họ và tên: {user.fullName}</p>
                    <p>Ngày tạo tài khoản: {user.created_at}</p>


                  </div>
                </div>


                <Crud api={userApi.updateMe} initialData={user} />


              </div>
            </div>
            <div className={cx("Manager_user list_box_Manager_user")}>
              <div className={cx("Manager_user_box")}>
                <div>
                  <p>Tài khoản</p>
                  <div>
                    <p>Tên tài khoản: {user.username}</p>
                    <p>Gmail: {user.email}</p>
                    <p>
                      Mật khẩu:<span>Đổi mật khẩu</span>
                    </p>
                    <p>
                      Email: mailleduc05122004@gmail.com{" "}
                      <span>(Kích hoạt tài khoản)</span>
                    </p>
                    <p>Ngày hết hạn: Bạn chưa có Tài khoản VIP</p>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={7} xs={4}>
            <div className={cx("Manager_user_uset")}>
              <div>
                <p>Play list</p>
                <ul>
                  <li>
                    <img src={img_list_video} alt="Video thumbnail" />
                  </li>
                  <li>
                    <img src={img_list_video} alt="Video thumbnail" />
                  </li>
                  <li>
                    <img src={img_list_video} alt="Video thumbnail" />
                  </li>
                  <li>
                    <div
                      className={cx("Manager_user_uset_link")}
                      onClick={goToPlaylistTab} // Add the click event here
                    >
                      <p className={cx("Manager_user_usssset_link_isdd")}>13</p>
                      <p className={cx("Manager_user_uset_link_iss")}>
                        playlist
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx("Manager_user_uset iashdjf")}>
              <div>
                <p>Video</p>
                <div className={cx("Manager_user_uset_link_video")}>
                  <div onClick={goTovideoTab}>
                    <p className={cx("Manager_user_usssset_link_isdd")}>13</p>
                    <p className={cx("Manager_user_uset_link_iss")}>video</p>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Manager_user;
