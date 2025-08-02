
"use client";

import { useState } from "react";
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
import songApi from '../../api/api_music';
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: faTachometerAlt,
    },
    {
      id: "users",
      label: "Người dùng",
      icon: faUser,
    },
    {
      id: "products",
      label: "Sản phẩm",
      icon: faBox,
    },
  ];

  const secondaryItems = [
    {
      id: "help",
      label: "Trợ giúp",
      icon: faQuestionCircle,
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: faCog,
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const MenuItem = ({ item, isSecondary = false }) => {
    const isActive = activeItem === item.id;

    return (
      <div className="menu-item-container">
        <button
          onClick={() => handleItemClick(item.id)}
          className={`menu-item ${isActive ? "active" : ""} ${
    isSecondary ? "secondary" : ""
}`}
          title={isCollapsed ? item.label : ""}
        >
          <div className="menu-item-content">
            <FontAwesomeIcon icon={item.icon} className="menu-icon" />
            {!isCollapsed && (
              <span className="menu-label">{item.label}</span>
            )}
          </div>
        </button>
      </div>
    );
  };

  const contentMap = {
    dashboard: <DashboardContent />,
    users: <UsersContent />,
    products:
  <ProductsContent
      Api={songApi}

      type="song"
  />
      ,
    help: <HelpContent />,
    settings: <SettingsContent />,
  };

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
                <span>Quản lý dự án</span>
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
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-input"
              />
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="nav-section">
          <div className="nav-group">
            {!isCollapsed && <div className="nav-label">Menu chính</div>}
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
          <div className="nav-group secondary">
            {!isCollapsed && <div className="nav-label">Khác</div>}
            {secondaryItems.map((item) => (
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
                <span className="user-email">admin@example.com</span>
              </div>
            )}
            {!isCollapsed && (
              <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {contentMap[activeItem] || (
          <div className="content-header">
            <h1>Không tìm thấy</h1>
            <p>Vui lòng chọn một mục từ menu</p>
          </div>
        )}
      </div>

      <style jsx>{`
    .app-container {
    display: flex;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
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

.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.content-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.content-card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
}

.content-card p {
    color: #6b7280;
    line-height: 1.5;
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
