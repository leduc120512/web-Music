import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleCheck,
  faDeleteLeft,
  faMicrophone,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import img_lits_vidoe from "../../avatar_default_2020.png";

const cx = classnames.bind(styles);

function Video_profile() {
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

  return (
    <div>
      {" "}
      <div>
        <div className={cx("Video_profile")}>
          <FormControlLabel
            label="Chọn tất cả"
            className="form-control-label_hhsd"
            control={
              <Checkbox
                sx={{ fontSize: "20px", color: "#000" }}
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <button>
            <FontAwesomeIcon
              className={cx("Video_profile_icon")}
              icon={faTrash}
            />
            <p>Xóa</p>
          </button>
          <button className={cx("Video_profile_icon_btn")}>
            <p>Tạo video</p>
            <FontAwesomeIcon
              className={cx("Video_profile_icon")}
              icon={faPen}
            />{" "}
          </button>
        </div>
        {/* null  */}
        <div className={cx("Video_profile_null")}>
          <FontAwesomeIcon
            className={cx("Video_profile_icon_null")}
            icon={faCircleCheck}
          />
          <p>Bạn hiện chưa có video yêu thích nào</p>
        </div>
        <div>
          <div className={cx("Video_profile_manager")}>
            <div className={cx("Video_profile_masdsnager")}>
              <img
                className={cx("Video_profile_img lsd")}
                src={img_lits_vidoe}
              />
              <div className={cx("Video_proasfile_img")}>
                <p>Video yêu thích</p>
                <p className={cx("Viadessao_proasfile_img")}>
                  <span>
                    <FontAwesomeIcon icon={faMicrophone} />
                  </span>
                  Đang cập nhật
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={cx("Video_profile_manager")}>
            <div className={cx("Video_profile_masdsnager")}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked[0]} onChange={handleChange2} />
                }
              />
              <img className={cx("Video_profile_img")} src={img_lits_vidoe} />
              <div className={cx("Video_proasfile_img")}>
                <p>Video yêu thích</p>
                <p className={cx("Viadessao_proasfile_img")}>
                  <span>
                    <FontAwesomeIcon icon={faMicrophone} />
                  </span>
                  Đang cập nhật
                </p>
              </div>
            </div>
            <div className={cx("Video_profile__delete_update")}>
              <div className={cx("Video_profile__delete_updsate")}>
                <button className={cx("Video_profile__delaaete_updsate")}>
                  <FontAwesomeIcon
                    className={cx("Video_profile_icon")}
                    icon={faTrash}
                  />
                  <p>Xóa</p>
                </button>
                <button className={cx("Video_profile_icon_btn")}>
                  <p>Chỉnh sửa</p>
                  <FontAwesomeIcon
                    className={cx("Video_profile_icon")}
                    icon={faPen}
                  />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div>
          <div className={cx("Video_profile_manager")}>
            <div className={cx("Video_profile_masdsnager")}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked[1]} onChange={handleChange3} />
                }
              />
              <img className={cx("Video_profile_img")} src={img_lits_vidoe} />
              <div className={cx("Video_proasfile_img")}>
                <p>Video yêu thích</p>
                <p className={cx("Viadessao_proasfile_img")}>
                  <span>
                    <FontAwesomeIcon icon={faMicrophone} />
                  </span>
                  Đang cập nhật
                </p>
              </div>
            </div>
            <div className={cx("Video_profile__delete_update")}>
              <div className={cx("Video_profile__delete_updsate")}>
                <button className={cx("Video_profile__delaaete_updsate")}>
                  <FontAwesomeIcon
                    className={cx("Video_profile_icon")}
                    icon={faTrash}
                  />
                  <p>Xóa</p>
                </button>
                <button className={cx("Video_profile_icon_btn")}>
                  <p>Chỉnh sửa</p>
                  <FontAwesomeIcon
                    className={cx("Video_profile_icon")}
                    icon={faPen}
                  />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video_profile;
