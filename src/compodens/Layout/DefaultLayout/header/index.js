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
import searchHistoryApi from "../../../../api/search_history";
import { buildSongPath } from "../../../../utils/songRoute";
import { subscribeRequireLogin } from "../../../../utils/authPrompt";

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
  const [searchHistory, setSearchHistory] = useState([]);

  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const refreshSearchHistory = () => {
    setSearchHistory(searchHistoryApi.getAll(6));
  };

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

    refreshSearchHistory();
  }, []);

  useEffect(() => {
    return subscribeRequireLogin(() => {
      setOpenLogin(true);
    });
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
          .searchSuggestions(q)
          .then((res) => {
            if (res.data?.success) {
              const result = res.data.data?.slice(0, 5) || [];
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
    const cleanedKeyword = keyword.trim();
    if (!cleanedKeyword) return;

    searchHistoryApi.addKeyword(cleanedKeyword);
    refreshSearchHistory();
    navigate(`/tim-kiem?keyword=${encodeURIComponent(cleanedKeyword)}`);
    setIsInputFocused(false);
  };

  const handleSelectSong = (song) => {
    if (!song?.id) return;
    searchHistoryApi.addSong(song);
    refreshSearchHistory();
    setIsInputFocused(false);
    navigate(buildSongPath(song));
  };

  const handleHistorySelect = (item) => {
    setIsInputFocused(false);
    if (item?.type === "song" && item.songId) {
      navigate(buildSongPath({ id: item.songId, title: item.title || item.keyword }));
      return;
    }

    const keywordValue = item?.keyword || item?.title;
    if (keywordValue) {
      setKeyword(keywordValue);
      navigate(`/tim-kiem?keyword=${encodeURIComponent(keywordValue)}`);
    }
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

          <Link
              to="/top_100"
              className={cx("Header-nav-item")}
              onMouseEnter={() => handleMouseEnter("video")}
              onMouseLeave={() => handleMouseLeave("video")}
          >
            BXH
            {hovered.video && <Video />}
          </Link>

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
                  onFocus={() => {
                    refreshSearchHistory();
                    setIsInputFocused(true);
                  }}
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
                    historyItems={searchHistory}
                    loading={loadingSuggest}
                    onSelect={handleSelectSong}
                    onHistorySelect={handleHistorySelect}
                    onRemoveHistory={(key) => {
                      searchHistoryApi.removeItem(key);
                      refreshSearchHistory();
                    }}
                    onClearHistory={() => {
                      searchHistoryApi.clearAll();
                      refreshSearchHistory();
                    }}
                />
            )}
          </div>

          {/* --- Actions --- */}
          <div className={cx("Row")}>
            <div>
              {user ? (
                  <Link to="/UpLoad">
                    <FontAwesomeIcon className={cx("hearder-faUpload")} icon={faUpload} />
                  </Link>
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
                <div className={cx("auth-actions")}>
                  <Button className="auth-login" onClick={() => setOpenLogin(true)}>
                    Đăng Nhập
                  </Button>
                  <Button
                      className="auth-register"
                      onClick={() => setOpenRegister(true)}
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
