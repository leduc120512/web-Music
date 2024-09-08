import React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import classnames from "classnames/bind";
import styles from "../Login_logOut-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceFive, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
const cx = classnames.bind(styles);

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 405,
  bgcolor: "background.paper",
};

function ReusableModal({ open, handleClose }) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("Login_main")}>
          <div className={cx("Login_header")}>
            <p>Đăng Nhập</p>
            <FontAwesomeIcon
              onClick={handleClose}
              className={cx("Login_icon1")}
              icon={faWindowClose}
            />
          </div>
          <div className={cx("Login_content")}>
            <div className={cx("Login_inputs")}>
              <p className={cx("Login_issfputs")}>
                Những thông tin có đánh dấu (*) là bắt buộc nhập
              </p>
              <table>
                <tr className={cx("Login_tr")}>
                  <td className={cx("Login_td")}>Tên Đăng Nhập</td>
                  <td>
                    <input
                      type="text"
                      id="first"
                      name="first"
                      placeholder="Enter your Username"
                      required
                      className={cx("Login_input")}
                    />
                  </td>
                </tr>
                <tr className={cx("Login_tr")}>
                  <td className={cx("")}>Mật Khẩu</td>
                  <td>
                    {" "}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your Password"
                      required
                      className={cx("Login_input")}
                    />
                  </td>
                </tr>
                <tr className={cx("Login_tr")}>
                  <td></td>
                  <td>
                    {" "}
                    <div className={cx("Login_list")}>
                      <Checkbox {...label} defaultChecked />
                      <p>Nhớ mật khẩu</p>
                    </div>
                  </td>
                </tr>
                <tr className={cx("Login_tr")}>
                  <td></td>
                  <td>
                    <div className={cx("Login_list fijkjd")}>
                      <Checkbox {...label} defaultChecked />
                      <p>
                        Tôi đã đọc, hiểu rõ và tự nguyện đồng ý các điều khoản
                        về việc thu thập, xử lý dữ liệu cá nhân, quyền và nghĩa
                        vụ của tôi được quy định tại Chính sách bảo mật và Thỏa
                        thuận sử dụng, và các chính sách khác được ban hành bởi
                        NCT
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className={cx("Login_tr")}>
                  <td></td>
                  <td></td>
                </tr>
                <tr className={cx("Login_tr")}>
                  <td></td>

                  <td colSpan={2} className={cx("Login_quen")}>
                    Quên mật khẩu
                  </td>
                </tr>
                <tr className={cx("Login_tr")}>
                  <td></td>
                  <td colSpan={3}>
                    <Button
                      className={cx("Login_input dhj")}
                      variant="contained"
                      color="success"
                    >
                      Đăng Nhập
                    </Button>
                  </td>
                </tr>
              </table>
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
                  ĐĂNG KÝ NGAY
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

export default ReusableModal;
