import React from "react";
import styles from "./NAV-MAIN-MODULE.SCSS"; // Adjusted import path
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function NAV_main({ children }) {
  return <p className={cx("NAV_main")}>{children}</p>;
}

export default NAV_main;
