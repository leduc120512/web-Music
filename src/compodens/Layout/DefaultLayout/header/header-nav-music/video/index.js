import styles from "../../Header-module.scss";

import classnames from "classnames/bind";

const cx = classnames.bind(styles);
function VIDEO() {
  return (
    <div className={cx("video")}>
      <p>Việt Nam</p>
      <p>Mỹ</p>
      <p>Singapo</p>
    </div>
  );
}

export default VIDEO;
