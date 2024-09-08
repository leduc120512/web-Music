import React from "react";
import styles from "./NAV-ITEM-MODULE.SCSS"; // Adjusted import path
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function NAV_ITEM({ children }) {
  return <div className={cx("NAV_ITEM")}>{children}</div>;
}

export default NAV_ITEM;
