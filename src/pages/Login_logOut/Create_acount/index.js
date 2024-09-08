import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";

import Checkbox from "@mui/material/Checkbox";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceFive, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import styles from "../Login_logOut-module.scss";
const cx = classnames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 400,
  bgcolor: "background.paper",
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Create_Acount({ open, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm logic xử lý khi submit form
    console.log("Form data:", formData);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("Create_Acount")}>
          <div className={cx("Login_header")}>
            <p>Đăng Ký</p>
            <FontAwesomeIcon
              onClick={handleClose}
              className={cx("Login_icon1")}
              icon={faWindowClose}
            />
          </div>
          <div className={cx("Login_iconsd1")}>
            <div className={cx("Create_content")}>
              <p>Những thông tin có đánh dấu (*) là bắt buộc nhập</p>
              <form onSubmit={handleSubmit}>
                <table>
                  <tr className={cx("Create_td")}>
                    <td className={cx("Login_td sd")}>Tên đăng nhập*</td>
                    <td>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className={cx("Login_input")}
                      />
                    </td>
                  </tr>
                  <tr className={cx("Create_td")}>
                    <td className={cx("Login_td")}>Mật khẩu</td>
                    <td>
                      {" "}
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={cx("Login_input")}
                      />
                    </td>
                  </tr>
                  <tr className={cx("Create_td")}>
                    <td className={cx("Login_td")}>Nhập lại mật khẩu</td>
                    <td>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={cx("Login_input")}
                      />
                    </td>
                  </tr>
                  <tr className={cx("Create_td")}>
                    <td className={cx("Login_td")}>Email</td>
                    <td>
                      {" "}
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={cx("Login_input")}
                      />
                    </td>
                  </tr>

                  <tr className={cx("Create_td")}>
                    <td></td>
                    <td>
                      <div className={cx("Create_tded")}>
                        {" "}
                        <Checkbox {...label} defaultChecked />
                        <p>
                          Tôi đã đọc, hiểu rõ và tự nguyện đồng ý các điều khoản
                          về việc thu thập, xử lý dữ liệu cá nhân, quyền và
                          nghĩa vụ của tôi được quy định tại Chính sách bảo mật
                          và Thỏa thuận sử dụng, và các chính sách khác được ban
                          hành bởi NCT
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr className={cx("Create_td")}>
                    <td></td>
                    <td>
                      {" "}
                      <Button
                        className={cx("Login_input")}
                        variant="contained"
                        color="success"
                      >
                        ĐĂNG KÝ NGAY
                      </Button>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <div className={cx("Login_btn")}>
              <div className={cx("Logi1n_btn")}>
                <p className={cx("Logi1n_btn_text")}>
                  Bạn chưa có tài khoản NCT ID?
                </p>
                <Button
                  className={cx("Logi1n_btn_login")}
                  variant="outlined"
                  color="error"
                >
                  ĐĂNG KÝ MỚI
                </Button>
                <p className={cx("Logi1n_btn_logins")}>Hoặc</p>
                <div className={cx("Login_list_i")}>
                  <div className={cx("Login_list_icon")}>
                    <FontAwesomeIcon
                      onClick={handleClose}
                      className={cx("Login_icon2")}
                      icon={faDiceFive}
                    />{" "}
                    <p>Đăng nhập qua Google</p>
                  </div>
                  <div className={cx("Login_list_icon")}>
                    {" "}
                    <FontAwesomeIcon
                      onClick={handleClose}
                      className={cx("Login_icon2")}
                      icon={faDiceFive}
                    />{" "}
                    <p>Đăng nhập qua Google</p>
                  </div>
                  <div className={cx("Login_list_icon")}>
                    {" "}
                    <FontAwesomeIcon
                      onClick={handleClose}
                      className={cx("Login_icon2")}
                      icon={faDiceFive}
                    />{" "}
                    <p>Đăng nhập bằng mã QR</p>{" "}
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Create_Acount;
