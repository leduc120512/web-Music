import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

import popupAdsApi from "../../api/popupAds";
import styles from "./popup-ad-module.scss";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";
const SESSION_KEY = "popup-ad-shown-on-open";

const unwrapPopup = (response) => {
  const data = response?.data?.data ?? response?.data ?? null;
  if (Array.isArray(data)) return data[0] || null;
  if (Array.isArray(data?.content)) return data.content[0] || null;
  return data;
};

const buildAssetUrl = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `${ASSET_BASE}${src.startsWith("/") ? "" : "/"}${src}`;
};

const getImageSrc = (popup) =>
  popup?.imageUrl || popup?.image || popup?.imagePath || popup?.filePath || popup?.thumbnail || "";

function PopupAdModal() {
  const location = useLocation();
  const [popup, setPopup] = useState(null);
  const [open, setOpen] = useState(false);

  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute || sessionStorage.getItem(SESSION_KEY) === "1") return;

    let mounted = true;

    const fetchPopup = async () => {
      try {
        const response = await popupAdsApi.getActive();
        const activePopup = unwrapPopup(response);

        if (!mounted || !activePopup) {
          sessionStorage.setItem(SESSION_KEY, "1");
          return;
        }

        setPopup(activePopup);
        setOpen(true);
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch (error) {
        sessionStorage.setItem(SESSION_KEY, "1");
      }
    };

    fetchPopup();

    return () => {
      mounted = false;
    };
  }, [isAdminRoute]);

  const imageSrc = useMemo(() => buildAssetUrl(getImageSrc(popup)), [popup]);
  const targetUrl = popup?.targetUrl || popup?.url || popup?.link || "";

  const handleClose = () => setOpen(false);

  if (!open || !popup) return null;

  return (
    <div className={cx("popupAdOverlay")} role="presentation" onMouseDown={handleClose}>
      <section
        className={cx("popupAdDialog")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-ad-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className={cx("popupAdCloseBtn")} aria-label="Đóng popup quảng cáo" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {imageSrc && (
          <div className={cx("popupAdMedia")}>
            <img src={imageSrc} alt={popup.title || "Popup quảng cáo"} />
          </div>
        )}

        <div className={cx("popupAdBody")}>
          {popup.title && <h2 id="popup-ad-title">{popup.title}</h2>}
          {popup.content && <p>{popup.content}</p>}

          {targetUrl && (
            <a className={cx("popupAdActionBtn")} href={targetUrl} target="_blank" rel="noreferrer" onClick={handleClose}>
              Xem ngay
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export default PopupAdModal;
