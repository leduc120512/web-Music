import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Music_vn from "./muisic-vietnam";
import Music_han from "./music-anh";
import Music_chauau from "./Muisic-chauau";
import styles from "./Sider-bar-module.scss";
import classnames from "classnames/bind";
import Text from "../../../../pages/text";

const cx = classnames.bind(styles);

function Siderbar() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={cx("Sider-bar")}>
      <Text className={cx("Sider-bar-TEXT")}>BẢNG XẾP HẠNG</Text>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                className={cx("tab", "tab-1")}
                label="Việt Nam"
                value="1"
                sx={{ minHeight: "0", height: "30px" }}
              />
              <Tab
                className={cx("tab")}
                label="Âu Mỹ"
                value="2"
                sx={{ minHeight: "0", height: "30px" }}
              />
              <Tab
                className={cx("tab", "tab-3")}
                label="Hàn Quốc"
                value="3"
                sx={{ minHeight: "0", height: "30px" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Music_vn />
          </TabPanel>
          <TabPanel value="2">
            <Music_chauau />
          </TabPanel>
          <TabPanel value="3">
            <Music_han />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Siderbar;
