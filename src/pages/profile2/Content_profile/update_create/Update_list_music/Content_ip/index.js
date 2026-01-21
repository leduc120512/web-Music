import React from "react";
import { useEffect, useState } from "react";

import Sortable from "sortablejs";

import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import Img_load from "../img-plist-full.jpg";
import classnames from "classnames/bind";
import styles from "../Update_list_music-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Modal_delete from "./modal_delete";

const cx = classnames.bind(styles);

// check box

const label = { inputProps: { "aria-label": "Checkbox demo" } };
function Update() {
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // save btn
  const [showMessage, setShowMessage] = useState(false);

  const handleSave = () => {
    setShowMessage(true);

    // Ẩn thông báo sau 3 giây (tùy chọn)
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };
  //Transfer List
  useEffect(() => {
    const example2Left = document.getElementById("example2Left");
    const example2Right = document.getElementById("example2Right");

    new Sortable(example2Left, {
      group: "shared",
      animation: 150,
    });

    new Sortable(example2Right, {
      group: "shared",
      animation: 150,
    });
  }, []);

  // select
  const [Eage, SsetAge] = React.useState("");

  const handleChange = (event) => {
    SsetAge(event.target.value);
  };
  return (
    <div className={cx("Update_list_music_item")}>
      <p className={cx("Update_list_mussssic_item")}>CẬP NHẬT PLAYLIST</p>
      <table>
        <tr>
          <td className={cx("Updawwtess_aaaaalist_music_item_input")}>
            Tên Playlist
          </td>{" "}
          <td className={cx("Update_listssssss_music_item_input")}>
            {" "}
            <input className={cx("Update_list_music_item_input")} type="text" />
          </td>
        </tr>{" "}
        <tr>
          <td className={cx("Updawwtess_aaaaalist_music_item_input")}>Ca sĩ</td>{" "}
          <td>
            <input className={cx("Update_list_music_item_input")} type="text" />
          </td>
        </tr>{" "}
        <tr>
          <td className={cx("Updawwtess_aaaaalist_music_item_input")}>
            Thể loại
          </td>{" "}
          <td>
            {" "}
            <select className={cx("Update_list_music_item_input")}>
              <option value="someOption">Some option</option>
              <option value="otherOption">Other option</option>
            </select>
          </td>
        </tr>{" "}
        <tr>
          <td>
            <div className={cx("Update_list_musssssic_item_input")}>
              <p className={cx("Updawwtess_aaaaalist_music_item_input")}>
                Hình ảnh playlist
              </p>
              <p className={cx("Update_list_aamusssssisssssc_item_input")}>
                (Hình tối thiểu 500 x 500 pixels. Nếu nhỏ hơn sẽ bị mất hình và
                lấy hình mặc định của NhacCuaTui)
              </p>
            </div>
          </td>{" "}
          <td>
            <div className={cx("Update_list_aamssssusssssisssssc_item_input")}>
              <img src={Img_load} />

              <input type="file" />
            </div>
          </td>
        </tr>{" "}
        <tr>
          <td className={cx("Updawwtess_aaaaalist_music_item_input")}>Mô tả</td>{" "}
          <td colSpan={1}>
            <textarea rows={4} />
          </td>
        </tr>
        <tr>
          <td className={cx("Updawwtess_aaaaalist_music_item_input")}>
            <div
              className={cx("Updawwtesssdagasgas_aaaaalist_music_item_input")}
            >
              <p> Danh sách bài hát</p>
              <p
                className={cx(
                  "Updawsdfawtesssdagasgas_aassagasaaalist_music_item_input"
                )}
              >
                (vuốt từ phải qua trái và ngược lại)
              </p>
            </div>
          </td>{" "}
          <td>
            <div className={cx("Updfffffawwtess_aaaaalist_music_item_input")}>
              <ul id="example2Left">
                {" "}
                <div>
                  {" "}
                  <input
                    placeholder="Nhập từ khóa tìm kiếm bài hát"
                    type="text"
                  />
                  <FontAwesomeIcon
                    className={cx(
                      "Updfffffawwtess_aaaaalist_music_itsssssem_input"
                    )}
                    icon={faMagnifyingGlass}
                  />
                </div>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
              </ul>

              <ul id="example2Right">
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
                <li>
                  <p>
                    1 SÁO <span> - Top Tây Bắc</span>
                  </p>
                </li>
              </ul>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>{" "}
          <td>
            <div>
              <Checkbox {...label} defaultChecked />

              <p>Đăng ký chọn lọc</p>
            </div>
          </td>
        </tr>
        {showMessage && (
          <tr className={cx("Updsdfasdasdasgate_btn_list")}>
            <td colSpan="4">
              <div className={cx("Updsdfasdate_btn_list")}>
                <FontAwesomeIcon
                  className={cx("Updsdfsdfaddsdate_btn_list")}
                  icon={faCircleXmark}
                />
                <p>Playlist ít nhất phải có một bài hát</p>
              </div>
            </td>{" "}
          </tr>
        )}
        <tr>
          <td></td>{" "}
          <td>
            {" "}
            <div>
              <Button
                onClick={handleSave}
                className={cx("Update_btn_list")}
                variant="contained"
              >
                <p>Lưu</p>
              </Button>{" "}
              <Button
                onClick={handleOpen}
                className={cx("Update_btn_list")}
                variant="contained"
              >
                <p> Xóa</p>
              </Button>{" "}
              <Modal_delete open={isModalOpen} handleClose={handleClose} />
              <Button className={cx("Update_btn_list")} variant="contained">
                <p>Trở lại</p>
              </Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Update;
