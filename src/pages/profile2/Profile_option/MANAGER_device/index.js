// src/components/profile/Manager_device.jsx
import React, { useEffect, useState } from "react";
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
import userApi from "../../../../api/api_user"; // <-- nhớ đúng path file api

const cx = classnames.bind(styles);

// tách nhanh browser & os từ userAgent (đơn giản, đủ dùng)
const parseUA = (ua = "") => {
  const info = { browser: "Unknown", os: "Unknown" };
  if (!ua) return info;
  if (/Chrome/i.test(ua)) info.browser = "CHROME";
  else if (/Firefox/i.test(ua)) info.browser = "FIREFOX";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) info.browser = "SAFARI";
  else if (/Edg/i.test(ua)) info.browser = "EDGE";
  else if (/Opera|OPR/i.test(ua)) info.browser = "OPERA";

  if (/Windows/i.test(ua)) info.os = "Windows";
  else if (/Mac OS X/i.test(ua)) info.os = "macOS";
  else if (/Android/i.test(ua)) info.os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) info.os = "iOS";
  else if (/Linux/i.test(ua)) info.os = "Linux";
  return info;
};

function Manager_device() {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET lịch sử đăng nhập của chính mình
  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const res = await userApi.getMyLogins(0, 10); // page,size tuỳ bạn
        // backend: { success: true, data: { content: [...] } }
        setLogins(res?.data?.data?.content || []);
      } catch (e) {
        console.error("Load login history failed:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLogins();
  }, []);

  if (loading) return <p>Đang tải lịch sử đăng nhập...</p>;

  return (
      <div>
        <p>Quản lí thiết bị</p>

        <p className={cx("Manager_device_p_k")}>
          {logins.length}/10 thiết bị đã được dùng để đăng nhập
        </p>

        <div className={cx("Managdssder_device__device")}>
          {logins.map((item, idx) => {
            const { browser, os } = parseUA(item.userAgent);
            return (
                <div key={item.id || idx} className={cx("Manager_device__device")}>
                  <div>
                    <FontAwesomeIcon
                        className={cx("Manager_device__devicion")}
                        icon={faWheelchairMove}
                    />
                    <div className={cx("Manager_devick__device")}>
                      <p className={cx("Manssager_device__device")}>{browser}</p>
                      <p className={cx("Masaanssager_device__device")}>
                        {item.ipAddress || "IP không xác định"}
                      </p>

                      <p className={cx("Masaanssager_device__device")}>
                        <FontAwesomeIcon
                            className={cx("Masaanssager_device__devdsdice")}
                            icon={faLaptop}
                        />
                        <span>{os} ({item.userAgent || "Không rõ thiết bị"})</span>
                      </p>

                      <p className={cx("Mashjbager_device__device")}>
                        <FontAwesomeIcon
                            className={cx("Mashjbasager_device__device")}
                            icon={faFolder}
                        />
                        <span>
                      {item.loginTime
                          ? new Date(item.loginTime).toLocaleString("vi-VN")
                          : "Thời gian không xác định"}
                    </span>
                      </p>

                      <p className={cx("Mashjbager_device__device")}>
                        <FontAwesomeIcon
                            className={cx("Mashasjbager_device__device")}
                            icon={faMagic}
                        />
                        <span>Vị trí chưa xác định</span>
                      </p>
                    </div>

                    {/* Đánh dấu bản ghi mới nhất là “Đang sử dụng” */}
                    <p className={cx(idx === 0 ? "Manasdklger_device__device" : "Manasdklger_device__device_sjd")}>
                      {idx === 0 ? "Đang sử dụng" : "Đăng xuất"}
                    </p>
                  </div>
                </div>
            );
          })}
        </div>

        <p className={cx("Manasdkdsdlger_device__device_sjd")}>
          <FontAwesomeIcon
              icon={faRightToBracket}
              className={cx("Manasdkddsdlger_device__device_sjd")}
          />
          <span>Đăng xuất toàn bộ</span>
        </p>
      </div>
  );
}

export default Manager_device;
