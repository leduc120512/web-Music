// Text.js

import React from "react";
import styles from "./Uploat-module.scss"; // Đường dẫn đúng đến file SCSS module

import classnames from "classnames/bind";
import Img_upload from "./web nhac.png";
import { Button } from "@mui/material";

const cx = classnames.bind(styles);

const UpLoad = () => {
  return (
    <div className={cx("UpLoad")}>
      <div className={cx("UpLoad_content")}>
        <div className={cx("UpLoad_main_list")}>
          {" "}
          <img className={cx("UpLoad_img")} src={Img_upload} />
          <h1>Chọn hoặc kéo thả file để tải lên</h1>
          <div className={cx("UpLoad_imsg")}>
            <p>
              Hỗ trợ các định dạng .mp3, .wma, .mp2, .asf, .wav, .wmv, .mp4,
              .flv, .mpg, .mpe, .avi, .3gp, .dat, .flac
            </p>
            <p>Hỗ trợ embed link Youtube</p>
          </div>
          <Button className={cx("UpLoad_btn")} variant="contained">
            <p>Chọn File</p> 
          </Button>
        </div>
        <div className={cx("UpLoad_regulations")}>
          <div className={cx("UpLoad_regulations1")}>
            <h4>Hướng dẫn:</h4>
            <div>
              <p>- Tài khoản đã được kích hoạt và đăng nhập thành công.</p>
              <p>- File upload không quá 120Mb, bit-rate 128kbs trở lên.</p>
              <p>
                - Định dạng file upload: .mp3, .wma, .mp2, .asf, .wav, .wmv,
                .mp4, .flv, .mpg, .mpe, .avi, .3gp, .dat, .flac.
              </p>
              <p>
                - Thời gian kiểm duyệt: 72 giờ (User Thường) và 12 giờ (User
                VIP).
              </p>
              <p>
                - Hình ảnh bài hát (cover) phải có kích thước ít nhất là 640x640
                pixel, hình ảnh video (cover) phải có kích thước ít nhất là
                840x472 pixel.
              </p>
            </div>
          </div>
          <div className={cx("UpLoad_regulations1")}>
            {" "}
            <h4>Hướng dẫn:</h4>
            <div>
              <p>
                - Bài hát đăng tải vi phạm nội dung cung cấp trong Thỏa thuận sử
                dụng sẽ bị xóa khỏi hệ thống và tài khoản sẽ bị xóa vĩnh viễn.
              </p>
              <p>- Hình ảnh có nội dung không phù hợp sẽ bị xóa.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpLoad;
