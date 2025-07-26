import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classnames from "classnames/bind";
import styles from "../Login_logOut-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceFive, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

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

      const userData = response.data.data;

      const token = userData.accessToken;
      const user = userData.user;
      const role = user.role;

      // ✅ Lưu vào cookie
      Cookies.set("token", token, {
        expires: rememberMe ? 7 : undefined,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("user", JSON.stringify(user), {
        expires: rememberMe ? 7 : undefined,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("role", role);


      handleClose();

      // ✅ Điều hướng theo vai trò
      if (role === "ADMIN") {
        navigate("/Search_results");
      } else if (role === "AUTHOR") {
        navigate("/author/dashboard");
      } else {
        navigate("/profile");
      }

    } catch (error) {
      console.error("Đăng nhập thất bại:", error.response?.data || error.message);
      alert("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };


  return (
      <Modal open={open} onClose={handleClose}>
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
                  <tbody>
                  <tr className={cx("Login_tr")}>
                    <td className={cx("Login_td")}>Tên Đăng Nhập</td>
                    <td>
                      <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Nhập tên đăng nhập"
                          className={cx("Login_input")}
                          required
                      />
                    </td>
                  </tr>
                  <tr className={cx("Login_tr")}>
                    <td>Mật Khẩu</td>
                    <td>
                      <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Nhập mật khẩu"
                          className={cx("Login_input")}
                          required
                      />
                    </td>
                  </tr>
                  <tr className={cx("Login_tr")}>
                    <td></td>
                    <td>
                      <div className={cx("Login_list")}>
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            {...label}
                        />
                        <p>Nhớ mật khẩu</p>
                      </div>
                    </td>
                  </tr>
                  <tr className={cx("Login_tr")}>
                    <td></td>
                    <td>
                      <div className={cx("Login_list")}>
                        <Checkbox
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            {...label}
                        />
                        <p>
                          Tôi đồng ý với Chính sách bảo mật và Thỏa thuận sử dụng
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr className={cx("Login_tr")}>
                    <td></td>
                    <td colSpan={2} className={cx("Login_quen")}>
                      Quên mật khẩu
                    </td>
                  </tr>
                  <tr className={cx("Login_tr")}>
                    <td></td>
                    <td colSpan={2}>
                      <Button
                          onClick={handleLogin}
                          className={cx("Login_input dhj")}
                          variant="contained"
                          color="success"
                          disabled={loading}
                      >
                        {loading ? "Đang xử lý..." : "Đăng Nhập"}
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              {/* Các lựa chọn mạng xã hội có thể giữ nguyên */}
            </div>
          </div>
        </Box>
      </Modal>
  );
}

export default ReusableModal;
