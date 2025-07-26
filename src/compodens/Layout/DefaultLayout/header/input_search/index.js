import React, { useEffect, useState } from "react";
import styles from "./input_search-module.scss";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import songApi from "../../../../../api/api_music";

const cx = classnames.bind(styles);

const Input_search = () => {
    const [keyword, setKeyword] = useState("");
    const [topSongs, setTopSongs] = useState([]);
    const [suggestedSongs, setSuggestedSongs] = useState([]);

    // Load 5 bài mới nhất khi vào trang
    useEffect(() => {
        songApi
            .getLatestSuggestions()
            .then((res) => {
                if (res.data.success) {
                    setTopSongs(res.data.data);
                }
            })
            .catch((err) => console.error("Lỗi lấy top mới nhất:", err));
    }, []);

    // Gợi ý khi nhập từ khóa
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (keyword.trim()) {
                songApi
                    .search(keyword.trim())
                    .then((res) => {
                        if (res.data.success) {
                            const result = res.data.data.content.slice(0, 5); // lấy 5 đầu tiên
                            setSuggestedSongs(result);
                        }
                    })
                    .catch((err) => console.error("Lỗi gợi ý tìm kiếm:", err));
            } else {
                setSuggestedSongs([]);
            }
        }, 300); // debounce 300ms

        return () => clearTimeout(delayDebounce);
    }, [keyword]);

    return (
        <div className={cx("Inpur_search_value")}>
            <input
                type="text"
                placeholder="Nhập từ khóa..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={cx("Inpur_search_input")}
            />

            {/* Nếu có từ khóa, hiển thị kết quả tìm kiếm */}
            {keyword.trim() ? (
                <>
                    <p className={cx("Inpur_search_value_text")}>Kết quả gợi ý</p>
                    <div className={cx("Inpur_search_List_hot_search")}>
                        {suggestedSongs.map((song, index) => (
                            <Link
                                key={song.id}
                                to={`/Search_results?keyword=${encodeURIComponent(song.title)}`}
                            >
                                <div>
                                    <span className={cx("Inpur_search_List_hot_search_color1")}>{index + 1}</span>
                                    <p>{song.title}</p>
                                </div>
                            </Link>
                        ))}
                        {suggestedSongs.length === 0 && (
                            <p style={{ paddingLeft: 10 }}>Không tìm thấy kết quả.</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className={cx("Inpur_search_value_text")}>Từ Khóa Tìm Kiếm Nhiều Nhất</p>
                    <div className={cx("Inpur_search_List_hot_search")}>
                        {topSongs.map((song, index) => (
                            <Link
                                key={song.id}
                                to={`/Search_results?keyword=${encodeURIComponent(song.title)}`}
                            >
                                <div>
                                    <span className={cx("Inpur_search_List_hot_search_color1")}>{index + 1}</span>
                                    <p>{song.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {/* Lịch sử tìm kiếm */}
            <div className={cx("Inpur_search_List_hot_search_text_history")}>
                <Link to="/Search_results">
                    <p>Lịch Sử Tìm Kiếm Của Bạn</p>
                </Link>
                <FontAwesomeIcon className={cx("Inpur_search_List_icon")} icon={faDeleteLeft} />
            </div>

            <div className={cx("Inpur_search_List_hot_search_do_not_history")}>
                <p>Không Có Lịch Sử Tìm Kiếm Nào</p>
            </div>
        </div>
    );
};

export default Input_search;
