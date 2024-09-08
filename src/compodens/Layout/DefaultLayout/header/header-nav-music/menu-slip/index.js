import React from "react";
import styles from "../../Header-module.scss";
// Adjusted import path
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function Dldp() {
  return (
    <div>
      <div className={cx("sldfips")}>
        <div className={cx("das")}>
          <p>Nghệ Sĩ</p>
          <p>Tin Tức Âm nhạc</p>
        </div>
      </div>
    </div>
  );
}

export default Dldp;
