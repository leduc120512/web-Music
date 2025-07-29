import React, { useState, useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./slide-content-module.scss";
import bannerApi from "../../../../api/banner"; // đường dẫn chính xác đến file bạn tạo

const cx = classnames.bind(styles);

function Content() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // Gọi API banner khi component load
  useEffect(() => {
    bannerApi.getAll()
        .then((res) => {
          if (res.data.success && Array.isArray(res.data.data)) {
            setSlides(res.data.data);
            console.log("✅ Banner data:", res.data.data);
          }
        })
        .catch((err) => {
          console.error("❌ Lỗi khi load banner:", err);
        });
  }, []);

  // Tự động chuyển slide mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const plusSlides = (n) => {
    setCurrentSlide((prevSlide) => (prevSlide + n + slides.length) % slides.length);
  };

  const setSlide = (n) => {
    setCurrentSlide(n);
  };

  return (
      <div className={cx("slide-content")}>
        <div className="slideshow-container">
          {slides.map((slide, index) => (
              <div
                  key={slide.id}
                  className={cx("mySlides", "fade", {
                    active: index === currentSlide,
                  })}
                  style={{ display: index === currentSlide ? "block" : "none" }}
              >
                <div className="numbertext">{`${index + 1} / ${slides.length}`}</div>
                <img
                    src={slide.image}
                    style={{ width: "100%" }}
                    alt={`Slide ${index + 1}`}
                />
                <div className="text">{slide.note}</div>
              </div>
          ))}
          <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
          <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          {slides.map((_, index) => (
              <span
                  key={index}
                  className={cx("dot", { active: index === currentSlide })}
                  onClick={() => setSlide(index)}
              ></span>
          ))}
        </div>
      </div>
  );
}

export default Content;
