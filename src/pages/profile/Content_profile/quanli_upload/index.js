import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import Upload_leduc from "./UpLoad_leduc";
import Img_upload from "./Upload_img";

const cx = classnames.bind(styles);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`upload-tabpanel-${index}`}
      aria-labelledby={`upload-tab-${index}`}
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
    id: `upload-tab-${index}`,
    "aria-controls": `upload-tabpanel-${index}`,
  };
}

const tabStyles = {
  minWidth: 112,
  minHeight: 38,
  color: "#cbd5e1",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "1.3rem",
  fontWeight: 700,
  "&.Mui-selected": {
    color: "#ffffff",
    backgroundColor: "rgba(14, 116, 144, 0.55)",
  },
};

export default function UploadManager() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={cx("profileSection")}>
      <div className={cx("profileSectionHeader")}>
        <div>
          <p className={cx("sectionEyebrow")}>Nội dung</p>
          <h2>Tải lên của tôi</h2>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Quản lý nội dung tải lên"
          className={cx("uploadTabs")}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <Tab sx={tabStyles} label="Video" {...a11yProps(0)} />
          <Tab sx={tabStyles} label="Hình ảnh" {...a11yProps(1)} />
        </Tabs>
      </div>

      <CustomTabPanel value={value} index={0}>
        <Upload_leduc />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Img_upload />
      </CustomTabPanel>
    </div>
  );
}
