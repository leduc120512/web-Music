import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import styles from "../profile-module.scss";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Img_avatar from "../avatar_default_2020.png";
import Sibar from "./Sibar";
import artistApi from "../../../api/artist";

const cx = classnames.bind(styles);

const formatNumber = (value) => Number(value || 0).toLocaleString("vi-VN");

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN");
};

function Profilee_content({ id }) {
  const [artist, setArtist] = useState(null);
  const [artistNews, setArtistNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  const baseProfilePath = useMemo(() => `/ProfileAuthor/${id}`, [id]);

  useEffect(() => {
    if (!id) {
      setArtist(null);
      setArtistNews([]);
      setLoading(false);
      setError("Thiếu mã nghệ sĩ");
      return;
    }

    let ignore = false;

    const fetchArtistData = async () => {
      setLoading(true);
      setError("");

      try {
        const [profileRes, newsRes] = await Promise.all([
          artistApi.getProfilePublic(id),
          artistApi.getNewsPublic(id, 0, 10),
        ]);

        if (ignore) return;

        setArtist(artistApi.unwrapData(profileRes) || null);
        setArtistNews(artistApi.unwrapPageContent(newsRes));
      } catch (err) {
        if (!ignore) {
          setArtist(null);
          setArtistNews([]);
          setError("Không thể tải thông tin nghệ sĩ");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchArtistData();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <div className={cx("artistStatus", "loading")}>Đang tải dữ liệu nghệ sĩ...</div>;
  }

  if (error) {
    return <div className={cx("artistStatus", "error")}>{error}</div>;
  }

  const displayName = artist?.stageName || artist?.username || "Đang cập nhật";
  const realName = artist?.fullName || "Đang cập nhật";
  const bio = artist?.bio || "Nghệ sĩ chưa cập nhật tiểu sử.";
  const avatar = artist?.avatar || artist?.avatarUrl || Img_avatar;
  const profileViews = artist?.profileViews ?? artist?.stats?.profileViews ?? 0;
  const playlistPlays = artist?.playlistPlayCount ?? artist?.stats?.playlistPlayCount ?? 0;

  return (
    <div className={cx("Profilee_content")}>
      <div className={cx("Profilee_main")}>
        <div className={cx("artistHero")}>
          <div className={cx("Profilesse_content")}>
            <img
              className={cx("Profilee_content_img")}
              src={avatar}
              alt={displayName}
              onError={(e) => {
                e.currentTarget.src = Img_avatar;
              }}
            />

            <div className={cx("Prossfileess_content_img", "artistText")}> 
              <p className={cx("Prossfilee_cossssntdddent_img")}>{displayName}</p>
              <p className={cx("artistSubline")}>ID nghệ sĩ: {id}</p>
              <p>Tên thật: {realName}</p>
              <p className={cx("artistBio")}>{bio}</p>
            </div>
          </div>

          <div className={cx("Prossfisdsslee_cossssntdddent_img", "artistStats")}> 
            <div className={cx("Prossfisdsslessssse_cossssntdddent_img", "statCard")}> 
              <p className={cx("Prossfisdsslessssdddse_cossssntdddent_img")}>
                <span>{formatNumber(profileViews)}</span>
              </p>
              <p>Lượt xem profile</p>
            </div>

            <div className={cx("Prossfisdsslessssse_cossssntdddent_img", "statCard")}> 
              <p>
                <span>{formatNumber(playlistPlays)}</span>
              </p>
              <p>Lượt nghe playlist</p>
            </div>
          </div>
        </div>

        <ul className={cx("Profilee_nAV", "artistNav")}> 
          <li className={cx("homeOnly")}> 
            <FontAwesomeIcon className={cx("Profilee_nAVsss")} icon={faHome} />
          </li>

          <li>
            <NavLink
              to={`${baseProfilePath}/Maiprofile`}
              className={({ isActive }) => cx("navItemLink", { navItemLinkActive: isActive })}
            >
              PlayList
            </NavLink>
          </li>

          <li>
            <button type="button" className={cx("navItemDisabled")} disabled>
              Video (sắp có)
            </button>
          </li>

          <li>
            <button type="button" className={cx("navItemDisabled")} disabled>
              Tải lên (sắp có)
            </button>
          </li>

          <li>
            <button type="button" className={cx("navItemDisabled")} disabled>
              Bạn bè (sắp có)
            </button>
          </li>
        </ul>

        {artistNews.length > 0 && (
          <div className={cx("artistNews")}> 
            <div className={cx("artistNewsHead")}>
              <p>Tin tuc nghe si</p>
              <span>{artistNews.length} bài viết</span>
            </div>

            <div className={cx("artistNewsList")}>
              {artistNews.slice(0, 3).map((news) => (
                <article key={news.id} className={cx("artistNewsCard")}>
                  <p className={cx("artistNewsTitle")}>{news.title || "Tin tức mới"}</p>
                  {news.content && <p className={cx("artistNewsExcerpt")}>{news.content}</p>}
                  <p className={cx("artistNewsDate")}>{formatDate(news.createdAt || news.updatedAt)}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        <Box className={cx("Profilee_container")} sx={{ flexGrow: 1 }}>
          <Grid className={cx("Profilee_container", "profileLayoutGrid")} container spacing={2}>
            <Grid className={cx("Profilee_Contetnt-", "profileMainPanel")} item xs={12} lg={8}>
              <div key={location.pathname} className={cx("profileOutletTransition")}>
                <Outlet />
              </div>
            </Grid>
            <Grid className={cx("Profileesss_sibar-", "profileSidePanel")} item xs={12} lg={4}>
              <Sibar />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Profilee_content;
