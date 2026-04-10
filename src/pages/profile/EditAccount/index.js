import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import classnames from "classnames/bind";
import userApi from "../../../api/api_user";
import styles from "./edit-account-module.scss";

const cx = classnames.bind(styles);

const readUserCookie = () => {
  const raw = Cookies.get("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

function EditAccountPage() {
  const [form, setForm] = useState({ fullName: "", gender: "", birthday: "" });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const hasToken = useMemo(() => Boolean(Cookies.get("token")), []);

  useEffect(() => {
    const bootstrap = async () => {
      const cookieUser = readUserCookie();
      if (cookieUser) {
        setUsername(cookieUser.username || "");
        setEmail(cookieUser.email || "");
        setForm({
          fullName: cookieUser.fullName || "",
          gender: cookieUser.gender || "",
          birthday: cookieUser.birthday || cookieUser.birthDate || "",
        });
      }

      if (!hasToken) return;

      try {
        setLoading(true);
        const response = await userApi.getMe();
        const me = response?.data?.data || response?.data || null;
        if (!me) return;

        setUsername(me.username || cookieUser?.username || "");
        setEmail(me.email || cookieUser?.email || "");
        setForm({
          fullName: me.fullName || "",
          gender: me.gender || "",
          birthday: me.birthday || me.birthDate || "",
        });
      } catch (err) {
        setError("Không thể tải dữ liệu tài khoản. Bạn vẫn có thể sửa thông tin cơ bản.");
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [hasToken]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.fullName.trim()) {
      setError("Vui lòng nhập tên hiển thị.");
      setMessage("");
      return;
    }

    if (!hasToken) {
      setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setMessage("");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        fullName: form.fullName.trim(),
        gender: form.gender,
      };

      if (form.birthday) {
        payload.birthday = form.birthday;
      }

      const response = await userApi.updateMe(payload);
      const updated = response?.data?.data || payload;
      const current = readUserCookie() || {};
      const merged = {
        ...current,
        ...updated,
        fullName: updated.fullName || payload.fullName,
        gender: updated.gender || payload.gender,
        birthday: updated.birthday || payload.birthday || current.birthday,
      };

      Cookies.set("user", JSON.stringify(merged));
      window.dispatchEvent(new Event("profile-updated"));
      setMessage("Đã cập nhật thông tin cá nhân.");
    } catch (err) {
      const backendMessage = err?.response?.data?.message || err?.response?.data?.error;
      setError(backendMessage || "Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={cx("editAccount")}>
      <header className={cx("heading")}>
        <h2>Chỉnh sửa thông tin cá nhân</h2>
        <p>Cập nhật hồ sơ để hiển thị đẹp hơn trên trang cá nhân của bạn.</p>
      </header>

      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("metaGrid")}>
          <div className={cx("row", "rowReadonly")}>
            <label htmlFor="username">Tên đăng nhập</label>
            <input id="username" type="text" value={username} disabled />
          </div>

          <div className={cx("row", "rowReadonly")}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={email} disabled />
          </div>
        </div>

        <div className={cx("row")}>
          <label htmlFor="fullName">Tên hiển thị</label>
          <input id="fullName" type="text" value={form.fullName} onChange={handleChange("fullName")} />
          <span className={cx("inputHint")}>Tên này sẽ được hiển thị ở trang cá nhân và bình luận.</span>
        </div>

        <div className={cx("split")}>
          <div className={cx("row")}>
            <label htmlFor="gender">Giới tính</label>
            <select id="gender" value={form.gender} onChange={handleChange("gender")}>
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nu">Nữ</option>
              <option value="Khac">Khác</option>
            </select>
          </div>

          <div className={cx("row")}>
            <label htmlFor="birthday">Sinh nhật</label>
            <input id="birthday" type="date" value={form.birthday || ""} onChange={handleChange("birthday")} />
          </div>
        </div>

        <div className={cx("actionBar")}>
          <button type="submit" className={cx("primaryBtn")} disabled={saving || loading}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          {loading && <span className={cx("loadingText")}>Đang đồng bộ dữ liệu...</span>}
        </div>

        {message && <p className={cx("success", "statusText")}>{message}</p>}
        {error && <p className={cx("error", "statusText")}>{error}</p>}
      </form>
    </section>
  );
}

export default EditAccountPage;

