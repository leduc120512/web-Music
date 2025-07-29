import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Img_main from "./avatar_default_2020.png";
import classnames from "classnames/bind";
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
    "/profile/history", // index = 4
    "/profile/devices",
    "/profile/logout"
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Create_list() {
  const [value, setValue] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();

// Gán tab hiện tại dựa theo URL
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



  // Function to switch to the Playlist tab (index 2)
  const goToPlaylistTab = () => {
    setValue(2);
  };
  const goTovideoTab = () => {
    setValue(3);
  };

  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("pprofile")}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid className={cx("Update_list_music")} container spacing={2}>
            <Grid item md={2} xs={6}>
              <div className={cx("Profile_option")}>
                <div>
                  <img
                    className={cx("Profile_option_img")}
                    src={Img_main}
                    alt="Profile"
                  />
                  <p>Đức Lê</p>
                  <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Profile options"
                    className={cx("Profile_option_list")}
                    sx={{ borderRight: 1, borderColor: "divider" }}
                  >
                    <Tab
                      label="Quản lý tài khoản"
                      sx={{
                        fontSize: "12px",
                        color: "#1976d2",
                        marginTop: "20px",
                        fontWeight: "600",
                      }}
                      className={cx("MuiTab-root tab_font_size")}
                    />
                    <Tab
                      sx={{
                        fontSize: "12px",
                        color: "#1976d2",
                        fontWeight: "600",
                      }}
                      label="Bạn bè"
                      className={cx("MuiTab-root tab_font_size")}
                    />
                    <Tab
                      sx={{
                        fontSize: "12px",
                        color: "#1976d2",
                        fontWeight: "600",
                      }}
                      label="Playlist"
                      className={cx("MuiTab-root tab_font_size")}
                    />
                    <Tab
                      sx={{
                        fontSize: "12px",
                        color: "#1976d2",
                        fontWeight: "600",
                      }}
                      label="Video"
                      className={cx("MuiTab-root tab_font_size")}
                    />
                    <Tab
                      sx={{
                        fontSize: "12px",
                        color: "#1976d2",
                        fontWeight: "600",
                      }}
                      label="Lịch sử"
                      className={cx("MuiTab-root tab_font_size")}
                    />
                    <Tab
                      sx={{
                        fontSize: "12px",
                        color: "#1976d2",
                        fontWeight: "600",
                      }}
                      label="Quản lí thiết bị"
                      className={cx("MuiTab-root tab_font_size")}
                    />
                    <Tab
                      sx={{
                        fontSize: "12px",
                        color: "#1976d2",
                        fontWeight: "600",
                      }}
                      label="Đăng xuất"
                      className={cx(
                        "Profile_option_list_bottton",
                        "MuiTab-root",
                        "tab_font_size"
                      )}
                    />
                  </Tabs>
                </div>
              </div>
            </Grid>
            <Grid item md={7} xs={6}>
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
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Create_list;
