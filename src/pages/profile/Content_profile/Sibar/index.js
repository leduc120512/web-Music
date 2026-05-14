import React, { useState } from "react";
import classnames from "classnames/bind";
import styles from "./Sibar-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

const recommendations = [
  "Anh trai say hi",
  "Nhạc mới hôm nay",
  "Top V-Pop nổi bật",
  "Ballad Việt",
  "Chill cuối ngày",
  "Acoustic nhẹ nhàng",
  "Rap Việt tuyển chọn",
  "EDM năng lượng",
  "Indie Việt",
  "Playlist làm việc",
];

function Sibar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedRecommendations = isExpanded ? recommendations : recommendations.slice(0, 5);

  return (
    <aside className={cx("Sibar")}>
      <section className={cx("Sibar_conternt")}>
        <p className={cx("Sibarssss")}>Gợi ý dành cho bạn</p>
        <p className={cx("sidebarIntro")}>Thưởng thức những ca khúc phù hợp nhất với gu nghe nhạc của bạn.</p>
        <button type="button" className={cx("ssSibsssssarsssssssss")}>
          <FontAwesomeIcon className={cx("sssssdsjhsd")} icon={faPlay} />
          <span>Nghe bài hát</span>
        </button>
      </section>

      <section className={cx("Music_right_header", "ssssssssdsjhsd")}>
        <div className={cx("Musisssac_right_header")}>
          <p className={cx("dfiudsd")}>Có thể bạn thích</p>
        </div>
        <div className={cx("Musiac_right_header")}>
          {displayedRecommendations.map((title, index) => (
            <div key={title} className={cx("Musiacsa_right_header")}>
              <span className={cx("recommendRank")}>{index + 1}</span>
              <FontAwesomeIcon className={cx("Musiac_righst_header")} icon={faMusic} />
              <div>
                <p className={cx("Musiac_righsst_header")}>{title}</p>
                <p className={cx("Maausiac_righstss_header")}>Đề xuất theo hồ sơ của bạn</p>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={cx("Maausiac_sssssrighstaaass_header")}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <span>{isExpanded ? "Rút gọn" : "Xem thêm"}</span>
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </button>
        </div>
      </section>
    </aside>
  );
}

export default Sibar;
