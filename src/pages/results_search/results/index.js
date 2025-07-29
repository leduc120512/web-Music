import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import classnames from "classnames/bind";
import styles from "../results_search-module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFile,
    faLightbulb,
    faHeart,
    faCopy,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import List_item_music from "./List_item_musci1";
import Play_list from "./Play_list";

const cx = classnames.bind(styles);

function Results() {
    const { id } = useParams();
    const [song, setSong] = useState(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8082/api/songs/${id}`)
                .then((res) => {
                    if (res.data.success) {
                        setSong(res.data.data);
                    }
                })
                .catch((err) => {
                    console.error("Lỗi khi lấy bài hát:", err);
                });
        }
    }, [id]);

    return (
        <div className={cx("Results")}>
            <h2 className={cx("Results_header")}>TÌM KIẾM</h2>

            <div className={cx("Results_Link")}>
                <ul className={cx("Results_list", "Results_list_left")}>
                    <li>Tất cả</li>
                    <li>Bài hát</li>
                    <li>Playlist</li>
                    <li>Video</li>
                    <li>Karaoke</li>
                </ul>
                <ul className={cx("Results_list", "Results_list_right")}>
                    <li className={cx("Results_list222")}>Lọc</li>
                    <li>
                        <FontAwesomeIcon className={cx("Results_icon")} icon={faFile} />
                    </li>
                </ul>
            </div>

            <p className={cx("Results_lissst_research")}>
                I'm Thinking About You <span>có 870,731 kết quả</span>
            </p>

            <p className={cx("Resssssults_list_How_to")}>
                <FontAwesomeIcon
                    className={cx("Ressssssssults_list_How_to")}
                    icon={faLightbulb}
                />
                Bạn muốn tìm <span>Bài Hát, Album</span> hay <span>Video</span> cho{" "}
                <span>I'm Thinking About You?</span>
            </p>

            <p className={cx("Ressssssssultsss_list_How_to")}>
                BÀI HÁT <span>(Có 696,555 kết quả)</span>
            </p>

            {/* ✅ Thông tin bài hát từ API */}
            {song && (
                <div className={cx("song_card")}>
                    <img
                        src={song.thumbnail || "https://via.placeholder.com/60"}
                        alt={song.title}
                        className={cx("song_thumbnail")}
                    />
                    <div className={cx("song_info")}>
                        <p className={cx("song_title")}>{song.title}</p>
                        <p className={cx("song_artist")}>{song.artist}</p>
                    </div>
                    <div className={cx("song_tags")}>
            <span className={cx("tag_official")}>
              <FontAwesomeIcon icon={faCircleCheck} /> OFFICIAL
            </span>
                        <span className={cx("tag_sq")}>SQ</span>
                    </div>
                    <div className={cx("song_actions")}>
                        <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
                        <FontAwesomeIcon icon={faCopy} className={cx("icon")} />
                    </div>
                </div>
            )}

            <List_item_music />
            <Play_list />
        </div>
    );
}

export default Results;
