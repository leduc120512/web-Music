import { React, useState } from "react";

import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Content-module.scss";
import { faMicrophone, faPen, faUser } from "@fortawesome/free-solid-svg-icons";

import Img_item_content_profule from "../1473409265946.webp";

import Create_content from "./Create_play_list";
const cx = classnames.bind(styles);

function Contentt() {
  // open modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className={cx("Contentt")}>
      <div className={cx("Contsssentt")}>
        {" "}
        <p>PLAYLIST | ALBULM</p>
        <div>
          <Link to="/Create_list_music">
            <button className={cx("Contsssentt_btn")} onClick={handleOpen}>
              <FontAwesomeIcon
                className={cx("Covvvntsssentt_btn")}
                icon={faPen}
              />
              <p>Tạo playList</p>
            </button>
          </Link>

          <Create_content open={isModalOpen} handleClose={handleClose} />
          <button>
            <FontAwesomeIcon
              className={cx("Covvvntsssentt_btn")}
              icon={faPen}
            />
            <Link to="/Update_list_music">
              {" "}
              <p>Chỉnh sửa</p>
            </Link>
          </button>
        </div>
      </div>
      <div className={cx("Cossssntsssentt_btn")}>
        <img
          className={cx("Cossssssssntsssentt_btn")}
          src={Img_item_content_profule}
        />
        <div>
          <p>Bài hát yêu thích</p>
          <p>
            <FontAwesomeIcon
              className={cx("Cossssssssntssssssentt_btn")}
              icon={faMicrophone}
            />
            <span>Đang cập nhật</span>
          </p>
          <p>
            <FontAwesomeIcon
              className={cx("Cossssssssntssssssentt_btn")}
              icon={faUser}
            />
            <span>gg.mailleduc05122004</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contentt;
