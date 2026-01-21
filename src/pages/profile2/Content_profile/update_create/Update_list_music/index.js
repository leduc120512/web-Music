import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import classnames from "classnames/bind";
import styles from "./Update_list_music-module.scss";

import Header from "../../../../../compodens/Layout/DefaultLayout/header";
import Profile_option from "../../../Profile_option";
import ContentIp from "./Content_ip";

const cx = classnames.bind(styles);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Update_list_music() {
  return (
    <div className={cx("Appa")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("Update_list_music")}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid className={cx("Update_list_music")} container spacing={2}>
            <Grid item md={2} xs={6}>
              <Profile_option />
            </Grid>
            <Grid item md={7} xs={6}>
              <ContentIp />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Update_list_music;
