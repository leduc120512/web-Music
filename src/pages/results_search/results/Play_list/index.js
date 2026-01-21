import * as React from "react";
import classnames from "classnames/bind";
import styles from "../../results_search-module.scss";
import LIsst_muisic from "../1723784458729.jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);
const API_BASE = "http://localhost:8082";

function Play_list() {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [playListData, setPlayListData] = React.useState([]);
    const itemsToShow = 5;
    const itemsPerPage = 5;

    React.useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/albums/latest`, {
                    params: { page: 0, size: 20 },
                });

                const content = res?.data?.data?.content || [];

                // ❗ Lọc bỏ những album có title === "1"
                const filtered = content.filter(
                    (alb) => String(alb.title || "").trim() !== "1"
                );

                setPlayListData(
                    filtered.map((alb) => ({
                        title: alb.title || "Untitled Album",
                        artist: alb.artistName || "Unknown Artist",
                        imgSrc: alb.coverImage
                            ? `${API_BASE}${alb.coverImage}`
                            : LIsst_muisic,
                    }))
                );
            } catch (e) {
                console.error("Lỗi khi lấy album:", e);
                setPlayListData([]);
            }
        };
        fetchAlbums();
    }, []);

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
