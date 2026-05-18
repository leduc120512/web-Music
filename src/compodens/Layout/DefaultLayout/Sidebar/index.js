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
import RecommendedUsers from "./RecommendedUsers";

const cx = classnames.bind(styles);

const chartTabs = [
  { label: "Việt Nam", value: "1" },
  { label: "Âu Mỹ", value: "2" },
  { label: "Hàn Quốc", value: "3" },
];

function Siderbar() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <aside className={cx("Sider-bar")}>
      <Text className={cx("Sider-bar-TEXT")}>Bảng xếp hạng</Text>

      <Box
        sx={{
          width: "100%",
          p: "12px",
          borderRadius: "14px",
          background: "rgba(30,41,59,0.85)",
          boxShadow: "0 8px 24px rgba(16,21,30,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            variant="fullWidth"
            sx={{
              minHeight: "unset",
              background: "rgba(15,23,42,0.9)",
              borderRadius: "10px",
              padding: "4px",
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {chartTabs.map((item) => (
              <Tab
                key={item.value}
                label={item.label}
                value={item.value}
                sx={{
                  minHeight: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  fontSize: "1.25rem",
                  textTransform: "none",
                  fontWeight: 700,
                  transition: "all 0.25s ease",
                  px: 1,
                  color: "#cbd5e1",
                  "&:hover": {
                    background: "#334155",
                    color: "#38bdf8",
                  },
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, #0891b2, #0369a1)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(56, 189, 248, 0.24)",
                  },
                }}
              />
            ))}
          </TabList>

          <TabPanel value="1" sx={{ px: 0, pb: 0 }}>
            <Music_vn albumId={16} />
          </TabPanel>

          <TabPanel value="2" sx={{ px: 0, pb: 0 }}>
            <Music_chauau />
          </TabPanel>

          <TabPanel value="3" sx={{ px: 0, pb: 0 }}>
            <Music_han />
          </TabPanel>
        </TabContext>
      </Box>

      <RecommendedUsers />
    </aside>
  );
}

export default Siderbar;
