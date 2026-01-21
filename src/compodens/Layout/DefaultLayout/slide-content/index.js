import React, { useEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames/bind";
import styles from "./slide-content-module.scss";
import bannerApi from "../../../../api/banner";
import defaultImg from "../Content/ANH/SONTUNG.webp";

const cx = classnames.bind(styles);
const ASSET_BASE = "http://localhost:8082";

// Build URL ảnh + fallback
const buildCover = (coverImage) => {
    if (!coverImage) return defaultImg;
    if (/^https?:\/\//i.test(coverImage)) return coverImage;
    return `${ASSET_BASE}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
};

function Slider() {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const intervalRef = useRef(null);
    const isHoveringRef = useRef(false);

    // --- Debug checkpoints ---
    console.log("[Slider] file loaded"); // khi file được import

    // Fetch banners
    useEffect(() => {
        console.log("[Slider] useEffect(fetch) start");
        let isMounted = true;

        const fetchBanners = async () => {
            try {
               const res = await bannerApi.getAll();
                 const ok = res?.success;
               const list = Array.isArray(res?.data) ? res.data : [];
                if (!ok) {
                    throw new Error("API trả về success=false");
                }
                if (isMounted) {
                    setSlides(list);
                    setCurrent(0);
                }
                console.log("✅ Banner data loaded:", list);
            } catch (err) {
                console.error("❌ Lỗi khi load banner:", err);
                if (isMounted) setErrorMsg("Không tải được banner");
            } finally {
                if (isMounted) setLoading(false);
                console.log("[Slider] useEffect(fetch) done");
            }
        };

        fetchBanners();
        return () => {
            isMounted = false;
        };
    }, []);

    // Auto-play (chỉ chạy khi có >= 2 slide)
    useEffect(() => {
        if (slides.length < 2) return;

        const start = () => {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                if (!isHoveringRef.current) {
                    setCurrent((p) => (p + 1) % slides.length);
                }
            }, 5000);
        };

        start();
        return () => clearInterval(intervalRef.current);
    }, [slides.length]);

    const go = (delta) => {
        setCurrent((p) => {
            const len = slides.length || 1;
            return (p + delta + len) % len;
        });
    };

    const setSlide = (idx) => setCurrent(idx);

    const onMouseEnter = () => (isHoveringRef.current = true);
    const onMouseLeave = () => (isHoveringRef.current = false);

    const activeSlide = useMemo(() => slides[current] || null, [slides, current]);

    // --- UI states ---
    if (loading) {
        return (
            <div className={cx("slide-content")}>
                <div className={cx("slideshow-container")}>
                    <div className={cx("loading")}>Đang tải banner…</div>
                </div>
            </div>
        );
    }

    if (errorMsg || slides.length === 0) {
        return (
            <div className={cx("slide-content")}>
                <div className={cx("slideshow-container")}>
                    <div className={cx("fallback")}>
                        <img src={defaultImg} alt="Banner mặc định" style={{ width: "100%" }} />
                        <div className="text">{errorMsg || "Chưa có banner"}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cx("slide-content")}>
            <div
                className="slideshow-container"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id ?? index}
                        className={cx("mySlides", "fade", { active: index === current })}
                        style={{ display: index === current ? "block" : "none" }}
                    >

                        <img
                            src={buildCover(slide.image)}
                            style={{ width: "100%" }}
                            className={cx("img-slide-d-content")}

                            alt={slide?.note ? `${slide.note}` : `Slide ${index + 1}`}
                            onError={(e) => {
                                e.currentTarget.src = defaultImg;
                            }}
                        />
                        {slide?.note && <div className="text">{slide.note}</div>}
                    </div>
                ))}

                <button
                    type="button"
                    className="prev"
                    aria-label="Slide trước"
                    onClick={() => go(-1)}
                >
                    &#10094;
                </button>
                <button
                    type="button"
                    className="next"
                    aria-label="Slide tiếp"
                    onClick={() => go(1)}
                >
                    &#10095;
                </button>
            </div>

            <br />
            <div style={{ textAlign: "center" }}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`Chuyển đến slide ${index + 1}`}
                        className={cx("dot", { active: index === current })}
                        onClick={() => setSlide(index)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") setSlide(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;
