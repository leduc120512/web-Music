import React, { useState } from "react";
import axios from "axios";
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
    fullName: "",
  });

  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }

    if (!agree) {
      alert("Bạn phải đồng ý với chính sách.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName || formData.username,
      };

      const response = await axios.post("http://localhost:8082/api/auth/signup", payload);

      if (response.data.success) {
        alert("Đăng ký thành công!");
        handleClose();
      } else {
        alert("Đăng ký thất bại: " + (response.data.message || "Lỗi không xác định."));
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      alert("Đăng ký thất bại: " + (error.response?.data?.message || "Lỗi server."));
    } finally {
      setLoading(false);
    }
  };

  return (
      <Modal open={open} onClose={handleClose}>
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
                    <tbody>
                    <tr className={cx("Create_td")}>
                      <td className={cx("Login_td")}>Tên đăng nhập*</td>
                      <td>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className={cx("Login_input")}
                        />
                      </td>
                    </tr>
                    <tr className={cx("Create_td")}>
                      <td className={cx("Login_td")}>Email*</td>
                      <td>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={cx("Login_input")}
                        />
                      </td>
                    </tr>
                    <tr className={cx("Create_td")}>
                      <td className={cx("Login_td")}>Mật khẩu*</td>
                      <td>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={cx("Login_input")}
                        />
                      </td>
                    </tr>
                    <tr className={cx("Create_td")}>
                      <td className={cx("Login_td")}>Nhập lại mật khẩu*</td>
                      <td>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
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
                          <Checkbox
                              checked={agree}
                              onChange={(e) => setAgree(e.target.checked)}
                              {...label}
                          />
                          <p>
                            Tôi đã đọc và đồng ý với Chính sách bảo mật & điều khoản sử dụng
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr className={cx("Create_td")}>
                      <td></td>
                      <td>
                        <Button
                            className={cx("Login_input")}
                            variant="contained"
                            color="success"
                            type="submit"
                            disabled={loading}
                        >
                          {loading ? "Đang xử lý..." : "ĐĂNG KÝ NGAY"}
                        </Button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
  );
}

export default Create_Acount;
