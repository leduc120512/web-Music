import React from "react";
import Header from "../../../compodens/Layout/DefaultLayout/header";
import Content from "../../../compodens/Layout/DefaultLayout/Content";

import classnames from "classnames/bind";
import styles from "../layout-page-module.scss";
import BAIHAT from "../../../compodens/Layout/DefaultLayout/list-select/content-baihat/baihat";

const cx = classnames.bind(styles);

function Pagevideo() {
  return (
    <div className={cx("Appa")}>
      <div className={cx("Appa1")}>
        <div className={cx("header")}>
          <Header />
        </div>
        <div className={cx("contengttTw")}>
          <div className={cx("Content-width-ode")}>
            <BAIHAT />
          </div>
          <div className={cx("CsssOsNsTENTW")}>
            {" "}
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagevideo;
