import React, { useState } from "react";

import classnames from "classnames/bind";
import styles from "./Sibar-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faMusic,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

import Switch from "@mui/material/Switch";

import Text from "../../../text";
const cx = classnames.bind(styles);

function Sibar() {
  //lyric
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // swich

  //btn music right :   const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const componentsArray = Array(15).fill(
    <div className={cx("Musiacsa_right_header")}>
      <FontAwesomeIcon className={cx("Musiac_righst_header")} icon={faMusic} />
      <div>
        <p className={cx("Musiac_righsst_header")}>10/10</p>
        <p className={cx("Maausiac_righstss_header")}>
          Anh trai say hi, phạm đình
        </p>
      </div>
    </div>
  );
  const displayedComponents = isExpanded
    ? componentsArray
    : componentsArray.slice(0, 5);
  return (
    <div className={cx("Sibar")}>
      <div className={cx("Sibar_conternt")}>
        <p className={cx("Sibarssss")}> GỢI Ý DÀNH CHO BẠN</p>
        <div className={cx("ssSibarssss")}>
          {" "}
          <p className={cx("Sibarssss")}>
            Thưởng thức những ca khúc phù hợp nhất với bạn
          </p>
        </div>
        <div className={cx("ssSibsssssarsssssssss")}>
          <FontAwesomeIcon className={cx("sssssdsjhsd")} icon={faPlay} />
          <p>Nghe bài hát</p>
        </div>
      </div>

      {/* //lấy từ nhạc ở bên Play_music-content /Play_music /page  */}
      <div className={cx("Music_right_header ssssssssdsjhsd")}>
        <div className={cx("Musisssac_right_header")}>
          <p className={cx(" dfiudsd ")}>CÓ THỂ BẠN THÍCH</p>
        </div>
        <div className={cx("Musiac_right_header")}>
          <div>
            {displayedComponents}

            <button
              className={cx("Maausiac_sssssrighstaaass_header")}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <p>{isExpanded ? "Rút Gọn" : "Xem Thêm"}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sibar;
