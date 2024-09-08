// Text.js

import React from "react";
import styles from "./input_search-module.scss"; // Đường dẫn đúng đến file SCSS module
import { Link, NavLink } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

const Input_search = () => {
  return (
    <div className={cx("Inpur_search_value")}>
      <p className={cx("Inpur_search_value_text")}>
        Từ Khóa Tìm Kiếm Nhiều Nhất
      </p>
      <div className={cx("Inpur_search_List_hot_search")}>
        <Link to="/Search_results">
          <div>
            <span className={cx("Inpur_search_List_hot_search_color1")}>1</span>
            <p>Anh Trai Say Hi!</p>
          </div>
        </Link>
        <div>
          <span className={cx("Inpur_search_List_hot_search_color1")}>1</span>
          <p>Anh Trai Say Hi!</p>
        </div>{" "}
        <div>
          <span className={cx("Inpur_search_List_hot_search_color1")}>1</span>
          <p>Anh Trai Say Hi!</p>
        </div>{" "}
        <div>
          <span className={cx("Inpur_search_List_hot_search_color1")}>1</span>
          <p>Anh Trai Say Hi!</p>
        </div>{" "}
        <div>
          <span className={cx("Inpur_search_List_hot_search_color1")}>1</span>
          <p>Anh Trai Say Hi!</p>
        </div>
      </div>
      <div className={cx("Inpur_search_List_hot_search_text_history")}>
        <NavLink to="/Search_results">
          {" "}
          <p>Lịch Sử Tìm Kiếm Của Bạn</p>
        </NavLink>
        <FontAwesomeIcon
          className={cx("Inpur_search_List_icon")}
          icon={faDeleteLeft}
        />
      </div>
      <div className={cx("Inpur_search_List_hot_search_do_not_history")}>
        <p>Không Có Lịch Sử Tìm Kiếm Nào</p>
      </div>
    </div>
  );
};

export default Input_search;
