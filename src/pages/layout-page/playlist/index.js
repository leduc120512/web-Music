import React from "react";
import Header from "../../../compodens/Layout/DefaultLayout/header";
import Sidebar from "../../../compodens/Layout/DefaultLayout/Sidebar";
import Content from "../../../compodens/Layout/DefaultLayout/Content";

import classnames from "classnames/bind";
import styles from "../layout-page-module.scss";
import BAIHAT from "../../../compodens/Layout/DefaultLayout/list-select/content-baihat/baihat";

const cx = classnames.bind(styles);

function PagePlayList() {
  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("contentT CONTENTW")}>
        <div className={cx("Content-width")}>
          <BAIHAT />
          <div className={cx("COsNsTENTW")}>
            {" "}
            <Content />
          </div>
        </div>
        <div className={cx("Sider-bar-width")}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default PagePlayList;
