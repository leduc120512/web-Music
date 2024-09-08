import styles from "./Content-module.scss";

import classnames from "classnames/bind";
import Buttonn from "../button";
import imglist from "./ANH/SONTUNG.webp";
import Text from "../../../../pages/text";
import List_item from "./List-item-today";
import Mv_hot from "./Mv-hot";

const cx = classnames.bind(styles);
function Content() {
  return (
    <div className={cx("coentent")}>
      <div>
        <List_item />
      </div>
      <div className={cx("MV-HOT")}>
        <Text>MV HOT</Text>
        <Mv_hot />
      </div>
    </div>
  );
}

export default Content;
