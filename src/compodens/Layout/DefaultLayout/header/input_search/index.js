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
                                           historyItems = [],
                                           loading = false,
                                           onSelect = () => {},
                                           onHistorySelect = () => {},
                                           onRemoveHistory = () => {},
                                           onClearHistory = () => {},
                                       }) {
    const hasKeyword = keyword.trim().length > 0;

    return (
        <div className={cx("Inpur_search_value")}>
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
                                    onClick={() => onSelect(song)}
                                >
                  <span className={cx("Inpur_search_List_hot_search_color1")}>
                    {index + 1}
                  </span>
                                    <p className={cx("ResultRowText")}>{song.title}</p>
                                </button>
                            ))
                        ) : (
                            !loading && <p className={cx("EmptyText")}>Không tìm thấy kết quả.</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className={cx("Inpur_search_value_text")}>Từ Khóa Tìm Kiếm Nhiều Nhất</p>
                    <div className={cx("Inpur_search_List_hot_search")}>
                        {topSongs?.map((song, index) => (
                            <button
                                key={song.id}
                                type="button"
                                className={cx("ResultRow")}
                                onClick={() => onSelect(song)}
                            >
                  <span className={cx("Inpur_search_List_hot_search_color1")}>
                    {index + 1}
                  </span>
                                    <p className={cx("ResultRowText")}>{song.title}</p>
                                <span className={cx("ResultRowArrow")}>›</span>
                            </button>
                        ))}
                    </div>
                </>
            )}

            <div className={cx("Inpur_search_List_hot_search_text_history")}>
                <Link to="/Search_results">
                    <p>Lịch Sử Tìm Kiếm Của Bạn</p>
                </Link>
                <button
                    type="button"
                    className={cx("ClearHistoryBtn")}
                    onClick={onClearHistory}
                    disabled={historyItems.length === 0}
                    aria-label="Xoa toan bo lich su tim kiem"
                >
                    <FontAwesomeIcon className={cx("Inpur_search_List_icon")} icon={faDeleteLeft} />
                </button>
            </div>

            {historyItems.length > 0 ? (
                <div className={cx("HistoryList")}> 
                    {historyItems.map((item) => (
                        <div key={item.key} className={cx("HistoryRow")}>
                            <button
                                type="button"
                                className={cx("HistorySelect")}
                                onClick={() => onHistorySelect(item)}
                            >
                                <p className={cx("HistoryTitle")}>{item.title || item.keyword}</p>
                                {item.artist && <p className={cx("HistorySub")}>{item.artist}</p>}
                            </button>
                            <button
                                type="button"
                                className={cx("HistoryRemove")}
                                onClick={() => onRemoveHistory(item.key)}
                                aria-label={`Xoa ${item.title || item.keyword} khoi lich su`}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx("Inpur_search_List_hot_search_do_not_history")}>
                    <p>Không Có Lịch Sử Tìm Kiếm Nào</p>
                </div>
            )}
        </div>
    );
}
