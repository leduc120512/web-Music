import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import styles from "../Login_logOut-module.scss";
import userApi from "../../../api/api_user";

const cx = classnames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 540 },
  bgcolor: "transparent",
  outline: "none",
};

function Create_Acount({ open, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "",
    gender: "OTHER",
    avatar: null,
  });

  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] || null : value,
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
      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("fullName", formData.fullName || formData.username);
      payload.append("gender", formData.gender || "OTHER");
      if (formData.avatar) {
        payload.append("avatar", formData.avatar);
      }

      const response = await userApi.signup(payload);

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
      <Modal
          open={open}
          onClose={handleClose}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: "rgba(2, 6, 23, 0.78)",
                backdropFilter: "blur(4px)",
              },
            },
          }}
      >
        <Box sx={style}>
          <div className={cx("Create_Acount", "Create_main") }>
            <div className={cx("Login_header")}>
              <p>Đăng Ký</p>
              <FontAwesomeIcon
                  onClick={handleClose}
                  className={cx("Login_icon1", "Login_close")}
                  icon={faWindowClose}
              />
            </div>
            <form className={cx("Create_content")} onSubmit={handleSubmit}>
              <p className={cx("Login_issfputs")}>Những thông tin có đánh dấu (*) là bắt buộc nhập</p>

              <div className={cx("Login_field")}>
                <label htmlFor="register-username">Tên đăng nhập *</label>
                <input
                    id="register-username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Nhập tên đăng nhập"
                    className={cx("Login_input")}
                />
              </div>

              <div className={cx("Login_field")}>
                <label htmlFor="register-email">Email *</label>
                <input
                    id="register-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Nhập email"
                    className={cx("Login_input")}
                />
              </div>

              <div className={cx("Create_grid") }>
                <div className={cx("Login_field")}>
                  <label htmlFor="register-password">Mật khẩu *</label>
                  <input
                      id="register-password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Nhập mật khẩu"
                      className={cx("Login_input")}
                  />
                </div>

                <div className={cx("Login_field")}>
                  <label htmlFor="register-confirm-password">Nhập lại mật khẩu *</label>
                  <input
                      id="register-confirm-password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Nhập lại mật khẩu"
                      className={cx("Login_input")}
                  />
                </div>
              </div>

              <div className={cx("Create_grid") }>
                <div className={cx("Login_field")}>
                  <label htmlFor="register-gender">Giới tính *</label>
                  <select
                    id="register-gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={cx("Login_input")}
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>

                <div className={cx("Login_field")}>
                  <label htmlFor="register-avatar">Ảnh đại diện (tuỳ chọn)</label>
                  <input
                    id="register-avatar"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className={cx("Login_input")}
                  />
                </div>
              </div>

              <label className={cx("Create_agree") }>
                <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    sx={{ color: "#67e8f9", "&.Mui-checked": { color: "#22d3ee" } }}
                />
                <span>Tôi đã đọc và đồng ý với Chính sách bảo mật và điều khoản sử dụng</span>
              </label>

              <Button
                  className={cx("Create_submit")}
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  disableElevation
                  fullWidth
              >
                {loading ? "Đang xử lý..." : "Đăng Ký Ngay"}
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
  );
}

export default Create_Acount;
