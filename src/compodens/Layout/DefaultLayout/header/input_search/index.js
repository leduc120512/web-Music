// src/compodens/Layout/DefaultLayout/header/input_search.jsx
import React from "react";
import styles from "./input_search-module.scss";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

export default function SearchDropdown({
                                           keyword = "",
                                           topSongs = [],
                                           suggestedSongs = [],
                                           loading = false,
                                           onSelect = () => {},
                                       }) {
    const hasKeyword = keyword.trim().length > 0;

    return (
        <div className={cx("Inpur_search_value")}>
            {/* KHÔNG có <input> ở đây nữa */}

            {hasKeyword ? (
                <>
                    <p className={cx("Inpur_search_value_text")}>
                        {loading ? "Đang tìm..." : "Kết quả gợi ý"}
                    </p>
                    <div className={cx("Inpur_search_List_hot_search")}>
                        {(!loading && suggestedSongs?.length > 0) ? (
                            suggestedSongs.map((song, index) => (
                                <button
                                    key={song.id}
                                    type="button"
                                    className={cx("ResultRow")}
                                    onClick={() => onSelect(song.id)}
                                >
                  <span className={cx("Inpur_search_List_hot_search_color1")}>
                    {index + 1}
                  </span>
                                    <p>{song.title}</p>
                                </button>
                            ))
                        ) : (
                            !loading && <p style={{ paddingLeft: 10 }}>Không tìm thấy kết quả.</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className={cx("Inpur_search_value_text")}>Từ Khóa Tìm Kiếm Nhiều Nhất</p>
                    <div className={cx("Inpur_search_List_hot_search")}>
                        {topSongs?.map((song, index) => (
                            <Link key={song.id} to={`/Search_results/${song.id}`}>
                                <div>
                  <span className={cx("Inpur_search_List_hot_search_color1")}>
                    {index + 1}
                  </span>
                                    <p>{song.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {/* Lịch sử tìm kiếm: giữ UI cũ (tùy bạn implement thêm) */}
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
}
