import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import classnames from "classnames/bind";
import styles from "../../profile-module.scss";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Imig_lis from "../../avatar_default_2020.png";

const cx = classnames.bind(styles);

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

// the same is history
// importaint
function Friend() {
  //check
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  // tab in mui
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={cx("History_main_main")}>
      <div className={cx("History_qia")}>
        <div className={cx("History_check")}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <button>
            {" "}
            <FontAwesomeIcon
              className={cx("History_main_icon")}
              icon={faShare}
            />{" "}
            <span>Chỉnh sửa</span>
          </button>
          <button>
            {" "}
            <FontAwesomeIcon
              className={cx("History_main_icon History_masin_icon ")}
              icon={faTrash}
            />{" "}
            <span>Xóa</span>
          </button>
        </div>
        <Box className={cx("History History_0 ")}>
          <Box className={cx("History_main History_0 ")}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Danh sách bạn bè"
                {...a11yProps(0)}
                className={cx("History_dis history_cham")}
              />
              <Tab
                className={cx("History_dis history_cham_2")}
                label="Chờ kết bạn"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
        </Box>{" "}
      </div>
      <div>
        <CustomTabPanel
          className={cx("History_dis_item_dj")}
          value={value}
          index={0}
        >
          {/* null  */}
          <div className={cx("Video_profile_null")}>
            <FontAwesomeIcon
              className={cx("Video_profile_icon_null")}
              icon={faCircleCheck}
            />
            <p>Bạn hiện chưa có Bạn bè nào</p>
          </div>
          <div className={cx("  Video_profile_not_selectnull")}>
            <FontAwesomeIcon
              className={cx("Video_profile_icon_null")}
              icon={faCircleCheck}
            />
            <p>Vui lòng chọn bạn bè</p>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={cx("Video_profile_null")}>
            <FontAwesomeIcon
              className={cx("Video_profile_icon_null")}
              icon={faCircleCheck}
            />
            <p>Bạn hiện chưa có lời mời kết bạn nào </p>
          </div>
          <div className={cx("  Video_profile_not_selectnull")}>
            <FontAwesomeIcon
              className={cx("Video_profile_icon_null")}
              icon={faCircleCheck}
            />
            <p>Vui lòng chọn bạn bè</p>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </div>
    </div>
  );
}

export default Friend;
