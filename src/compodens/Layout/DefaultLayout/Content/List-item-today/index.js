import styles from "./List-item-today-module.scss";

import classnames from "classnames/bind";

import imglist from "../ANH/SONTUNG.webp";
import Text from "../../../../../pages/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
function List_item() {
  return (
    <div className={cx("content")}>
      <div className={cx("list-music-lk")}>
        <Text>LE XUAN DUC</Text>
        <div className={cx("list-music")}>
          <div className={cx("item-music")}>
            <Link to="/Nhac">
              <img className={cx("list-SINGER")} src={imglist} />
              <FontAwesomeIcon
                className={cx("list-SINGER_play")}
                icon={faPlay}
              />
              <p>Tiềm Năng V-Pop</p>
            </Link>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
        </div>
      </div>
      <div className={cx("list-music-lk")}>
        <Text>LE XUAN DUC</Text>
        <div className={cx("list-music")}>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
        </div>
      </div>
      <div className={cx("list-music-lk")}>
        <Text>LE XUAN DUC</Text>
        <div className={cx("list-music")}>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
        </div>
      </div>
      <div className={cx("list-music-lk")}>
        <Text>LE XUAN DUC</Text>
        <div className={cx("list-music")}>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
          <div className={cx("item-music")}>
            <img className={cx("list-SINGER")} src={imglist} />
            <p>Tiềm Năng V-Pop</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List_item;
