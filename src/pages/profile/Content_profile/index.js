import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import styles from "../profile-module.scss";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
// grid
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";

import Img_avatar from "../avatar_default_2020.png";
import Sibar from "./Sibar";

const cx = classnames.bind(styles);

const PROFILE_NAV_ITEMS = [
  { to: "/Profile/chinh-sua-thong-tin", label: "Thông tin cá nhân" },
  { to: "/Profile/Maiprofile", label: "PlayList" },
  { to: "/Profile/Contentt_Video", label: "Video" },
  { to: "/Profile/upload_proifle", label: "Tải lên" },
  { to: "/Profile/Friend_live", label: "Bạn bè" },
  { to: "/Profile/author-request", label: "Đăng ký tác giả" },
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
      avatar: user?.avatar ? `http://localhost:8082${user.avatar}` : Img_avatar,
      birthday: user?.birthday || user?.birthDate || "Đang cập nhật",
    }),
    [user]
  );

  return (
    <div className={cx("Profilee_content")}>
      <div className={cx("Profilee_main")}>
        <div className={cx("profileHero")}> 
          <div className={cx("profileIdentity")}> 
            <img className={cx("Profilee_content_img")} src={userMeta.avatar} alt={userMeta.displayName} />
            <div className={cx("profileIdentityText")}> 
              <p className={cx("profileTitle")}>{userMeta.displayName}</p>
              <p>ID: {userMeta.displayId}</p>
              <p>Tên thật: {user?.fullName || "Chưa cập nhật"}</p>
              <p>Sinh nhật: {userMeta.birthday}</p>
              <p>Giới tính: {userMeta.displayGender}</p>
            </div>
          </div>

          <div className={cx("profileStatsRow")}> 
            <div className={cx("profileStatCard")}> 
              <p className={cx("profileStatValue")}>
                <span>17</span>
              </p>
              <p>Lượt xem profile</p>
            </div>
            <div className={cx("profileStatCard")}> 
              <p>
                <span>0</span>
              </p>
              <p>Lượt nghe playList</p>
            </div>
          </div>
        </div>

        <nav className={cx("profileNavBar")}>
          <Link to="/" className={cx("homeIconWrap")} aria-label="Trang chu">
            <FontAwesomeIcon className={cx("Profilee_nAVsss")} icon={faHome} />
          </Link>

          {PROFILE_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cx("profileNavItem", { profileNavItemActive: isActive })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Box className={cx("Profilee_container")} sx={{ flexGrow: 1 }}>
          <Grid className={cx("Profilee_container", "profileLayoutGrid")} container spacing={2}>
            <Grid className={cx("Profilee_Contetnt-", "profileMainPanel")} item xs={12} lg={8}>
              <div key={location.pathname} className={cx("profileOutletTransition")}>
                <Outlet />
              </div>
            </Grid>
            <Grid className={cx("Profileesss_sibar-", "profileSidePanel")} item xs={12} lg={4}>
              <Sibar />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Profilee_content;
