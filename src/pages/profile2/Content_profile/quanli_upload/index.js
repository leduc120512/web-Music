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
const tabStyles = {
  width: "110px",
  height: "20px !important", // Thêm !important
  padding: "0px",
  backgroundColor: "#e5e5e5",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#e74c3c",
  },
  "&:focus": {
    backgroundColor: "#e74c3c",
  },
};

export default function Leduc() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box>
          <div className={cx("Contedssdgsddgsgdntt")}>
            <p className={cx("Contedssasdgsddgsgdntt")}>TUI UPLOAD</p>{" "}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={tabStyles}
                className={cx("Consdtedsdntt")}
                label={<p className={cx("Contedsdntt")}>Video</p>}
                {...a11yProps(0)}
              />
              <Tab
                sx={tabStyles}
                className={cx("Consdtedsdntt")}
                label={<p className={cx("Contedsdntt")}>Hình Ảnh</p>}
                {...a11yProps(1)}
              />
            </Tabs>
          </div>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Upload_leduc />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Img_upload />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
