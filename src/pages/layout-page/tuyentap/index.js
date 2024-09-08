import React from "react";
import Header from "../../../compodens/Layout/DefaultLayout/header";
import Sidebar from "../../../compodens/Layout/DefaultLayout/Sidebar";
import CONTENT1 from "../../../compodens/Layout/DefaultLayout/list-select/content-baihat/Content1";

import classnames from "classnames/bind";
import styles from "../layout-page-module.scss";
import BAIHAT from "../../../compodens/Layout/DefaultLayout/list-select/content-baihat/baihat";

const cx = classnames.bind(styles);

function PageTUYETAP() {
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
            <CONTENT1 />
          </div>
        </div>
        <div className={cx("Sider-bar-width")}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default PageTUYETAP;
