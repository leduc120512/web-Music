import React, {useEffect, useState} from "react";
import styles from "./Mv-hot-module.scss";
import classnames from "classnames/bind";
import Text from "../../../../../pages/text";
import imgmain from "../ANH/1716259734807_640.jpg";
import imglisst from "../ANH/1.jpg";
import Top100 from "../ANH/4.jpg";
import imgmusic from "../ANH/234.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeader, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import songApi from "../../../../../api/api_music";
import defaultImg from "../ANH/SONTUNG.webp";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

// Ghép URL ảnh an toàn + fallback
const buildCover = (coverImage) => {
  if (!coverImage) return defaultImg;
  if (/^https?:\/\//i.test(coverImage)) return coverImage; // đã là URL tuyệt đối
  return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};
function Mv_hot() {
  const [songs, setSongs] = useState([]);
  const [top5, setSongstop5] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await songApi.getActiveSongs();
        const responseTop5 = await songApi.getTop5List();

        const result = response?.data?.data;
        const resultTop5 = responseTop5?.data?.data;

        console.log("🎧 TOP 5 SONGS:", resultTop5); // ✅ console đúng

        if (Array.isArray(result)) {
          setSongs(result);
        } else {
          setSongs([]);
        }

        if (Array.isArray(resultTop5)) {
          setSongstop5(resultTop5);
        } else {
          setSongstop5([]);
        }
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách bài hát:", error);
        setSongs([]);
        setSongstop5([]);
      }
    };

    fetchSongs();
  }, []);


  console.log('songs',top5)
  return (
    // mv hot 1
      <div className={cx("Mvhot")}>

        {/* mvhot 2 */}
        <div className={cx("Mvhot2")}>
          {Array.isArray(songs) && songs.length > 0 ? (
              songs.map((song, index) => (
                  <div className={cx("Mvhot22")} key={song.id || index}>
                    <img
                        className={cx("Mvhot23")}

                        src={buildCover(song.coverImage)}
                        alt={song.title}
                    />
                    <div className={cx("Mvhot-main-text123")}>
                      <p className={cx("Mvhot-main-tex22")}>{song.title}</p>
                      <p className={cx("Mvhot-main-text12")}>{song.artistName}</p>
                    </div>
                  </div>
              ))
          ) : (
              <p>Không có bài hát nào.</p>
          )}
        </div>

        {/* music  */}
        {/*<div className={cx("main-content-music-s")}>*/}
        {/*  <Text>BÀI HÁT</Text>{" "}*/}
        {/*  <div className={cx("main-content-music")}>*/}
        {/*    <div className={cx("content-music")}>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon icon={faHeader}/>*/}
        {/*          <FontAwesomeIcon icon={faHeader}/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className={cx("content-music")}>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={cx("content-music-list")}>*/}
        {/*        {" "}*/}
        {/*        <div className={cx("content-music-list1233")}>*/}
        {/*          <img className={cx("Mvhot-main-te12xt12")} src={imgmusic}/>*/}
        {/*          <div className={cx("Mvhot-main-text1234")}>*/}
        {/*            <p className={cx("Mvhot-main-tex22")}>EcressXO</p>*/}
        {/*            <p className={cx("Mvhot-main-text12")}>sapatan capeter</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className={cx("content-music-list1234231234")}>*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faHeart}*/}
        {/*          />*/}
        {/*          <FontAwesomeIcon*/}
        {/*              className={cx("icon_list_item_product")}*/}
        {/*              icon={faPlay}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div   className={cx("icon_list_item_product1")}>

          <Text >Top 5 mv hay nhất</Text>
        </div>

        {/* top 100 */}
        <div className={cx("content-TOP100-IMG")}>
          {top5.map((song, index) => (
              <div key={song.id || index}>
                <img
                    className={cx("content-TOP100-IMG-LIST")}
                    src={buildCover(song.coverImage)}
                    alt={song.title}
                />
                <p>{song.title}</p>
                <p>{song.artistName}</p>
              </div>
          ))}
        </div>


      </div>
  );
}

export default Mv_hot;
