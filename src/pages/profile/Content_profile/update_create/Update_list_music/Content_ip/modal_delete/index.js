import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classnames from "classnames/bind";
import styles from "./modele-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
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
  // scss ở bên page> profile > contente_contett
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("Create_content_header")}>
          <p>Xác nhận xóa Playlist</p>
          <FontAwesomeIcon
            onClick={handleClose}
            className={cx("Create_content_sssssheader")}
            icon={faClose}
          />
        </div>
        <div className={cx("Creatddses_content_header")}>
          <p>Bạn có chắc là xóa Playlist này không ?</p>
          <div>
            <Button variant="contained">
              <p>Đồng ý</p>
            </Button>
            <Button variant="contained">
              <p>Bỏ qua</p>
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Create_content;
