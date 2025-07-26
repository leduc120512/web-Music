import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header-module.scss"; // Adjusted import path
import Button from "../button"; // Adjusted import path for button
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCaretDown,
  faCoins,
  faEllipsis,
  faHome,
  faMagnifyingGlass,
  faSquareCaretDown,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import BXH from "./header-nav-music/bxh";
import Music_header from "./header-nav-music/music-header";
import Tuyentap from "./header-nav-music/tuyentap";
import TOP100 from "./header-nav-music/top100";
import Menu_elip from "./header-nav-music/menu-slip";
import ReusableModal from "../../../../pages/Login_logOut/Login"; // Adjusted import path for ReusableModal
import Create_Acount from "../../../../pages/Login_logOut/Create_acount";
import ImgMain from "./G81A8377.JPG";
import Input_search from "./input_search";
import Profile from "./profile";
import Video from "./header-nav-music/video";
import Cookies from "js-cookie";

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
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleMouseEnter = (key) => {
    setHovered((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleMouseLeave = (key) => {
    setHovered((prevState) => ({ ...prevState, [key]: false }));
  };

  //profile
  const [open1, setOpen1] = useState(true);

  const handleClose1 = () => setOpen1(false);
  return (
    <div className={cx("Headerin")}>
      <div className={cx("Header-nav")}>
        <a href="/" className={cx("Header-nav-item")}>
          Home
        </a>
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
        <div className={cx("Header-search")}>
          <div className={cx("searchBar")}>
            <input
              className={cx("inputField")}
              placeholder="Search"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            {isInputFocused && (
              <div>
                <Input_search />
              </div>
            )}
            <button className={cx("searchButton")}>
              <FontAwesomeIcon className={cx("gf")} icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>

        <div className={cx("Row")}>
          <div>
            {/* Upload  */}
            {user ? <a href="UpLoad">
                  <FontAwesomeIcon
                      className={cx("hearder-faUpload")}
                      icon={faUpload}
                  />
                </a> : <FontAwesomeIcon
                className={cx("hearder-faUpload")}
                icon={faUpload}
                onClick={handleOpenLogin}
            /> }

                <FontAwesomeIcon className={cx("header-faHome")} icon={faHome}/>
              </div>
            {user ? <div
              className={cx("Header_login")}
            onMouseEnter={() => handleMouseEnter("profile")}
            onMouseLeave={() => handleMouseLeave("profile")}
              style={{position: "relative"}}>
            <div className={cx("Header_login1")}>
              <img
                  className={cx("Header_login_img")}
                  src={ImgMain}
                  alt="Profile"
              />
              <div className={cx("Header_login2")}>
                <p className={cx("Header_login2_name")}>{user?.fullName}</p>
                <div className={cx("Header_login3")}>
                  <div className={cx("coin")}>
                    <div className={cx("side", "heads")}>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          width="100%"
                          height="100%"
                          version="1.1"
                          shapeRendering="geometricPrecision"
                          textRendering="geometricPrecision"
                          imageRendering="optimizeQuality"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          viewBox="0 0 4091.27 4091.73"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <g id="_1421344023328">
                            <path
                                fill="#F7931A"
                                fillRule="nonzero"
                                d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
                            ></path>
                            <path
                                fill="white"
                                fillRule="nonzero"
                                d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className={cx("side", "tails")}>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={cx("svg_back")}
                          xmlSpace="preserve"
                          width="100%"
                          height="100%"
                          version="1.1"
                          shapeRendering="geometricPrecision"
                          textRendering="geometricPrecision"
                          imageRendering="optimizeQuality"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          viewBox="0 0 4091.27 4091.73"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <g id="_1421344023328">
                            <path
                                fill="#F7931A"
                                fillRule="nonzero"
                                d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
                            ></path>
                            <path
                                fill="white"
                                fillRule="nonzero"
                                d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FontAwesomeIcon
                className={cx("Header_login2_icon_down")}
                icon={faCaretDown}
            />
            {hovered.profile && (
                <div className={cx("Header_login_profile")}>
                  <Profile/>
                </div>
            )}
          </div> :    <div>
            <Button onClick={handleOpenLogin} primary>
              Đăng Nhập
            </Button>
            <Button
              className={cx("Header_create_acoutn")}
              onClick={handleOpenRegister}
              primary
            >
              Đăng Ký
            </Button>
          </div>  }



        </div>

      </div>
      <ReusableModal
          open={openLogin}
          handleClose={handleCloseLogin}
          title="Đăng Nhập"
          description="Nhập thông tin đăng nhập của bạn."
      />
      <Create_Acount open={openRegister} handleClose={handleCloseRegister}/>
    </div>
  );
}

export default Header;
