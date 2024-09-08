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
  faCircle,
  faCircleCheck,
  faClock,
  faMicrophone,
  faPencil,
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
function History() {
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
              icon={faTrash}
            />{" "}
            <span>Xóa</span>
          </button>
          <button>
            {" "}
            <FontAwesomeIcon
              className={cx("History_main_icon History_masin_icon ")}
              icon={faShare}
            />{" "}
            <span>Chia sẻ</span>
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
                label="Bài hát"
                {...a11yProps(0)}
                className={cx("History_dis history_cham")}
              />
              <Tab
                className={cx("History_dis")}
                label="Playlist"
                {...a11yProps(1)}
              />
              <Tab
                className={cx("History_dis history_cham_2")}
                label="Video"
                {...a11yProps(2)}
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
          <div className={cx("History_dis_item")}>
            {" "}
            <div className={cx("History_dis_item_details ")}>
              <FormControlLabel
                className={cx("History_dis_item_")}
                control={
                  <Checkbox checked={checked[0]} onChange={handleChange2} />
                }
              />
              <div className={cx("History_dis_item_music")}>
                <p className={cx("History_dis_item_dam")}>
                  I'M THINKING ABOUT YOU
                </p>
                <p>
                  ANH TRAI "SAY HI", RHYDER, WEAN, Đức Phúc, Gemini Hùng Huỳnh,
                  tlinh
                </p>
              </div>
            </div>
            <div className={cx("History_dis_item_list")}>
              <FontAwesomeIcon
                className={cx("History_dis_item_icon")}
                icon={faClock}
              />
              <p>22:16 - 14/08/2024</p>
            </div>
            <div className={cx("History_dis__delete")}>
              {" "}
              <button>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon")}
                  icon={faTrash}
                />{" "}
                <span>Xóa</span>
              </button>
              <button className={cx("History_main_ico0n")}>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon History_masin_icon ")}
                  icon={faPencil}
                />{" "}
                <span>Chỉnh sửa</span>
              </button>
            </div>
          </div>
          <div className={cx("History_dis_item")}>
            {" "}
            <div className={cx("History_dis_item_details ")}>
              <FormControlLabel
                className={cx("History_dis_item_")}
                control={
                  <Checkbox checked={checked[0]} onChange={handleChange2} />
                }
              />
              <div className={cx("History_dis_item_music")}>
                <p className={cx("History_dis_item_dam")}>
                  I'M THINKING ABOUT YOU
                </p>
                <p>
                  ANH TRAI "SAY HI", RHYDER, WEAN, Đức Phúc, Gemini Hùng Huỳnh,
                  tlinh
                </p>
              </div>
            </div>
            <div className={cx("History_dis_item_list")}>
              <FontAwesomeIcon
                className={cx("History_dis_item_icon")}
                icon={faClock}
              />
              <p>22:16 - 14/08/2024</p>
            </div>
            <div className={cx("History_dis__delete")}>
              {" "}
              <button>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon")}
                  icon={faTrash}
                />{" "}
                <span>Xóa</span>
              </button>
              <button className={cx("History_main_ico0n")}>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon History_masin_icon ")}
                  icon={faPencil}
                />{" "}
                <span>Chỉnh sửa</span>
              </button>
            </div>
          </div>
          <div className={cx("History_dis_item")}>
            {" "}
            <div className={cx("History_dis_item_details ")}>
              <FormControlLabel
                className={cx("History_dis_item_")}
                control={
                  <Checkbox checked={checked[0]} onChange={handleChange2} />
                }
              />
              <div className={cx("History_dis_item_music")}>
                <p className={cx("History_dis_item_dam")}>
                  I'M THINKING ABOUT YOU
                </p>
                <p>
                  ANH TRAI "SAY HI", RHYDER, WEAN, Đức Phúc, Gemini Hùng Huỳnh,
                  tlinh
                </p>
              </div>
            </div>
            <div className={cx("History_dis_item_list")}>
              <FontAwesomeIcon
                className={cx("History_dis_item_icon")}
                icon={faClock}
              />
              <p>22:16 - 14/08/2024</p>
            </div>
            <div className={cx("History_dis__delete")}>
              {" "}
              <button>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon")}
                  icon={faTrash}
                />{" "}
                <span>Xóa</span>
              </button>
              <button className={cx("History_main_ico0n")}>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon History_masin_icon ")}
                  icon={faPencil}
                />{" "}
                <span>Chỉnh sửa</span>
              </button>
            </div>
          </div>
          <div className={cx("History_dis_item")}>
            {" "}
            <div className={cx("History_dis_item_details ")}>
              <FormControlLabel
                className={cx("History_dis_item_")}
                control={
                  <Checkbox checked={checked[0]} onChange={handleChange2} />
                }
              />
              <div className={cx("History_dis_item_music")}>
                <p className={cx("History_dis_item_dam")}>
                  I'M THINKING ABOUT YOU
                </p>
                <p>
                  ANH TRAI "SAY HI", RHYDER, WEAN, Đức Phúc, Gemini Hùng Huỳnh,
                  tlinh
                </p>
              </div>
            </div>
            <div className={cx("History_dis_item_list")}>
              <FontAwesomeIcon
                className={cx("History_dis_item_icon")}
                icon={faClock}
              />
              <p>22:16 - 14/08/2024</p>
            </div>
            <div className={cx("History_dis__delete")}>
              {" "}
              <button>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon")}
                  icon={faTrash}
                />{" "}
                <span>Xóa</span>
              </button>
              <button className={cx("History_main_ico0n")}>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon History_masin_icon ")}
                  icon={faPencil}
                />{" "}
                <span>Chỉnh sửa</span>
              </button>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={cx("History_dis_item")}>
            {" "}
            <div className={cx("History_dis_item_details ")}>
              <FormControlLabel
                className={cx("History_dis_item_")}
                control={
                  <Checkbox checked={checked[4]} onChange={handleChange2} />
                }
              />
              <div className={cx("Histossry_dis_item_")}>
                <img className={cx("History_dis_item_IMG")} src={Imig_lis} />
                <div
                  className={cx(
                    "History_dis_item_music History_dis_item_music_ssit"
                  )}
                >
                  <p className={cx("History_dis_item_dam")}>Người kể tình ca</p>
                  <p>
                    <FontAwesomeIcon icon={faMicrophone} />
                    V.A
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("History_dis_item_list")}>
              <FontAwesomeIcon
                className={cx("History_dis_item_icon")}
                icon={faClock}
              />
              <p>22:16 - 14/08/2024</p>
            </div>
            <div className={cx("History_dis__delete")}>
              {" "}
              <button>
                {" "}
                <FontAwesomeIcon
                  className={cx("History_main_icon")}
                  icon={faTrash}
                />{" "}
                <span>Xóa</span>
              </button>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
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
      </div>
    </div>
  );
}

export default History;
