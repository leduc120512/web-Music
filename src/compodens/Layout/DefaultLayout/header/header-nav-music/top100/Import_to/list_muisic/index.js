import styles from "../Vietnam-module.scss";

import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEquals,
  faFire,
  faHeart,
  faLocationPinLock,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Img_music_aa from "./234.jpg";
const cx = classnames.bind(styles);
function Listmuici_detail() {
  return (
    <div className={cx("Listmuici_detail")}>
      <p className={cx("Listmuici_detssail")}>1</p>
      <FontAwesomeIcon
        className={cx("Listmuici_detail_icon")}
        icon={faEquals}
      />
      <div className={cx("Listmuiciss_dssdetail")}>
        <img src={Img_music_aa} />
        <div className={cx("Listmuici_dssdetail")}>
          <p className={cx("Lisdatmuici_detail")}>KIM GIỜ , KIM PHÚT</p>
          <p>saac, Negav, HIEUTHUHAI, HURRYKNG, Pháp Kiều, ANH TRAI "SAY HI"</p>
        </div>
      </div>
      <div className={cx("Listssafsamuici_detail")}>
        <p>
          <span>
            <FontAwesomeIcon
              className={cx("Listmuici_sasdetaasil")}
              icon={faFire}
            />
          </span>{" "}
          0
        </p>
        <p>
          <span>
            <FontAwesomeIcon
              className={cx("Listmuici_sasdetaasil")}
              icon={faFire}
            />
          </span>{" "}
          0
        </p>
        <p>
          <span>
            <FontAwesomeIcon
              className={cx("Listmuici_sasdetaasil")}
              icon={faLocationPinLock}
            />
          </span>{" "}
          2
        </p>
      </div>
      <div className={cx("Listmussici_detaasil")}>
        <FontAwesomeIcon
          className={cx("Listmuici_detaasil djs")}
          icon={faHeart}
        />
        <FontAwesomeIcon className={cx("Listmuici_detaasil")} icon={faPlay} />
      </div>
    </div>
  );
}

export default Listmuici_detail;
