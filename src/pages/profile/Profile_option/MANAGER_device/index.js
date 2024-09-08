import React from "react";

import classnames from "classnames/bind";
import styles from "../../profile-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faLaptop,
  faMagic,
  faRightToBracket,
  faWheelchairMove,
} from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function Manager_device() {
  return (
    <div>
      <p>Quản lí thiết bị</p>
      <p className={cx("Manager_device_p_k")}>
        2/10 thiết bị đã được dùng để đăng nhập
      </p>
      <div className={cx("Managdssder_device__device")}>
        <div className={cx("Manager_device__device")}>
          <div>
            <FontAwesomeIcon
              className={cx("Manager_device__devicion")}
              icon={faWheelchairMove}
            />
            <div className={cx("Manager_devick__device")}>
              <p className={cx("Manssager_device__device")}>CHROME</p>
              <p className={cx("Masaanssager_device__device")}>128.0.0.0</p>
              <p className={cx("Masaanssager_device__device")}>
                <FontAwesomeIcon
                  className={cx("Masaanssager_device__devdsdice")}
                  icon={faLaptop}
                />
                <span>Windows PC(Windows Win 32)</span>
              </p>
              <p className={cx("Mashjbager_device__device")}>
                <FontAwesomeIcon
                  className={cx("Mashjbasager_device__device")}
                  icon={faFolder}
                />
                <span>Thứ 5, 29/08/2024 lúc 23:24:35</span>
              </p>
              <p className={cx("Mashjbager_device__device")}>
                <FontAwesomeIcon
                  className={cx("Mashasjbager_device__device")}
                  icon={faMagic}
                />
                <span>Hà nội việt nam</span>
              </p>
            </div>
            <p className={cx("Manasdklger_device__device")}>Đang sử dụng</p>
          </div>
        </div>
        <div className={cx("Manager_device__device")}>
          <div>
            <FontAwesomeIcon
              className={cx("Manager_device__devicion")}
              icon={faWheelchairMove}
            />
            <div className={cx("Manager_devick__device")}>
              <p className={cx("Manssager_device__device")}>CHROME</p>
              <p className={cx("Masaanssager_device__device")}>128.0.0.0</p>
              <p className={cx("Masaanssager_device__device")}>
                <FontAwesomeIcon
                  className={cx("Masaanssager_device__devdsdice")}
                  icon={faLaptop}
                />
                <span>Windows PC(Windows Win 32)</span>
              </p>
              <p className={cx("Mashjbager_device__device")}>
                <FontAwesomeIcon
                  className={cx("Mashjbasager_device__device")}
                  icon={faFolder}
                />
                <span>Thứ 5, 29/08/2024 lúc 23:24:35</span>
              </p>
              <p className={cx("Mashjbager_device__device")}>
                <FontAwesomeIcon
                  className={cx("Mashasjbager_device__device")}
                  icon={faMagic}
                />
                <span>Hà nội việt nam</span>
              </p>
            </div>
            <p className={cx("Manasdklger_device__device_sjd")}>Đăng xuất</p>
          </div>
        </div>
      </div>
      <p className={cx("Manasdkdsdlger_device__device_sjd")}>
        {" "}
        <FontAwesomeIcon
          icon={faRightToBracket}
          className={cx("Manasdkddsdlger_device__device_sjd")}
        />
        <span>Đăng xuất toàn bộ</span>
      </p>

      <p></p>
    </div>
  );
}

export default Manager_device;
