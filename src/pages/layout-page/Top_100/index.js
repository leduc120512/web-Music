import Header from "../../../compodens/Layout/DefaultLayout/header";
import Content from "../../../compodens/Layout/DefaultLayout/Content";

import classnames from "classnames/bind";
import styles from "./top_100_module.scss";
import BAIHAT from "../../../compodens/Layout/DefaultLayout/list-select/content-baihat/baihat";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Img_h from "./1699029204532.jpg";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCirclePlay,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Imr from "./1600250876973.webp";
const cx = classnames.bind(styles);
// styles tab

function Top100_() {
  //tab
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>

      <Grid className={cx("lew")} container spacing={2}>
        <Grid item md={7} sm={5} xs={12}>
          <div className={cx("lew_left")}>
            <p className={cx("lew_top")}>TOP 100 VIỆT NAM </p>
            <p className={cx("lew_detail")}>
              TOP 100 là danh sách 100 bài hát hot nhất thuộc các thể loại nhạc
              được nghe nhiều nhất trên NhacCuaTui. Danh sách bài hát này được
              hệ thống tự động đề xuất dựa trên lượt nghe, lượt share v.v của
              từng bài hát trên tất cả các nền tảng (Web, Mobile web, App). Top
              100 sẽ được cập nhật mỗi ngày dựa trên các chỉ số có được từ ngày
              đó.
            </p>
            <p className={cx("lew_time")}>
              * TOP 100 vừa được cập nhật vào: <span>11:54 23/05/2024 </span>
            </p>
            <Box>
              <TabContext value={value}>
                <Box>
                  <TabList
                    className={cx("lew_time_see")}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={{
                      ".MuiTabs-indicator": {
                        display: "none", // Ẩn thanh indicator
                      },
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Tab
                      className={cx("lew_tab")}
                      sx={{
                        minHeight: "0",
                        height: "30px",
                        marginLeft: "10px !important",

                        backgroundColor: value === "1",
                        "&:focus": {
                          backgroundColor: "#e74c3c",
                        },
                      }}
                      label={
                        <p className={cx("lew_tab-p")}>
                          <FontAwesomeIcon icon={faChevronRight} />

                          <span> Nhạc trẻ</span>
                        </p>
                      }
                      value="1"
                    />
                    <Tab
                      className={cx("lew_tab")}
                      sx={{
                        minHeight: "0",
                        height: "30px",
                        backgroundColor:
                          value === "2" ? "#e0e0e0" : "transparent",
                        "&:focus": {
                          backgroundColor: "#e74c3c",
                        },
                      }}
                      label={
                        <p className={cx("lew_tab-p")}>
                          <FontAwesomeIcon icon={faChevronRight} />

                          <span> Trữ tình</span>
                        </p>
                      }
                      value="2"
                    />
                    <Tab
                      className={cx("lew_tab")}
                      sx={{
                        minHeight: "0",
                        height: "30px",
                        backgroundColor:
                          value === "3" ? "#e0e0e0" : "transparent",
                        "&:focus": {
                          backgroundColor: "#e74c3c",
                        },
                      }}
                      label={
                        <p className={cx("lew_tab-p")}>
                          <FontAwesomeIcon icon={faChevronRight} />

                          <span> Nhạc trịnh</span>
                        </p>
                      }
                      value="3"
                    />
                    <Tab
                      className={cx("lew_tab")}
                      sx={{
                        minHeight: "0",
                        height: "30px",

                        backgroundColor: value === "1",
                        "&:focus": {
                          backgroundColor: "#e74c3c",
                        },
                      }}
                      label={
                        <p className={cx("lew_tab-p")}>
                          <FontAwesomeIcon icon={faChevronRight} />

                          <span> Tiền chiến</span>
                        </p>
                      }
                      value="4"
                    />
                    <Tab
                      className={cx("lew_tab")}
                      sx={{
                        minHeight: "0",
                        height: "30px",

                        backgroundColor: value === "1",
                        "&:focus": {
                          backgroundColor: "#e74c3c",
                        },
                      }}
                      label={
                        <p className={cx("lew_tab-p")}>
                          <FontAwesomeIcon icon={faChevronRight} />

                          <span> Rap việt</span>
                        </p>
                      }
                      value="5"
                    />
                    <Tab
                      className={cx("lew_tab")}
                      sx={{
                        minHeight: "0",
                        height: "30px",

                        backgroundColor: value === "1",
                        "&:focus": {
                          backgroundColor: "#e74c3c",
                        },
                      }}
                      label={
                        <p className={cx("lew_tab-p")}>
                          <FontAwesomeIcon icon={faChevronRight} />

                          <span>Remix</span>
                        </p>
                      }
                      value="6"
                    />
                  </TabList>
                  <div className={cx("lew__p djjjrneutpodiu")}>
                    <p className={cx(" djjjrneutpodiu")}>
                      100 ca khúc <b>Nhạc Trẻ </b>hay nhất trên NhacCuaTui
                    </p>
                    <p className={cx(" djjjrneutpoiu")}>
                      <FontAwesomeIcon
                        className={cx("lew__p_")}
                        icon={faCirclePlay}
                      />
                      Xem toàn bộ
                    </p>
                  </div>
                </Box>
                <TabPanel value="1">
                  <div className={cx("lew_tabpanel")}>
                    <div className={cx("lew_tabpanel_list")}>
                      <p>1</p>
                      <img src={Img_h} />
                      <div className={cx("leeetw_tabpanel")}>
                        <p>Khóa Ly Biệt</p>
                        <p className={cx("leesetw_tabpanel")}>
                          The Masked Singer, Voi Bản Đôn
                        </p>
                      </div>
                    </div>
                    <div className={cx("lew_tabdfspanel_list")}>
                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faHeart}
                      />

                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faPlay}
                      />
                    </div>
                  </div>
                  <div className={cx("lew_tabpanel")}>
                    <div className={cx("lew_tabpanel_list")}>
                      <p>2</p>
                      <img src={Img_h} />
                      <div className={cx("leeetw_tabpanel")}>
                        <p>Khóa Ly Biệt</p>
                        <p className={cx("leesetw_tabpanel")}>
                          The Masked Singer, Voi Bản Đôn
                        </p>
                      </div>
                    </div>
                    <div className={cx("lew_tabdfspanel_list")}>
                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faHeart}
                      />

                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faPlay}
                      />
                    </div>
                  </div>
                  <div className={cx("lew_tabpanel")}>
                    <div className={cx("lew_tabpanel_list")}>
                      <p>3</p>
                      <img src={Img_h} />
                      <div className={cx("leeetw_tabpanel")}>
                        <p>Khóa Ly Biệt</p>
                        <p className={cx("leesetw_tabpanel")}>
                          The Masked Singer, Voi Bản Đôn
                        </p>
                      </div>
                    </div>
                    <div className={cx("lew_tabdfspanel_list")}>
                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faHeart}
                      />

                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faPlay}
                      />
                    </div>
                  </div>
                  <div className={cx("lew_tabpanel")}>
                    <div className={cx("lew_tabpanel_list")}>
                      <p>4</p>
                      <img src={Img_h} />
                      <div className={cx("leeetw_tabpanel")}>
                        <p>Khóa Ly Biệt</p>
                        <p className={cx("leesetw_tabpanel")}>
                          The Masked Singer, Voi Bản Đôn
                        </p>
                      </div>
                    </div>
                    <div className={cx("lew_tabdfspanel_list")}>
                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faHeart}
                      />

                      <FontAwesomeIcon
                        className={cx("lewd_tabpanel")}
                        icon={faPlay}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Three</TabPanel>
                <TabPanel value="5">Item Three</TabPanel>
                <TabPanel value="6">Item Three</TabPanel>
              </TabContext>
            </Box>{" "}
          </div>
        </Grid>
        <Grid item md={3} xs={12}>
          <div className={cx("lew_right")}>
            <div className={cx("lesw_right")}></div>
            <div className={cx("ledsdgw_right")}>
              <div className={cx("ledsdgdsw_right")}>
                <p className={cx("ledsdgdswd_right")}>
                  <span>TOP 100 KHÔNG LỜI </span>
                  <FontAwesomeIcon
                    className={cx("ledsfrsdgw_right")}
                    icon={faChevronRight}
                  />
                </p>
                <div src={Imr} className={cx("ledsfrsfdgws_right")}>
                  <img src={Imr} className={cx("ledsfrsdgws_right")} />
                  <p className={cx("ledsdsfrsdgws_right")}>
                    Top 100 Nhạc Không Lời Hay Nhất
                  </p>
                </div>
              </div>
              <div className={cx("ledsdgdsw_right")}>
                <p className={cx("ledsdgdswd_right")}>
                  <span>TOP 100 KHÔNG LỜI </span>
                  <FontAwesomeIcon
                    className={cx("ledsfrsdgw_right")}
                    icon={faChevronRight}
                  />
                </p>
                <div src={Imr} className={cx("ledsfrsfdgws_right")}>
                  <img src={Imr} className={cx("ledsfrsdgws_right")} />
                  <p className={cx("ledsdsfrsdgws_right")}>
                    Top 100 Nhạc Không Lời Hay Nhất
                  </p>
                </div>
              </div>
              <div className={cx("ledsdgdsw_right")}>
                <p className={cx("ledsdgdswd_right")}>
                  <span>TOP 100 KHÔNG LỜI </span>
                  <FontAwesomeIcon
                    className={cx("ledsfrsdgw_right")}
                    icon={faChevronRight}
                  />
                </p>
                <div src={Imr} className={cx("ledsfrsfdgws_right")}>
                  <img src={Imr} className={cx("ledsfrsdgws_right")} />
                  <p className={cx("ledsdsfrsdgws_right")}>
                    Top 100 Nhạc Không Lời Hay Nhất
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Top100_;
