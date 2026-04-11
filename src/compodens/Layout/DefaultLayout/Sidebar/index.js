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

      <Box
        sx={{
          width: "100%",
          p: "16px",
          borderRadius: "16px",
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            sx={{
              minHeight: "unset",
              background: "#f5f5f5",
              borderRadius: "999px",
              padding: "4px",
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {[
              { label: "Việt Nam", value: "1" },
              { label: "Âu Mỹ", value: "2" },
              { label: "Hàn Quốc", value: "3" },
            ].map((item) => (
              <Tab
                key={item.value}
                label={item.label}
                value={item.value}
                sx={{
                  minHeight: "36px",
                  height: "36px",
                  borderRadius: "999px",
                  fontSize: "1.35rem",
                  textTransform: "none",
                  fontWeight: 500,
                  transition: "all 0.25s ease",
                  px: 2,
                  "&.MuiTab-root": {
                    color: "#38bdf8", // Xanh dương nhạt
                  },
                  "&:hover": {
                    background: "#1e293b", // Nền xanh đậm
                    color: "#0ea5e9", // Xanh dương sáng
                  },
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
                  },
                }}
              />
            ))}
          </TabList>

          <TabPanel value="1" sx={{ px: 0 }}>
            <Music_vn albumId={16} />
          </TabPanel>

          <TabPanel value="2" sx={{ px: 0 }}>
            <Music_chauau />
          </TabPanel>

          <TabPanel value="3" sx={{ px: 0 }}>
            <Music_han />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Siderbar;
