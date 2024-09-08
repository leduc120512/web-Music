import React from "react";
import styles from "../../Header-module.scss"; // Adjusted import path
import NAV_main from "../../nav-header/NAV-MAIN"; // Adjusted import path
import classnames from "classnames/bind";
import NAV_ITEM from "../../nav-header/NAV-ITEM";

const cx = classnames.bind(styles);

function BXH() {
  return (
    <div className={cx("BXH")}>
      <div className={cx("BXH-list")}>
        <span className={cx("NAV_main")}>VIỆT NAM</span>
        <div>
          {" "}
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
        </div>
      </div>
      <div className={cx("BXH-list")}>
        <span className={cx("NAV_main")}>ÂU MỸ</span>
        <div>
          {" "}
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
        </div>
      </div>
      <div className={cx("BXH-list")}>
        <span className={cx("NAV_main")}>CHÂU Á</span>
        <div>
          {" "}
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
        </div>
      </div>
      <div className={cx("BXH-list")}>
        <span className={cx("NAV_main")}>KHÁC</span>
        <div>
          {" "}
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
          <span className={cx("NAV_ITEM")}>NHẠC TRỮ TÌNH</span>
        </div>
      </div>
    </div>
  );
}

export default BXH;
