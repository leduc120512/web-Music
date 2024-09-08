import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import classnames from "classnames/bind";
import styles from "../Play_music-module.scss";
import Video from "./mov_bbb.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCaretRight,
  faCopy,
  faDownload,
  faEllipsis,
  faExclamation,
  faHeart,
  faMusic,
  faPause,
  faPhone,
  faShare,
  faSortDown,
  faSortUp,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";

import IMg_user from "./1709885058285.jpg";
import imglist from "./1438828376816.jpg";
import Text from "../../text";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import List_item_music from "../../results_search/results/List_item_musci1";

const cx = classnames.bind(styles);

function Music() {
  //lyric
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // swich
  const label = { inputProps: { "aria-label": "Switch demo" } };

  //btn music right :   const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const componentsArray = Array(15).fill(
    <div className={cx("Musiacsa_right_header")}>
      <FontAwesomeIcon className={cx("Musiac_righst_header")} icon={faMusic} />
      <div>
        <p className={cx("Musiac_righsst_header")}>10/10</p>
        <p className={cx("Maausiac_righstss_header")}>
          Anh trai say hi, phạm đình
        </p>
      </div>
    </div>
  );
  const displayedComponents = isExpanded
    ? componentsArray
    : componentsArray.slice(0, 5);
  return (
    <div className={cx("Music")}>
      <Grid className={cx("Musicss")} container spacing={2}>
        <Grid item xs={12} md={8} className={cx("Music_left")}>
          <div className={cx("Music_nose")}>
            <div className={cx("Music_note")}>
              <div>
                <p>Nghe nhạc</p>
                <FontAwesomeIcon
                  className={cx("icon_note")}
                  icon={faCaretRight}
                />
              </div>
              <div>
                <p>Playlist Nhạc trẻ</p>
                <FontAwesomeIcon
                  className={cx("icon_note")}
                  icon={faCaretRight}
                />
              </div>
              <div>
                <p>V.A</p>
                <FontAwesomeIcon
                  className={cx("icon_note")}
                  icon={faCaretRight}
                />
              </div>
            </div>
            <p className={cx("Name_music")}>
              I'M THINKING ABOUT YOU - ANH TRAI "SAY HI", RHYDER, WEAN
            </p>

            <video className={cx("video_music")} controls>
              <source src={Video} type="video/mp4" />
              <source src={Video} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            <div className={cx("Music_tittel")}>
              <div className={cx("Music_item_list")}>
                <div>
                  <p className={cx("Music_item_lisdst")}>1 ,</p>
                  <p className={cx("Music_item_lisdst")}>Trống Cơm -</p>
                  <p className={cx("Music_item_lisdts")}>
                    Cường Seven, SOOBIN, Tự Long{" "}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPause}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faDownload}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPhone}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faCopy}
                  />
                </div>
              </div>
              <div className={cx("Music_item_list")}>
                <div>
                  <p className={cx("Music_item_lisdst")}>1 ,</p>
                  <p className={cx("Music_item_lisdst")}>Trống Cơm -</p>
                  <p className={cx("Music_item_lisdts")}>
                    Cường Seven, SOOBIN, Tự Long{" "}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPause}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faDownload}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPhone}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faCopy}
                  />
                </div>
              </div>

              <div className={cx("Music_item_list")}>
                <div>
                  <p className={cx("Music_item_lisdst")}>1 ,</p>
                  <p className={cx("Music_item_lisdst")}>Trống Cơm -</p>
                  <p className={cx("Music_item_lisdts")}>
                    Cường Seven, SOOBIN, Tự Long{" "}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPause}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faDownload}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPhone}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faCopy}
                  />
                </div>
              </div>

              <div className={cx("Music_item_list")}>
                <div>
                  <p className={cx("Music_item_lisdst")}>1 ,</p>
                  <p className={cx("Music_item_lisdst")}>Trống Cơm -</p>
                  <p className={cx("Music_item_lisdts")}>
                    Cường Seven, SOOBIN, Tự Long{" "}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPause}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faDownload}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPhone}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faCopy}
                  />
                </div>
              </div>
              <div className={cx("Music_item_list")}>
                <div>
                  <p className={cx("Music_item_lisdst")}>1 ,</p>
                  <p className={cx("Music_item_lisdst")}>Trống Cơm -</p>
                  <p className={cx("Music_item_lisdts")}>
                    Cường Seven, SOOBIN, Tự Long{" "}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPause}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faDownload}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPhone}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faCopy}
                  />
                </div>
              </div>
              <div className={cx("Music_item_list")}>
                <div>
                  <p className={cx("Music_item_lisdst")}>1 ,</p>
                  <p className={cx("Music_item_lisdst")}>Trống Cơm -</p>
                  <p className={cx("Music_item_lisdts")}>
                    Cường Seven, SOOBIN, Tự Long{" "}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPause}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faDownload}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPhone}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faCopy}
                  />
                </div>
              </div>
              <div className={cx("Music_item_list")}>
                <div>
                  <p className={cx("Music_item_lisdst")}>1 ,</p>
                  <p className={cx("Music_item_lisdst")}>Trống Cơm -</p>
                  <p className={cx("Music_item_lisdts")}>
                    Cường Seven, SOOBIN, Tự Long{" "}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPause}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faDownload}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faPhone}
                  />
                  <FontAwesomeIcon
                    className={cx("Music_item_icon_music")}
                    icon={faCopy}
                  />
                </div>
              </div>
            </div>
            <div className={cx("Music_user")}>
              <div className={cx("Music_user_info")}>
                <img src={IMg_user} />
                <div>
                  {" "}
                  <p className={cx("Musicq_user_info")}>Tạo bởi</p>
                  <Link to="/Profile">
                    {" "}
                    <p className={cx("Musisc_user_info")}>lexuanduc</p>
                  </Link>
                </div>
              </div>
              <div className={cx("Music_user_btn")}>
                <div>
                  <FontAwesomeIcon icon={faHeart} />
                  <p>Thêm vào</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faDownload} />
                  <p>Tải playlist</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faShare} />
                  <p>Chia sẻ</p>
                </div>
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
            </div>
            <div className={cx("Musisc_btn_info")}>
              <div>
                <FontAwesomeIcon icon={faTag} />
                <p>Tags:</p>
                <div>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                  <button>
                    <p>Nhạc Trẻ</p>
                  </button>
                </div>
              </div>
              <div>
                <FontAwesomeIcon
                  className={cx("Music_srighsst")}
                  icon={faArrowDown}
                />
                <p className={cx("Music_righssaat")}>Xem thêm</p>
              </div>
            </div>
            <div
              className={cx("music_subtitles", {
                expanded,
                collapsed: !expanded,
              })}
            >
              <div className={cx("music_subtitlesssdd")}>
                <h3>Lời bài hát: Trống cơm</h3>
                <p className={cx("music_subtitlesdd")}>
                  Lời đăng bởi: <span>khoiduyy</span>
                </p>
                <div className={cx("music_subtisastles")}>
                  <p>Có lẽ duyên là từ khi anh gặp em</p>
                  <p>Bối rối chi bằng mượn nợ</p>
                  <p>Để làm quen</p>
                  <p>Theo anh đưa em qua khắp lối</p>
                  <p>Họa bức tranh kể chuyện</p>
                  <p>Tình đẹp đây rồi</p>
                  <p>Bao nhiêu năm tháng đậm sâu</p>
                  <p>Ta đi qua hết buồn đau</p>
                  <p>Trọn một lời hứa</p>
                  {expanded && (
                    <>
                      <p>Mãi mong sau này vẫn có nhau</p>
                      <p>Đêm anh ngồi mà trông</p>
                      <p>Thương mong người mà người còn thương không</p>
                      <p>Xa bao ngày thì người còn thương không</p>
                      <p>Cùng nhìn về phương xa</p>
                      <p>Ối a ối a ối à</p>
                      <p>Tình bằng có cái trống cơm</p>
                      <p>Tình bằng có cái trống cơm</p>
                      <p>Tình bằng có cái trống cơm</p>
                      <p>Ờ tình bằng</p>
                      <p>Ờ tình bằng</p>
                      <p>Tình bằng có cái trống cơm</p>
                      <p>Khen ai khéo vỗ</p>
                      <p>Ố mấy bông mà nên bông</p>
                      <p>Ố mấy bông mà nên bông</p>
                      <p>Một bầy tang tình con xít</p>
                      <p>Một bầy tang tình con xít</p>
                      <p>Ố mấy lội, lội, lội sông</p>
                      <p>Ô mấy đi tìm, em nhớ thương ai</p>
                    </>
                  )}
                </div>
                <div className={cx("musicd_subtitles")} onClick={toggleExpand}>
                  <p>{expanded ? "Thu gọn" : "Xem Thêm"}</p>
                  <FontAwesomeIcon
                    className={cx("musssicd_subtitles")}
                    icon={expanded ? faSortUp : faSortDown}
                  />
                </div>
              </div>
            </div>
            <div className={cx("content")}>
              <div className={cx("list-music-lk")}>
                <Text>LE XUAN DUC</Text>
                <div className={cx("list-music")}>
                  <div className={cx("item-music")}>
                    <Link to="/Nhac">
                      <img className={cx("list-SINGER")} src={imglist} />
                      <FontAwesomeIcon
                        className={cx("list-SINGER_play")}
                        icon={faPlay}
                      />
                      <p>Tiềm Năng V-Pop</p>
                    </Link>
                  </div>
                  <div className={cx("item-music")}>
                    <img className={cx("list-SINGER")} src={imglist} />
                    <p>Tiềm Năng V-Pop</p>
                  </div>
                  <div className={cx("item-music")}>
                    <img className={cx("list-SINGER")} src={imglist} />
                    <p>Tiềm Năng V-Pop</p>
                  </div>
                  <div className={cx("item-music")}>
                    <img className={cx("list-SINGER")} src={imglist} />
                    <p>Tiềm Năng V-Pop</p>
                  </div>
                  <div className={cx("item-music")}>
                    <img className={cx("list-SINGER")} src={imglist} />
                    <p>Tiềm Năng V-Pop</p>
                  </div>
                </div>
              </div>
            </div>
            <List_item_music />
          </div>
        </Grid>
        <Grid item xs={12} md={4} className={cx("Music_right")}>
          <div className={cx("Music_right_header")}>
            <div className={cx("Musisssac_right_header")}>
              <Text className={cx("Musisssac_right_hseader")}>NGHE TIẾP</Text>
              <div className={cx("Music_sright_header")}>
                <p>Autoplay</p>

                <div className={cx("Muasic_ssright_header")}>
                  <FontAwesomeIcon
                    className={cx("Muasicsss_ssright_header")}
                    icon={faExclamation}
                  />
                </div>

                <Switch {...label} defaultChecked />
              </div>
            </div>
            <div className={cx("Musiac_right_header")}>
              <div>
                {displayedComponents}

                <button
                  className={cx("Maausiac_sssssrighstaaass_header")}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <p>{isExpanded ? "Rút Gọn" : "Xem Thêm"}</p>
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Music;
