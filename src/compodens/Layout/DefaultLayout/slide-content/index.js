import React, { useState, useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./slide-content-module.scss";
import B1 from "./b1.png";

const cx = classnames.bind(styles);

function Content() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: B1, caption: "Caption Text" },
    { src: B1, caption: "Caption Two" },
    { src: B1, caption: "Caption Three" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 1000000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const plusSlides = (n) => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + n + slides.length) % slides.length
    );
  };

  const setSlide = (n) => {
    setCurrentSlide(n);
  };

  return (
    <div className={cx("slide-content")}>
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cx("mySlides", "fade", {
              active: index === currentSlide,
            })}
            style={{ display: index === currentSlide ? "block" : "none" }}
          >
            <div className="numbertext">{`${index + 1} / ${
              slides.length
            }`}</div>
            <img
              src={slide.src}
              style={{ width: "100%" }}
              alt={`Slide ${index + 1}`}
            />
            <div className="text">{slide.caption}</div>
          </div>
        ))}
        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
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
