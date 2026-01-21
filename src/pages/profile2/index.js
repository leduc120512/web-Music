import React from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./profile-module.scss";

import Header from "../../compodens/Layout/DefaultLayout/header";
import Content_profile from "./Content_profile";

const cx = classnames.bind(styles);

function Profilee() {
    const { id } = useParams(); // 👈 lấy ID ở đây

    return (
        <div className={cx("Appa")}>
            <div className={cx("header")}>
                <Header />
            </div>
            <div className={cx("pprofile")}>
                {/* truyền id xuống nếu cần */}
                <Content_profile id={id} />
            </div>
        </div>
    );
}

export default Profilee;
