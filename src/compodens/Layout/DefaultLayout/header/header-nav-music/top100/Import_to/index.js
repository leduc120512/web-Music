import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import styles from "./Vietnam-module.scss";
import Header from "../../..";
import List_mui from "./list_muisic";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import imgt from "./12437.jpg";
import Text from "../../../../../../../pages/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCirclePlay,
  faCreditCard,
  faFaceFlushed,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
//grid
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
//tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Data() {
  //grid
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("data_gird_om")}>
        <div className={cx("data_gird")}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={7}>
              <div className={cx("Data_right")}>
                <Box className={cx("Data_right_box_main")}>
                  <div className={cx("Data_right_box__k")}>
                    <Box className={cx("Data_right_box")}>
                      <Tabs
                        className={cx("Data_right_box_1")}
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab
                          className={cx("Data_right_box_1")}
                          label={
                            <p className={cx("Data_right_nav")}>
                              Nhạc Thịnh Hành
                            </p>
                          }
                          {...a11yProps(0)}
                        />
                        <Tab
                          className={cx("Data_right_box_1")}
                          label={<p className={cx("Data_right_nav")}>V-Pop</p>}
                          {...a11yProps(1)}
                        />
                        <Tab
                          label={<p className={cx("Data_right_nav")}>C-Pop</p>}
                          {...a11yProps(2)}
                        />
                        <Tab
                          label={
                            <p className={cx("Data_right_nav")}>
                              Youtube Thịnh Hành
                            </p>
                          }
                          {...a11yProps(3)}
                        />
                        <Tab
                          label={
                            <p className={cx("Data_right_nav")}>
                              Remix Việt Top 50
                            </p>
                          }
                          {...a11yProps(4)}
                        />
                        <Tab
                          label={
                            <p className={cx("Data_right_nav")}>
                              Rap Việt Top 50
                            </p>
                          }
                          {...a11yProps(5)}
                          sx={{
                            "&.Mui-selected": {
                              color: "initial",
                            },
                            "&:not(.Mui-selected)": {
                              color: "black",
                            },
                          }}
                        />
                        <Tab
                          label={<FontAwesomeIcon icon={faFaceFlushed} />}
                          {...a11yProps(6)}
                        />
                      </Tabs>
                    </Box>
                    <div className={cx("Data_right_box_main_tas")}>
                      <p>Bảng xếp hạng top 9 thịnh hành</p>
                      <FontAwesomeIcon
                        className={cx("Data_right_sbox__k")}
                        icon={faCirclePlay}
                      />
                    </div>
                  </div>
                  <CustomTabPanel value={value} index={0}>
                    <List_mui />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <List_mui />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <List_mui />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={3}>
                    <List_mui />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={4}>
                    <List_mui />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={5}>
                    <List_mui />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={6}>
                    <List_mui />
                  </CustomTabPanel>
                </Box>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className={cx("Data_left")}>
                {/* //type hot scss sibar music list  */}
                <div className={cx("type-hot")}>
                  <Text>CHỦ ĐỀ HOT</Text>
                  <div className={cx("type-hot-list")}>
                    <img className={cx("type-hot-img")} src={imgt} />
                    <img className={cx("type-hot-img")} src={imgt} />
                    <img className={cx("type-hot-img")} src={imgt} />
                    <img className={cx("type-hot-img")} src={imgt} />
                    <img className={cx("type-hot-img")} src={imgt} />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Data;
