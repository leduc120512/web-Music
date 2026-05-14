import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import classnames from "classnames/bind";
import userApi from "../../../api/api_user";
import styles from "./edit-account-module.scss";

const cx = classnames.bind(styles);

const UPDATE_PROFILE_URL = "http://localhost:8082/api/auth/me";
const VALID_GENDERS = ["MALE", "FEMALE", "OTHER"];

const readUserCookie = () => {
  const raw = Cookies.get("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const normalizeGender = (gender) => {
  if (!gender) return "";

  const value = String(gender).trim();
  if (VALID_GENDERS.includes(value)) return value;

  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized === "nam" || normalized === "male") return "MALE";
  if (normalized === "nu" || normalized === "female") return "FEMALE";
  if (normalized === "khac" || normalized === "other") return "OTHER";

  return "";
};

function EditAccountPage() {
  const [form, setForm] = useState({ fullName: "", email: "", gender: "" });
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = useMemo(() => Cookies.get("token") || "", []);
  const hasToken = Boolean(token);

  useEffect(() => {
    const bootstrap = async () => {
      const cookieUser = readUserCookie();
      if (cookieUser) {
        setUsername(cookieUser.username || "");
        setForm({
          fullName: cookieUser.fullName || "",
          email: cookieUser.email || "",
          gender: normalizeGender(cookieUser.gender),
        });
      }

      if (!hasToken) return;

      try {
        setLoading(true);
        const response = await userApi.getMe();
        const me = response?.data?.data || response?.data || null;
        if (!me) return;

        setUsername(me.username || cookieUser?.username || "");
        setForm({
          fullName: me.fullName || "",
          email: me.email || cookieUser?.email || "",
          gender: normalizeGender(me.gender),
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

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const gender = normalizeGender(form.gender);

    if (!fullName) {
      setError("Vui lòng nhập tên hiển thị.");
      setMessage("");
      return;
    }

    if (!email) {
      setError("Vui lòng nhập email.");
      setMessage("");
      return;
    }

    if (!gender) {
      setError("Vui lòng chọn giới tính.");
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

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("gender", gender);
      if (avatarFile) formData.append("avatar", avatarFile);

      const response = await fetch(UPDATE_PROFILE_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok) {
        throw new Error(result?.message || result?.error || "Cập nhật thất bại. Vui lòng thử lại.");
      }

      const updated = result?.data || result || {};
      const current = readUserCookie() || {};
      const merged = {
        ...current,
        ...updated,
        fullName: updated.fullName || fullName,
        email: updated.email || email,
        gender: normalizeGender(updated.gender) || gender,
        avatar: updated.avatar || updated.avatarUrl || current.avatar,
      };

      Cookies.set("user", JSON.stringify(merged));
      window.dispatchEvent(new Event("profile-updated"));
      setAvatarFile(null);
      setForm((prev) => ({ ...prev, fullName, email, gender }));
      setMessage("Đã cập nhật thông tin cá nhân.");
    } catch (err) {
      setError(err?.message || "Cập nhật thất bại. Vui lòng thử lại.");
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

          <div className={cx("row")}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={handleChange("email")} />
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
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>

          <div className={cx("row")}>
            <label htmlFor="avatar">Ảnh đại diện</label>
            <input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
            <span className={cx("inputHint")}>
              {avatarFile ? avatarFile.name : "Chọn ảnh mới nếu bạn muốn thay avatar."}
            </span>
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
