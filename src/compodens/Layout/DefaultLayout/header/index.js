import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header-module.scss";
import Button from "../button";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEllipsis,
  faHome,
  faMagnifyingGlass,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import BXH from "./header-nav-music/bxh";
import Music_header from "./header-nav-music/music-header";
import Tuyentap from "./header-nav-music/tuyentap";
import Menu_elip from "./header-nav-music/menu-slip";
import ReusableModal from "../../../../pages/Login_logOut/Login";
import Create_Acount from "../../../../pages/Login_logOut/Create_acount";
import ImgMain from "./G81A8377.JPG";
import SearchDropdown from "./input_search"; // <-- đổi tên component phụ cho rõ vai trò (chỉ hiển thị)
import Profile from "./profile";
import Video from "./header-nav-music/video";
import Cookies from "js-cookie";
import songApi from "../../../../api/api_music"; // <-- gọi API ở file chính

const cx = classnames.bind(styles);

function Header() {
  const [hovered, setHovered] = useState({
    playList: false,
    baiHat: false,
    tuyenTap: false,
    top100: false,
    ellipsis: false,
    input_search: false,
    profile: false,
    video: false,
  });

  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // --- State tìm kiếm đưa về file chính ---
  const [keyword, setKeyword] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [topSongs, setTopSongs] = useState([]);        // top mới nhất (mặc định)
  const [suggestedSongs, setSuggestedSongs] = useState([]); // gợi ý theo từ khóa
  const [loadingSuggest, setLoadingSuggest] = useState(false);

  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // click ra ngoài đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // load 5 bài mới nhất khi vào (mặc định dropdown)
  useEffect(() => {
    songApi
        .getLatestSuggestions()
        .then((res) => {
          if (res.data?.success) setTopSongs(res.data.data || []);
        })
        .catch((err) => console.error("Lỗi lấy top mới nhất:", err));
  }, []);

  // debounce tìm kiếm theo keyword
  useEffect(() => {
    const t = setTimeout(() => {
      const q = keyword.trim();
      if (!q) {
        setSuggestedSongs([]);
        return;
      }
      setLoadingSuggest(true);
      songApi
          .search(q)
          .then((res) => {
            if (res.data?.success) {
              const result = res.data.data?.content?.slice(0, 5) || [];
              setSuggestedSongs(result);
            }
          })
          .catch((err) => console.error("Lỗi gợi ý tìm kiếm:", err))
          .finally(() => setLoadingSuggest(false));
    }, 300);
    return () => clearTimeout(t);
  }, [keyword]);

  const handleMouseEnter = (key) => setHovered((p) => ({ ...p, [key]: true }));
  const handleMouseLeave = (key) => setHovered((p) => ({ ...p, [key]: false }));

  const onSubmitSearch = (e) => {
    e?.preventDefault?.();
    if (!keyword.trim()) return;
    // Điều hướng tới trang kết quả tổng, bạn tùy route:
    navigate(`/Search_results?keyword=${encodeURIComponent(keyword.trim())}`);
    setIsInputFocused(false);
  };

  return (
      <div className={cx("Headerin")}>
        <div className={cx("Header-nav")}>
          <a href="/" className={cx("Header-nav-item")}>Home</a>

          <Link
              to="/Video"
              className={cx("Header-nav-item")}
              onMouseEnter={() => handleMouseEnter("baiHat")}
              onMouseLeave={() => handleMouseLeave("baiHat")}
          >
            Bài Hát
            {hovered.baiHat && <Music_header />}
          </Link>

          <Link
              to="/Playlist"
              className={cx("Header-nav-item")}
              onMouseEnter={() => handleMouseEnter("playList")}
              onMouseLeave={() => handleMouseLeave("playList")}
          >
            Play List
            {hovered.playList && <BXH />}
          </Link>

          <a
              href="#"
              className={cx("Header-nav-item")}
              onMouseEnter={() => handleMouseEnter("tuyenTap")}
              onMouseLeave={() => handleMouseLeave("tuyenTap")}
          >
            Tuyển Tập
            {hovered.tuyenTap && <Tuyentap />}
          </a>

          <a
              href="top_100"
              className={cx("Header-nav-item")}
              onMouseEnter={() => handleMouseEnter("video")}
              onMouseLeave={() => handleMouseLeave("video")}
          >
            BXH
            {hovered.video && <Video />}
          </a>

          <a
              href="#"
              className={cx("Header-nav-item")}
              onMouseEnter={() => handleMouseEnter("ellipsis")}
              onMouseLeave={() => handleMouseLeave("ellipsis")}
          >
            <FontAwesomeIcon className={cx("menu-elip")} icon={faEllipsis} />
            {hovered.ellipsis && <Menu_elip />}
          </a>
        </div>

        <div className={cx("Header-action")}>
          {/* --- Search Box --- */}
          <div className={cx("Header-search")} ref={wrapperRef}>
            <form className={cx("searchBar")} onSubmit={onSubmitSearch}>
              <input
                  className={cx("inputField")}
                  placeholder="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
              />
              <button className={cx("searchButton")} type="submit">
                <FontAwesomeIcon className={cx("gf")} icon={faMagnifyingGlass} />
              </button>
            </form>

            {isInputFocused && (
                <SearchDropdown
                    keyword={keyword}
                    topSongs={topSongs}
                    suggestedSongs={suggestedSongs}
                    loading={loadingSuggest}
                    onSelect={(songId) => {
                      setIsInputFocused(false);
                      navigate(`/Search_results/${songId}`);
                    }}
                />
            )}
          </div>

          {/* --- Actions --- */}
          <div className={cx("Row")}>
            <div>
              {user ? (
                  <a href="UpLoad">
                    <FontAwesomeIcon className={cx("hearder-faUpload")} icon={faUpload} />
                  </a>
              ) : (
                  <FontAwesomeIcon
                      className={cx("hearder-faUpload")}
                      icon={faUpload}
                      onClick={() => setOpenLogin(true)}
                  />
              )}
              <FontAwesomeIcon className={cx("header-faHome")} icon={faHome} />
            </div>

            {user ? (
                <div
                    className={cx("Header_login")}
                    onMouseEnter={() => handleMouseEnter("profile")}
                    onMouseLeave={() => handleMouseLeave("profile")}
                    style={{ position: "relative" }}
                >
                  <div className={cx("Header_login1")}>
                    <img className={cx("Header_login_img")} src={ImgMain} alt="Profile" />
                    <div className={cx("Header_login2")}>
                      <p className={cx("Header_login2_name")}>{user?.fullName}</p>
                    </div>
                  </div>
                  <FontAwesomeIcon className={cx("Header_login2_icon_down")} icon={faCaretDown} />
                  {hovered.profile && (
                      <div className={cx("Header_login_profile")}>
                        <Profile />
                      </div>
                  )}
                </div>
            ) : (
                <div>
                  <Button onClick={() => setOpenLogin(true)} primary>
                    Đăng Nhập
                  </Button>
                  <Button
                      className={cx("Header_create_acoutn")}
                      onClick={() => setOpenRegister(true)}
                      primary
                  >
                    Đăng Ký
                  </Button>
                </div>
            )}
          </div>
        </div>

        <ReusableModal
            open={openLogin}
            handleClose={() => setOpenLogin(false)}
            title="Đăng Nhập"
            description="Nhập thông tin đăng nhập của bạn."
        />
        <Create_Acount open={openRegister} handleClose={() => setOpenRegister(false)} />
      </div>
  );
}

export default Header;
