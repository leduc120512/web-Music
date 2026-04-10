import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import classnames from "classnames/bind";
import Cookies from "js-cookie";

import Img_main from "./avatar_default_2020.png";
import styles from "./Create_list_music-module.scss";

import Header from "../../../../../compodens/Layout/DefaultLayout/header";
import History from "../../../Profile_option/History_/index.js";
import Manager_device from "../../../Profile_option/MANAGER_device/index.js";
import Manager_user from "../../../Profile_option/MANAGER_USER/index.js";
import Friend from "../../../Profile_option/friend/index.js";
import Playlist_profile from "../../../Profile_option/PlayList/index.js";
import LogOut from "../../../Profile_option/LogOut/index.js";
import Video from "../../../Profile_option/profile_Videos/index.js";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classnames.bind(styles);

const tabPaths = [
  "/profile/account",
  "/profile/friends",
  "/profile/playlist",
  "/profile/video",
  "/profile/history",
  "/profile/devices",
  "/profile/logout",
];

const tabLabels = [
  "Quản lý tài khoản",
  "Bạn bè",
  "Playlist",
  "Video",
  "Lịch sử",
  "Quản lý thiết bị",
  "Đăng xuất",
];

function TabPanel({ children, value, index }) {
  if (value !== index) return null;
  return <div className={cx("tabPanel")}>{children}</div>;
}

function Create_list() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  React.useEffect(() => {
    const index = tabPaths.indexOf(location.pathname);
    if (index !== -1) {
      setValue(index);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabPaths[newValue]);
  };

  const goToPlaylistTab = () => {
    setValue(2);
    navigate(tabPaths[2]);
  };

  const goTovideoTab = () => {
    setValue(3);
    navigate(tabPaths[3]);
  };

  const displayName = user?.fullName || user?.username || "Người dùng";
  const avatar = user?.avatar ? `http://localhost:8082${user.avatar}` : Img_main;

  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>

      <div className={cx("pprofile")}>
        <Box className={cx("profileWrapper")} sx={{ flexGrow: 1 }}>
          <Grid className={cx("Update_list_music")} container spacing={2}>
            <Grid item md={3} xs={12}>
              <aside className={cx("profileSidebar")}>
                <img
                  className={cx("Profile_option_img")}
                  src={avatar}
                  alt={displayName}
                />
                <p className={cx("profileName")}>{displayName}</p>
                <p className={cx("profileSub")}>Trung tâm tài khoản</p>

                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  aria-label="Profile options"
                  className={cx("Profile_option_list")}
                >
                  {tabLabels.map((label) => (
                    <Tab key={label} label={label} className={cx("tabItem")} />
                  ))}
                </Tabs>
              </aside>
            </Grid>

            <Grid item md={9} xs={12}>
              <section className={cx("profileContent")}>
                <TabPanel value={value} index={0}>
                  <Manager_user
                    goToPlaylistTab={goToPlaylistTab}
                    goTovideoTab={goTovideoTab}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Friend />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Playlist_profile />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Video goTovideoTab={goTovideoTab} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <History />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <Manager_device />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <LogOut />
                </TabPanel>
              </section>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Create_list;
