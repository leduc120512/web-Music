import styles from "../../Header-module.scss";
import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classnames.bind(styles);

function VIDEO() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8082/api/albums/latest?page=0&size=50"
                );

                const albumList = response.data?.data?.content || [];
                setAlbums(albumList);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <div className={cx("video")}>
            {albums.map((album) => (
                <p key={album.id}>{album.title}</p>
            ))}
        </div>
    );
}

export default VIDEO;