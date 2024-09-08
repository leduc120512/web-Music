import Header from "./header";
import Content from "./Content";
import Slide from "./slide-content";
import styles from "./Default-module.scss";

import classnames from "classnames/bind";
import Siderbar from "./Sidebar";

const cx = classnames.bind(styles);

function DefaultLayout() {
  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("Slide")}>
        <Slide />
      </div>
      <div className={cx("contentT")}>
        <div className={cx("Content-width")}>
          <Content />
        </div>
        <div className={cx("Sider-bar-width")}>
          <Siderbar />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
