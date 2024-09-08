import React from "react";

import classnames from "classnames/bind";
import styles from "./profile-module.scss";

import Header from "../../compodens/Layout/DefaultLayout/header";
import Content_profile from "./Content_profile";

const cx = classnames.bind(styles);

function Profilee() {
  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("pprofile")}>
        <Content_profile />
      </div>
    </div>
  );
}

export default Profilee;
