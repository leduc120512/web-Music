import React from "react";
import Header from "../../compodens/Layout/DefaultLayout/header";
import classnames from "classnames/bind";
import styles from "./results_search-module.scss";
import Results from "./results";
import Siderbar from "../../compodens/Layout/DefaultLayout/Sidebar";
import Play_list from "./results/Play_list";
const cx = classnames.bind(styles);

function Search_results() {
  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("contentT CONTENTW")}>
        <div className={cx("Content-width")}>
          <Results />
        </div>
        <div className={cx("Sider-bar-width")}>
          <Siderbar />
        </div>
      </div>
    </div>
  );
}

export default Search_results;
