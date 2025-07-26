import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../Header-module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function BXH() {
    const [albums, setAlbums] = useState({
        vietnam: [],
        auMy: [],
        chauA: [],
        khac: [],
    });

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8082/api/albums/latest?page=0&size=50"
                );

                const albumList = response.data?.data?.content || [];

                // Lọc theo description (thể loại), viết thường để so sánh
                const vietnam = albumList.filter((a) =>
                    a.description?.toLowerCase().includes("việt nam")
                );
                const auMy = albumList.filter((a) =>
                    a.description?.toLowerCase().includes("âu mỹ")
                );
                const chauA = albumList.filter((a) =>
                    a.description?.toLowerCase().includes("châu á")
                );
                const khac = albumList.filter(
                    (a) =>
                        !vietnam.includes(a) &&
                        !auMy.includes(a) &&
                        !chauA.includes(a)
                );

                setAlbums({
                    vietnam,
                    auMy,
                    chauA,
                    khac,
                });
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        fetchAlbums();
    }, []);

    const renderAlbumGroup = (label, items) => (
        <div className={cx("BXH-list")}>
            <span className={cx("NAV_main")}>{label}</span>
            <div>
                {items.map((album) => (
                    <span key={album.id} className={cx("NAV_ITEM")}>
            {album.title}
          </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className={cx("BXH")}>
            {renderAlbumGroup("VIỆT NAM", albums.vietnam)}
            {renderAlbumGroup("ÂU MỸ", albums.auMy)}
            {renderAlbumGroup("CHÂU Á", albums.chauA)}
            {renderAlbumGroup("KHÁC", albums.khac)}
        </div>
    );
}

export default BXH;