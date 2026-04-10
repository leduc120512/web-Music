import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classnames from "classnames/bind";
import styles from "../Login_logOut-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

const cx = classnames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 520 },
  bgcolor: "transparent",
  outline: "none",
};

function ReusableModal({ open, handleClose }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleForgotPassword = () => {
    if (!forgotEmail.trim()) {
      alert("Vui lòng nhập email để nhận hướng dẫn đặt lại mật khẩu.");
      return;
    }

    alert("Đã ghi nhận yêu cầu. Vui lòng kiểm tra email của bạn.");
    setForgotOpen(false);
    setForgotEmail("");
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    if (!agree) {
      alert("Bạn phải đồng ý với điều khoản sử dụng.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8082/api/auth/signin", {
        usernameOrEmail: username,
        password: password,
      });

      const userData = response?.data?.data;
      const token = userData?.accessToken;
      const user = userData?.user;
      const role = user?.role;

      if (!token || !user || !role) {
        alert("Dữ liệu đăng nhập không hợp lệ, vui lòng thử lại.");
        return;
      }

      const isHttps = window.location.protocol === "https:";
      const cookieOptions = {
        expires: rememberMe ? 7 : undefined,
        secure: isHttps,
        sameSite: "strict",
      };

      // ✅ Lưu vào cookie
      Cookies.set("token", token, cookieOptions);

      Cookies.set("user", JSON.stringify(user), cookieOptions);

      Cookies.set("role", role, cookieOptions);


      handleClose();

      // ✅ Điều hướng theo vai trò
      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (role === "ROLE_AUTHOR") {
        navigate("/admin");
      }  else if (role === "ROLE_USER") {
        navigate("/");
      }

    } catch (error) {
      console.error("Đăng nhập thất bại:", error.response?.data || error.message);
      alert("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };


  return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: "rgba(2, 6, 23, 0.75)",
                backdropFilter: "blur(4px)",
              },
            },
          }}
        >
          <Box sx={style}>
          <div className={cx("Login_main")}>
            <div className={cx("Login_header")}>
              <p>Đăng Nhập</p>
              <FontAwesomeIcon
                  onClick={handleClose}
                  className={cx("Login_icon1", "Login_close")}
                  icon={faWindowClose}
              />
            </div>
            <form className={cx("Login_content")} onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
              <div className={cx("Login_inputs")}>
                <p className={cx("Login_issfputs")}>
                  Những thông tin có đánh dấu (*) là bắt buộc nhập
                </p>
                <div className={cx("Login_field")}>
                  <label htmlFor="login-username">Tên đăng nhập *</label>
                  <input
                      id="login-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nhập tên đăng nhập"
                      className={cx("Login_input")}
                      required
                  />
                </div>

                <div className={cx("Login_field")}>
                  <label htmlFor="login-password">Mật khẩu *</label>
                  <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className={cx("Login_input")}
                      required
                  />
                </div>

                <label className={cx("Login_list")}>
                  <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{ color: "#67e8f9", "&.Mui-checked": { color: "#22d3ee" } }}
                  />
                  <span>Nhớ mật khẩu</span>
                </label>

                <label className={cx("Login_list") }>
                  <Checkbox
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      sx={{ color: "#67e8f9", "&.Mui-checked": { color: "#22d3ee" } }}
                  />
                  <span>Tôi đồng ý với Chính sách bảo mật và Thỏa thuận sử dụng</span>
                </label>

                <div className={cx("Login_actions")}>
                  <button
                      type="button"
                      className={cx("Login_quen")}
                      onClick={() => setForgotOpen(true)}
                  >
                    Quên mật khẩu?
                  </button>
                </div>

                <Button
                    type="submit"
                    className={cx("Login_submit")}
                    variant="contained"
                    disabled={loading}
                    disableElevation
                    fullWidth
                >
                  {loading ? "Đang xử lý..." : "Đăng Nhập"}
                </Button>
              </div>
            </form>
          </div>
          </Box>
        </Modal>

        <Modal
            open={forgotOpen}
            onClose={() => setForgotOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(2, 6, 23, 0.78)",
                  backdropFilter: "blur(4px)",
                },
              },
            }}
        >
          <Box sx={{ ...style, width: { xs: "92%", sm: 480 } }}>
            <div className={cx("Forgot_main")}>
              <div className={cx("Login_header")}>
                <p>Quên Mật Khẩu</p>
                <FontAwesomeIcon
                    onClick={() => setForgotOpen(false)}
                    className={cx("Login_icon1", "Login_close")}
                    icon={faWindowClose}
                />
              </div>

              <div className={cx("Forgot_content")}>
                <p className={cx("Login_issfputs")}>
                  Nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.
                </p>

                <div className={cx("Login_field")}>
                  <label htmlFor="forgot-email">Email</label>
                  <input
                      id="forgot-email"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Nhập email của bạn"
                      className={cx("Login_input")}
                  />
                </div>

                <div className={cx("Forgot_actions")}>
                  <button
                      type="button"
                      className={cx("Forgot_cancel")}
                      onClick={() => setForgotOpen(false)}
                  >
                    Hủy
                  </button>
                  <Button
                      type="button"
                      className={cx("Login_submit", "Forgot_submit")}
                      variant="contained"
                      disableElevation
                      onClick={handleForgotPassword}
                  >
                    Gửi yêu cầu
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </>
  );
}

export default ReusableModal;
