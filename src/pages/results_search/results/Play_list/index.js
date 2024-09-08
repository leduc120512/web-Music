import React, { useState } from "react";
import classnames from "classnames/bind";
import styles from "../../results_search-module.scss";
import LIsst_muisic from "../1723784458729.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function Play_list() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5; // Số mục muốn hiển thị trong danh sách
  const itemsPerPage = 5; // Số mục hiển thị mỗi lần

  const playListData = [
    {
      title: "Beautiful Time Time",
      artist: "Willie Nelson",
      imgSrc: LIsst_muisic,
    },
    { title: "Another đứu", artist: "Artist đức", imgSrc: LIsst_muisic },
    { title: "Third Song", artist: "Artist Name", imgSrc: LIsst_muisic },
    { title: "Fourth Song", artist: "Artist Name", imgSrc: LIsst_muisic },
    { title: "Fifth Song", artist: "Artist Name", imgSrc: LIsst_muisic },
    { title: "Sixth Song", artist: "Artist Name", imgSrc: LIsst_muisic },
    { title: "Seventh Song", artist: "Artist Name", imgSrc: LIsst_muisic },
    { title: "Eighth Song", artist: "Artist Name", imgSrc: LIsst_muisic },
    { title: "Ninth Song", artist: "Artist hoài", imgSrc: LIsst_muisic },
    { title: "Tenth Song", artist: "Artist nga", imgSrc: LIsst_muisic },
    // Thêm nhiều mục nữa nếu cần...
  ];

  const handleNext = () => {
    if (currentIndex < playListData.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className={cx("Play_list_results")}>
      <p>
        PLAYLIST <span>(Có {playListData.length} kết quả)</span>
      </p>
      <div className={cx("Play_listsssaaaaas_results")}>
        {playListData
          .slice(currentIndex, currentIndex + itemsToShow)
          .map((item, index) => (
            <div key={index} className={cx("Play_listssss_results")}>
              <div className={cx("Play_listsssss_results")}>
                <div className={cx("Playss_list_results")}>
                  <img
                    className={cx("Plssssay_list_results")}
                    src={item.imgSrc}
                    alt={item.title}
                  />
                  <p className={cx("Plasssy_list_results")}>{item.title}</p>
                  <p>{item.artist}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Nếu số mục lớn hơn itemsPerPage, hiển thị nút điều hướng */}
      {playListData.length > itemsPerPage && (
        <>
          <p
            className={cx("Pdddlasssy_list_results sssss")}
            onClick={handlePrev}
          >
            <FontAwesomeIcon
              className={cx("Plasssy_sssslist_results lesft")}
              icon={faArrowLeft}
            />
          </p>
          <p
            className={cx("Pdddlasssy_list_results pppp")}
            onClick={handleNext}
          >
            <FontAwesomeIcon
              className={cx("Plasssy_sssslist_results right")}
              icon={faArrowRight}
            />
          </p>
        </>
      )}
    </div>
  );
}

export default Play_list;
