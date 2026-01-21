"use client";

import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faBox,
  faQuestionCircle,
  faCog,
  faHome,
  faBars,
  faSearch,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import DashboardContent from "../../pages/container/DashboardContent";
import UsersContent from "../../pages/container/UsersContent";
import ProductsContent from "../../pages/container/ProductsContent";
import HelpContent from "../../pages/container/HelpContent";
import SettingsContent from "../../pages/container/SettingsContent";

// api
import songApi from "../../api/api_music";
import albumsApi from "../../api/albums";
import bannerApi from "../../api/banner";
import userApi from "../../api/api_user";

const ALL_MENU = [
  { id: "dashboard", label: "Dashboard", icon: faTachometerAlt },
  { id: "users", label: "Người dùng", icon: faUser },
  { id: "products", label: "Sản phẩm", icon: faBox }, // song
  { id: "albums", label: "Albums", icon: faBox },
  { id: "banner", label: "Banner", icon: faBox },
];

const SECONDARY_MENU = [
  { id: "help", label: "Trợ giúp", icon: faQuestionCircle },

];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [role, setRole] = useState(null); // ROLE_ADMIN | ROLE_AUTHOR | ROLE_USER | null

  // Lấy role từ cookie (đã set ở handleLogin)
  useEffect(() => {
    const r = Cookies.get("role");
    setRole(r || null);
  }, []);

  // Ánh xạ role -> danh sách menu được phép
  const permittedMenu = useMemo(() => {
    if (role === "ROLE_ADMIN") {
      return ALL_MENU;
    }
    if (role === "ROLE_AUTHOR") {
      // chỉ album & nhạc (products)
      return [
        // bạn muốn thêm dashboard thì thêm dòng sau:
        // { id: "dashboard", label: "Dashboard", icon: faTachometerAlt },
        { id: "products", label: "Sản phẩm", icon: faBox },
        { id: "albums", label: "Albums", icon: faBox },
      ];
    }
    // các role khác (hoặc chưa có) – không cho gì trong admin
    return [
      // Cho an toàn, không hiển thị gì. Hoặc có thể chỉ cho dashboard nếu bạn muốn.
      // { id: "dashboard", label: "Dashboard", icon: faTachometerAlt },
    ];
  }, [role]);

  // Map màn hình hiển thị theo id
  const contentMap = useMemo(
      () => ({
        dashboard: <DashboardContent />,
        users: (
            <UsersContent
                // nếu UsersContent thực chất cũng dùng ProductsContent thì đổi cho đúng
                // ở code cũ bạn dùng ProductsContent cho users, nên mình giữ nguyên:
                // <ProductsContent Api={userApi} type="users" />
            />
        ),
        products: <ProductsContent Api={songApi} type="song" />,
        albums: <ProductsContent Api={albumsApi} type="albums" />,
        banner: <ProductsContent Api={bannerApi} type="banner" />,
        help: <HelpContent />,
        settings: <SettingsContent />,
      }),
      []
  );

  // Chặn truy cập mục không có quyền: nếu activeItem không thuộc permittedMenu thì chuyển sang mục đầu tiên có quyền
  useEffect(() => {
    const allowedIds = new Set(permittedMenu.map((m) => m.id).concat(SECONDARY_MENU.map((m) => m.id)));
    if (!allowedIds.has(activeItem)) {
      const firstAllowed = permittedMenu[0]?.id || SECONDARY_MENU[0]?.id;
      if (firstAllowed) setActiveItem(firstAllowed);
    }
  }, [activeItem, permittedMenu]);

  const toggleSidebar = () => setIsCollapsed((v) => !v);
  const handleItemClick = (itemId) => setActiveItem(itemId);

  const MenuItem = ({ item, isSecondary = false }) => {
    const isActive = activeItem === item.id;
    return (
        <div className="menu-item-container">
          <button
              onClick={() => handleItemClick(item.id)}
              className={`menu-item ${isActive ? "active" : ""} ${isSecondary ? "secondary" : ""}`}
              title={isCollapsed ? item.label : ""}
          >
            <div className="menu-item-content">
              <FontAwesomeIcon icon={item.icon} className="menu-icon" />
              {!isCollapsed && <span className="menu-label">{item.label}</span>}
            </div>
          </button>
        </div>
    );
  };

  // Gắn nội dung phù hợp
  const currentContent = contentMap[activeItem] ?? (
      <div className="content-header">
        <h1>Không tìm thấy</h1>
        <p>Vui lòng chọn một mục từ menu</p>
      </div>
  );

  return (
      <div className="app-container">
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
          {/* Header */}
          <div className="sidebar-header">
            <div className="logo-section">
              <div className="logo-icon">
                <FontAwesomeIcon icon={faHome} />
              </div>
              {!isCollapsed && (
                  <div className="logo-text">
                    <h2>Web nhạc</h2>
                    {role === "ROLE_ADMIN" && <span>Admin</span>}
                    {role === "ROLE_AUTHOR" && <span>Author</span>}

                  </div>
              )}

            </div>
            <button onClick={toggleSidebar} className="toggle-btn">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          {/* Search */}
          {!isCollapsed && (
              <div className="search-section">
                <div className="search-container">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input type="text" placeholder="Tìm kiếm..." className="search-input" />
                </div>
              </div>
          )}

          {/* Main Navigation */}
          <div className="nav-section">
            <div className="nav-group">
              {!isCollapsed && <div className="nav-label">Menu chính</div>}
              {permittedMenu.map((item) => (
                  <MenuItem key={item.id} item={item} />
              ))}
            </div>
            <div className="nav-group secondary">
              {!isCollapsed && <div className="nav-label">Khác</div>}
              {SECONDARY_MENU.map((item) => (
                  <MenuItem key={item.id} item={item} isSecondary />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="sidebar-footer">
            <button className="user-profile">
              <FontAwesomeIcon icon={faUserCircle} className="user-avatar" />
              {!isCollapsed && (
                  <div className="user-info">
                    <span className="user-name">Nguyễn Văn A</span>
                    <span className="user-email">{role || "Chưa đăng nhập"}</span>
                  </div>
              )}
              {!isCollapsed && <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">{currentContent}</div>

        <style jsx>{`
        .app-container {
          display: flex;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .sidebar {
          background: white;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          width: 280px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #e5e7eb;
        }
        .sidebar.collapsed {
          width: 70px;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #f3f4f6;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
        }
        .logo-text h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
        }
        .logo-text span {
          font-size: 12px;
          color: #6b7280;
        }
        .toggle-btn {
          padding: 8px;
          border: none;
          background: #f9fafb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          color: #6b7280;
          font-size: 18px;
        }
        .toggle-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }
        .search-section {
          padding: 20px;
          border-bottom: 1px solid #f3f4f6;
        }
        .search-container {
          position: relative;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 16px;
        }
        .search-input {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
          font-size: 14px;
        }
        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .nav-section {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
        }
        .nav-group {
          margin-bottom: 30px;
        }
        .nav-label {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
          padding: 0 10px;
        }
        .menu-item-container {
          margin-bottom: 2px;
        }
        .menu-item {
          width: 100%;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          padding: 0;
        }
        .menu-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          position: relative;
        }
        .menu-icon {
          font-size: 20px;
          color: #6b7280;
          transition: color 0.2s;
          width: 20px;
          text-align: center;
        }
        .menu-label {
          flex: 1;
          text-align: left;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
        .menu-item:hover {
          background: #f9fafb;
        }
        .menu-item:hover .menu-icon {
          color: #3b82f6;
        }
        .menu-item.active {
          background: #eff6ff;
        }
        .menu-item.active .menu-icon {
          color: #3b82f6;
        }
        .menu-item.active .menu-label {
          color: #1d4ed8;
          font-weight: 600;
        }
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid #f3f4f6;
        }
        .user-profile {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .user-profile:hover {
          background: #f9fafb;
        }
        .user-avatar {
          font-size: 32px;
          color: #6b7280;
        }
        .user-info {
          flex: 1;
          text-align: left;
        }
        .user-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }
        .user-email {
          display: block;
          font-size: 12px;
          color: #6b7280;
        }
        .logout-icon {
          font-size: 18px;
          color: #9ca3af;
        }
        .main-content {
          flex: 1;
          padding: 30px;
          background: #f9fafb;
          overflow-y: auto;
        }
        .content-header {
          margin-bottom: 30px;
        }
        .content-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .content-header p {
          color: #6b7280;
          font-size: 16px;
        }
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            z-index: 1000;
            height: 100vh;
          }
          .sidebar.collapsed {
            transform: translateX(-100%);
          }
          .main-content {
            margin-left: 0;
          }
        }
      `}</style>
      </div>
  );
};

export default Sidebar;
