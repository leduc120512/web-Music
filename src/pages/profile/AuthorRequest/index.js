import React, { useState } from "react";
import classnames from "classnames/bind";
import Cookies from "js-cookie";
import moderationApi from "../../../api/moderation";
import styles from "./author-request-module.scss";

const cx = classnames.bind(styles);

const isValidHttpUrl = (value) => {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (error) {
    return false;
  }
};

function AuthorRequestPage() {
  const [form, setForm] = useState({ reason: "", portfolioUrl: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reason = form.reason.trim();
    const portfolioUrl = form.portfolioUrl.trim();

    if (!Cookies.get("token")) {
      setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setMessage("");
      return;
    }

    if (!reason) {
      setError("Vui lòng nhập lý do đăng ký.");
      setMessage("");
      return;
    }

    if (portfolioUrl && !isValidHttpUrl(portfolioUrl)) {
      setError("Portfolio URL không hợp lệ. Hãy dùng dạng http(s)://...");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await moderationApi.requestBecomeArtist({ reason, portfolioUrl });
      setForm({ reason: "", portfolioUrl: "" });
      setMessage("Đã gửi đăng ký tác giả, vui lòng chờ duyệt.");
    } catch (err) {
      const backendMessage = err?.response?.data?.message || err?.response?.data?.error;
      setError(backendMessage || "Gửi đăng ký thất bại. Vui lòng thử lại.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={cx("authorRequestPage")}> 
      <header className={cx("pageHeader")}> 
        <h2>Đăng ký trở thành tác giả</h2>
        <p>
          Hoàn tất thông tin để đội ngũ kiểm duyệt xác minh. Hồ sơ đầy đủ sẽ được duyệt nhanh hơn.
        </p>
      </header>

      <form className={cx("requestForm")} onSubmit={handleSubmit}>
        <label htmlFor="reason">Lý do đăng ký</label>
        <textarea
          id="reason"
          rows={5}
          value={form.reason}
          onChange={(event) => setForm((prev) => ({ ...prev, reason: event.target.value }))}
          placeholder="Tôi muốn đăng bài hát gốc và xây dựng kênh nghệ sĩ..."
        />

        <label htmlFor="portfolioUrl">Portfolio URL (không bắt buộc)</label>
        <input
          id="portfolioUrl"
          type="text"
          value={form.portfolioUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, portfolioUrl: event.target.value }))}
          placeholder="https://example.com/portfolio"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi đăng ký"}
        </button>

        {message && <p className={cx("successText")}>{message}</p>}
        {error && <p className={cx("errorText")}>{error}</p>}
      </form>
    </section>
  );
}

export default AuthorRequestPage;

