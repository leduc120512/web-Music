"use client";

import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import {
  faBars,
  faBox,
  faFlag,
  faGear,
  faHome,
  faQuestionCircle,
  faRightFromBracket,
  faSearch,
  faShieldHalved,
  faTachometerAlt,
  faUser,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./admin-module.scss";
import DashboardContent from "../../pages/container/DashboardContent";
import ProductsContent from "../../pages/container/ProductsContent";
import HelpContent from "../../pages/container/HelpContent";
import SettingsContent from "../../pages/container/SettingsContent";
import ReportsContent from "../../pages/container/ReportsContent";
import ArtistRequestsContent from "../../pages/container/ArtistRequestsContent";
import PermissionsContent from "../../pages/container/PermissionsContent";

// api
import songApi from "../../api/api_music";
import albumsApi from "../../api/albums";
import bannerApi from "../../api/banner";
import userApi from "../../api/api_user";

const cx = classNames.bind(styles);

const ALL_MENU = [
  { id: "dashboard", label: "Dashboard", icon: faTachometerAlt },
  { id: "users", label: "Người dùng", icon: faUser },
  { id: "products", label: "Bài hát", icon: faBox },
  { id: "albums", label: "Albums", icon: faBox },
  { id: "banner", label: "Banner", icon: faBox },
  { id: "reports", label: "Báo cáo", icon: faFlag },
  { id: "artistRequests", label: "Duyệt tác giả", icon: faUserCheck },
  { id: "permissions", label: "Phân quyền", icon: faShieldHalved },
];

const SECONDARY_MENU = [
  { id: "help", label: "Trợ giúp", icon: faQuestionCircle },
  { id: "settings", label: "Cài đặt", icon: faGear },
];

const adminMuiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#38bdf8" },
    secondary: { main: "#a78bfa" },
    background: {
      default: "#020617",
      paper: "rgba(15, 23, 42, 0.78)",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
    },
    divider: "rgba(148, 163, 184, 0.22)",
  },
  typography: {
    fontFamily: '"Be Vietnam Pro", "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          scrollbarColor: "rgba(56, 189, 248, 0.55) rgba(15, 23, 42, 0.6)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderColor: "rgba(148, 163, 184, 0.22)",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid rgba(148, 163, 184, 0.22)",
          background: "linear-gradient(180deg, rgba(15, 23, 42, 0.84), rgba(2, 6, 23, 0.9))",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(30, 41, 59, 0.65)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
        },
        head: {
          color: "#e2e8f0",
          fontWeight: 700,
        },
      },
    },
  },
});

function Admin({ initialItem = "dashboard" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(initialItem);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(() => Cookies.get("role") || null);

  useEffect(() => {
    const nextRole = Cookies.get("role") || null;
    setRole(nextRole);
  }, []);

  useEffect(() => {
    setActiveItem(initialItem);
  }, [initialItem]);

  const userName = useMemo(() => {
    const raw = Cookies.get("user");
    if (!raw) return "Tài khoản";
    try {
      const user = JSON.parse(raw);
      return user?.fullName || user?.username || "Tài khoản";
    } catch (error) {
      return "Tài khoản";
    }
  }, []);

  const permittedMenu = useMemo(() => {
    if (role === "ROLE_ADMIN") return ALL_MENU;
    if (role === "ROLE_AUTHOR") {
      return [
        { id: "dashboard", label: "Dashboard", icon: faTachometerAlt },
        { id: "products", label: "Bài hát của tôi", icon: faBox },
      ];
    }
    return [];
  }, [role]);

  const songApiByRole = useMemo(() => {
    if (role !== "ROLE_AUTHOR") return songApi;

    return {
      ...songApi,
      getLatestSongs: async () => {
        const mine = await songApi.getMySongsWithStats();
        return {
          data: {
            data: {
              content: Array.isArray(mine) ? mine : [],
            },
          },
        };
      },
    };
  }, [role]);

  const contentMap = useMemo(
    () => ({
      dashboard: <DashboardContent />,
      users: <ProductsContent Api={userApi} type="users" />,
      products: <ProductsContent Api={songApiByRole} type="song" />,
      albums: <ProductsContent Api={albumsApi} type="albums" />,
      banner: <ProductsContent Api={bannerApi} type="banner" />,
      reports: <ReportsContent />,
      artistRequests: <ArtistRequestsContent />,
      permissions: <PermissionsContent />,
      help: <HelpContent />,
      settings: <SettingsContent />,
    }),
    [songApiByRole]
  );

  useEffect(() => {
    const allowed = new Set([...permittedMenu.map((item) => item.id), ...SECONDARY_MENU.map((item) => item.id)]);
    if (allowed.size > 0 && !allowed.has(activeItem)) {
      setActiveItem(permittedMenu[0]?.id || SECONDARY_MENU[0].id);
    }
  }, [activeItem, permittedMenu]);

  const filteredMainMenu = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return permittedMenu;
    return permittedMenu.filter((item) => item.label.toLowerCase().includes(query));
  }, [search, permittedMenu]);

  const activeLabel = useMemo(() => {
    const all = [...permittedMenu, ...SECONDARY_MENU];
    return all.find((item) => item.id === activeItem)?.label || "Admin";
  }, [activeItem, permittedMenu]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    window.location.href = "/";
  };

  const currentContent = contentMap[activeItem] || (
    <div className={cx("emptyState")}>Không tìm thấy nội dung phù hợp.</div>
  );

  return (
    <ThemeProvider theme={adminMuiTheme}>
      <CssBaseline />
      <div className={cx("adminShell")}>
        <aside className={cx("sidebar", { collapsed: isCollapsed })}>
        <div className={cx("sidebarHeader")}>
          <div className={cx("brand")}>
            <div className={cx("brandIcon")}>
              <FontAwesomeIcon icon={faHome} />
            </div>
            {!isCollapsed && (
              <div className={cx("brandText")}>
                <p>Web Nhạc Console</p>
                <span>{role === "ROLE_AUTHOR" ? "Author" : "Admin"}</span>
              </div>
            )}
          </div>
          <button type="button" className={cx("iconBtn")} onClick={() => setIsCollapsed((prev) => !prev)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {!isCollapsed && (
          <div className={cx("searchWrap")}>
            <FontAwesomeIcon icon={faSearch} className={cx("searchIcon")} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={cx("searchInput")}
              placeholder="Tìm nhanh menu..."
            />
          </div>
        )}

        <div className={cx("menuBlock")}>
          {!isCollapsed && <p className={cx("menuTitle")}>Điều hướng</p>}
          {filteredMainMenu.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cx("menuItem", { active: activeItem === item.id })}
              onClick={() => setActiveItem(item.id)}
              title={isCollapsed ? item.label : ""}
            >
              <FontAwesomeIcon icon={item.icon} className={cx("menuIcon")} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        <div className={cx("menuBlock", "secondary")}>
          {!isCollapsed && <p className={cx("menuTitle")}>Khác</p>}
          {SECONDARY_MENU.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cx("menuItem", { active: activeItem === item.id })}
              onClick={() => setActiveItem(item.id)}
              title={isCollapsed ? item.label : ""}
            >
              <FontAwesomeIcon icon={item.icon} className={cx("menuIcon")} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        <div className={cx("sidebarFooter")}>
          <div className={cx("accountBox")}>
            {!isCollapsed && (
              <>
                <p className={cx("accountName")}>{userName}</p>
                <span className={cx("accountRole")}>{role || "Guest"}</span>
              </>
            )}
            <button type="button" className={cx("logoutBtn")} onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        </div>
        </aside>

        <section className={cx("mainPane")}>
          <header className={cx("topBar")}>
          <div>
            <p className={cx("topLabel")}>Admin Panel</p>
            <h1>{activeLabel}</h1>
          </div>
          <div className={cx("chip")}>{role === "ROLE_AUTHOR" ? "Author Workspace" : "System Admin"}</div>
          </header>

          <main key={activeItem} className={cx("contentFrame")}>{currentContent}</main>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default Admin;
