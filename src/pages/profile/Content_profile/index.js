import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import styles from "../profile-module.scss";
import {
  faCalendarDays,
  faEnvelope,
  faHome,
  faIdBadge,
  faList,
  faMicrophone,
  faPenToSquare,
  faUpload,
  faUserGroup,
  faVenusMars,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Img_avatar from "../avatar_default_2020.png";
import Sibar from "./Sibar";

const cx = classnames.bind(styles);

const PROFILE_NAV_ITEMS = [
  { to: "/Profile/chinh-sua-thong-tin", label: "Thông tin", icon: faPenToSquare },
  { to: "/Profile/Maiprofile", label: "Playlist", icon: faList },
  { to: "/Profile/Contentt_Video", label: "Video", icon: faVideo },
  { to: "/Profile/upload_proifle", label: "Tải lên", icon: faUpload },
  { to: "/Profile/Friend_live", label: "Bạn bè", icon: faUserGroup },
  { to: "/Profile/author-request", label: "Tác giả", icon: faMicrophone },
];

const readUserFromCookie = () => {
  const raw = Cookies.get("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const buildAvatarUrl = (avatar) => {
  if (!avatar) return Img_avatar;
  if (avatar.startsWith("http")) return avatar;
  return `http://localhost:8082${avatar}`;
};

function Profilee_content() {
  const [user, setUser] = useState(() => readUserFromCookie());
  const location = useLocation();

  useEffect(() => {
    const syncUser = () => setUser(readUserFromCookie());
    window.addEventListener("profile-updated", syncUser);
    return () => window.removeEventListener("profile-updated", syncUser);
  }, []);

  const userMeta = useMemo(
    () => ({
      displayName: user?.fullName || user?.username || "Người dùng",
      displayId: user?.id || "---",
      displayGender: user?.gender || "Chưa cập nhật",
      avatar: buildAvatarUrl(user?.avatar || user?.avatarUrl),
      birthday: user?.birthday || user?.birthDate || "Đang cập nhật",
      username: user?.username || "Chưa cập nhật",
      email: user?.email || "Chưa cập nhật",
    }),
    [user]
  );

  return (
    <div className={cx("Profilee_content")}>
      <div className={cx("profilePageShell")}>
        <aside className={cx("profileSidebar")}>
          <section className={cx("profileCard")}>
            <img className={cx("profileAvatar")} src={userMeta.avatar} alt={userMeta.displayName} />
            <div className={cx("profileCardText")}>
              <h1>{userMeta.displayName}</h1>
              <p>@{userMeta.username}</p>
            </div>

            <div className={cx("profileQuickStats")}>
              <div>
                <strong>17</strong>
                <span>Lượt xem</span>
              </div>
              <div>
                <strong>0</strong>
                <span>Lượt nghe</span>
              </div>
            </div>

            <div className={cx("profileDetailList")}>
              <span>
                <FontAwesomeIcon icon={faIdBadge} />
                ID: {userMeta.displayId}
              </span>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
                {userMeta.email}
              </span>
              <span>
                <FontAwesomeIcon icon={faCalendarDays} />
                {userMeta.birthday}
              </span>
              <span>
                <FontAwesomeIcon icon={faVenusMars} />
                {userMeta.displayGender}
              </span>
            </div>
          </section>

          <nav className={cx("profileMenu")} aria-label="Profile navigation">
            <Link to="/" className={cx("profileMenuItem")}>
              <FontAwesomeIcon icon={faHome} />
              <span>Trang chủ</span>
            </Link>

            {PROFILE_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cx("profileMenuItem", { profileMenuItemActive: isActive })}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className={cx("profileRecommendations")}>
            <Sibar />
          </div>
        </aside>

        <main className={cx("profileContentCard")}>
          <div key={location.pathname} className={cx("profileOutletTransition")}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profilee_content;
