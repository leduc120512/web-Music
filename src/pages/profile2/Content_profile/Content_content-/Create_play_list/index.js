import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classnames from "classnames/bind";
import styles from "../Content-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 140,
  bgcolor: "background.paper",
};

const cx = classnames.bind(styles);

function Create_content({ open, handleClose }) {
  //   btn;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("Create_content_header")}>
          <p>Tạo PlayList</p>
          <FontAwesomeIcon
            onClick={handleClose}
            className={cx("Create_content_sssssheader")}
            icon={faClose}
          />
        </div>
        <div className={cx("Create_content_content")}>
          <div>
            <input
              className={cx("Create_content_content_input")}
              type="text"
              placeholder="Nhập tên playlist mới cần tạo"
              onFocus={(e) => (e.target.style.border = "1px solid #2882bc")}
              onBlur={(e) => (e.target.style.border = "1px solid #c7c7c7")}
            />
            <button>
              <p>TẠO PLAYLIST</p>
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Create_content;
