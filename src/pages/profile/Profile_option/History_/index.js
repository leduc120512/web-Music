// src/components/History.jsx
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import Imig_lis from "../../avatar_default_2020.png";

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


import historyApi from "../../../../api/historymusic";
import {useNavigate} from "react-router-dom"; // Đảm bảo đường dẫn đúng

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
  const [checked, setChecked] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [songs, setSongs] = React.useState([]);
  const [selectedSongIds, setSelectedSongIds] = React.useState([]);

  const navigate = useNavigate();


  const toggleCheck = (songId) => {
    setSelectedSongIds((prev) =>
        prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };


  React.useEffect(() => {
    historyApi.getRecentlyPlayed()
        .then((res) => {
          const data = res.data.data.content || [];
          setSongs(data);
          setChecked(new Array(data.length).fill(false));
        })
        .catch((err) => console.error("Lỗi tải lịch sử:", err));
  }, []);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div className={cx("History_main_main")}>
        <div className={cx("History_qia")}>
          <div className={cx("History_check")}>
            <button>
              <FontAwesomeIcon className={cx("History_main_icon")} icon={faTrash} />
              <span>Xóa</span>
            </button>
            <button>
              <FontAwesomeIcon className={cx("History_main_icon", "History_masin_icon")} icon={faShare} />
              <span>Chia sẻ</span>
            </button>
          </div>

          <Box className={cx("History History_0")}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Bài hát" {...a11yProps(0)} className={cx("History_dis", "history_cham")} />
              <Tab label="Playlist" {...a11yProps(1)} className={cx("History_dis")} />
              <Tab label="Video" {...a11yProps(2)} className={cx("History_dis", "history_cham_2")} />
            </Tabs>
          </Box>
        </div>

        <div>


          <CustomTabPanel value={value} index={0}>
            <button
                onClick={async () => {
                  if (selectedSongIds.length === 0) {
                    alert("Vui lòng chọn ít nhất một bài để xóa.");
                    return;
                  }

                  if (!window.confirm("Bạn có chắc muốn xóa những bài đã chọn không?")) return;

                  try {
                    await Promise.all(
                        selectedSongIds.map((id) => historyApi.removeSongFromHistory(id))
                    );
                    setSongs((prev) => prev.filter((s) => !selectedSongIds.includes(s.id)));
                    setSelectedSongIds([]);
                    alert("Đã xóa các bài đã chọn!");
                  } catch (err) {
                    console.error("Lỗi xóa nhiều:", err);
                    alert("Có lỗi xảy ra khi xóa!");
                  }
                }}
            >
              <FontAwesomeIcon className={cx("History_main_icon")} icon={faTrash}/>
              <span>Xóa</span>
            </button>
            {songs.map((song, index) => (
                <div   onClick={() => navigate(`/Nhac/${song.id}`)} key={song.id} className={cx("History_dis_item")}>
                  <div className={cx("History_dis_item_details")}>
                    <FormControlLabel
                        control={
                          <Checkbox
                              checked={selectedSongIds.includes(song.id)}
                              onChange={() => toggleCheck(song.id)}
                          />

                        }
                    />
                    <div className={cx("History_dis_item_music")}>
                      <p className={cx("History_dis_item_dam")}>{song.title}</p>
                      <p>{song.artistName}</p>
                    </div>
                  </div>
                  <div className={cx("History_dis_item_list")}>
                    <FontAwesomeIcon className={cx("History_dis_item_icon")} icon={faClock}/>
                    <p>{new Date(song.createdAt).toLocaleString()}</p>
                  </div>
                  <div className={cx("History_dis__delete")}>
                    <button
                        onClick={async () => {
                          try {
                            await historyApi.removeSongFromHistory(song.id);
                            // Xóa thành công → cập nhật lại danh sách UI
                            setSongs((prevSongs) => prevSongs.filter((s) => s.id !== song.id));
                            setChecked((prevChecked) => {
                              const newChecked = [...prevChecked];
                              newChecked.splice(index, 1); // xóa đúng vị trí checkbox tương ứng
                              return newChecked;
                            });
                            alert("Đã xóa khỏi lịch sử!");
                          } catch (error) {
                            console.error("Lỗi khi xóa:", error);
                            alert("Xóa không thành công!");
                          }
                        }}
                    >
                      <FontAwesomeIcon className={cx("History_main_icon")} icon={faTrash}/>
                      <span>Xóa</span>
                    </button>

                    <button>
                      <FontAwesomeIcon className={cx("History_main_icon", "History_masin_icon")} icon={faPencil}/>
                      <span>Chỉnh sửa</span>
                    </button>
                  </div>
                </div>
            ))}
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <div className={cx("History_dis_item")}>
              {" "}
              <div className={cx("History_dis_item_details ")}>
                <FormControlLabel
                    className={cx("History_dis_item_")}
                    control={
                      <Checkbox checked={checked[4]} onChange={() => toggleCheck(4)}/>

                    }
                />
                <div className={cx("Histossry_dis_item_")}>
                  <img className={cx("History_dis_item_IMG")} src={Imig_lis}/>
                  <div
                      className={cx(
                          "History_dis_item_music History_dis_item_music_ssit"
                      )}
                  >
                    <p className={cx("History_dis_item_dam")}>Người kể tình ca</p>
                    <p>
                      <FontAwesomeIcon icon={faMicrophone}/>
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
