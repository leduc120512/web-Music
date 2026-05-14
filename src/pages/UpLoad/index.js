import React from "react";
import styles from "./Uploat-module.scss";
import classnames from "classnames/bind";
import ImgUpload from "./web nhac.png";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faFileAudio, faImage, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

const uploadNotes = [
  "Tài khoản cần đăng nhập và đã được kích hoạt.",
  "File upload tối đa 120MB, bitrate từ 128kbps trở lên.",
  "Hỗ trợ: .mp3, .wma, .mp2, .asf, .wav, .wmv, .mp4, .flv, .mpg, .avi, .3gp, .flac.",
  "Thời gian kiểm duyệt: 72 giờ với user thường, 12 giờ với user VIP.",
];

const policyNotes = [
  "Nội dung vi phạm thỏa thuận sử dụng có thể bị xóa khỏi hệ thống.",
  "Ảnh bìa bài hát nên có kích thước tối thiểu 640x640px.",
  "Ảnh bìa video nên có kích thước tối thiểu 840x472px.",
  "Hình ảnh hoặc nội dung không phù hợp sẽ bị từ chối.",
];

const UpLoad = () => {
  return (
    <main className={cx("UpLoad")}>
      <div className={cx("UpLoad_content")}>
        <section className={cx("uploadHero")}>
          <div className={cx("uploadArtwork")}>
            <img className={cx("UpLoad_img")} src={ImgUpload} alt="Upload music" />
          </div>

          <div className={cx("uploadDropzone")}>
            <FontAwesomeIcon className={cx("uploadIcon")} icon={faCloudArrowUp} />
            <h1>Chọn hoặc kéo thả file để tải lên</h1>
            <p>Hỗ trợ file nhạc, video và embed link YouTube.</p>
            <Button className={cx("UpLoad_btn")} variant="contained">
              Chọn file
            </Button>
          </div>
        </section>

        <section className={cx("UpLoad_regulations")}>
          <article className={cx("UpLoad_regulations1")}>
            <FontAwesomeIcon icon={faFileAudio} />
            <h4>Yêu cầu file</h4>
            {uploadNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </article>

          <article className={cx("UpLoad_regulations1")}>
            <FontAwesomeIcon icon={faImage} />
            <h4>Ảnh bìa và kiểm duyệt</h4>
            {policyNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </article>

          <article className={cx("UpLoad_regulations1")}>
            <FontAwesomeIcon icon={faShieldHalved} />
            <h4>Lưu ý</h4>
            <p>Chỉ tải lên nội dung bạn sở hữu hoặc có quyền sử dụng.</p>
            <p>Thông tin chính xác giúp quá trình duyệt nhanh hơn.</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default UpLoad;
