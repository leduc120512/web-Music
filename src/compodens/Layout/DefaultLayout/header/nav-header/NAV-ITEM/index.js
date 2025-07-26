import React, { useState } from "react";
import styles from "./NAV-ITEM-MODULE.SCSS"; // Adjusted import path
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function NAV_ITEM({ children }) {
  const [hoverd,sethover]=useState(
    {
      playlist:false,
      kdf:true,
    }
  )
  const sethovegvr = (key)=>{
    sethover((prevState) => ({...prevState,[key]:true}))
  }
  return <div className={cx("NAV_ITEM")}>{children}</div>;
}

export default NAV_ITEM;
