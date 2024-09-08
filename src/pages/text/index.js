// Text.js

import React from "react";
import styles from "./text-module.scss"; // Đường dẫn đúng đến file SCSS module

import classnames from "classnames/bind";

const cx = classnames.bind(styles);

const Text = ({ children }) => {
  return <div className={cx("text-main")}>{children}</div>;
};

export default Text;
