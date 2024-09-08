import styles from "../../Header-module.scss";

import classnames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
function TOP100() {
  return (
    <div className={cx(" WITDHTOP100")}>
      <div className={cx("BXH-list dd")}>
        <div>
          {" "}
          <p className={cx("NAV_ITEM")}>Việt Nam</p>
          <p className={cx("NAV_ITEM")}>Âu Mỹ</p>
          <p className={cx("NAV_ITEM")}>Hàn Quốc</p>
        </div>
      </div>
    </div>
  );
}

export default TOP100;
