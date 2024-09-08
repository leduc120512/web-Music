import * as React from "react";

import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

export default function Leduc() {
  return (
    <div className={cx("hskjdh")}>
      <p>
        <FontAwesomeIcon className={cx("hskjdh_oco")} icon={faCirclePlay} />
        <span>maileduc chưa có video nào lưu trong sự kiện</span>
      </p>
    </div>
  );
}
