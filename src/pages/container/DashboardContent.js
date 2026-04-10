import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import songApi from "../../api/api_music";
import moderationApi from "../../api/moderation";
import likesApi from "../../api/likes";
import { adminCardSx, adminTableSx, adminUiTokens } from "./adminUiTokens";

const STATUS_LIST = ["PENDING", "RESOLVED", "REJECTED"];

const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const readList = (response) => {
  const data = response?.data?.data ?? response?.data ?? null;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

const normalizeSongStats = (song = {}) => ({
  id: song.id,
  title: song.title || song.songTitle || "--",
  likeCount: toNumber(song.likeCount ?? song.likesCount ?? song.totalLikes),
  reportCount: toNumber(song.reportCount ?? song.reportsCount ?? song.violationReportCount),
  commentCount: toNumber(song.commentCount ?? song.commentsCount ?? song.totalComments),
  playCount: toNumber(song.playCount),
});

const SummaryCard = ({ label, value }) => (
  <Paper
    variant="outlined"
    sx={{
      ...adminCardSx,
      transition: adminUiTokens.transition,
      "&:hover": {
        transform: "translateY(-1px)",
      },
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
      {toNumber(value).toLocaleString("vi-VN")}
    </Typography>
  </Paper>
);

const loadAllStatuses = async (fetchByStatus) => {
  const chunks = await Promise.all(STATUS_LIST.map((status) => fetchByStatus(status).then(readList).catch(() => [])));
  const map = new Map();
  chunks.flat().forEach((item, index) => {
    const key = item?.id ?? `${index}-${item?.createdAt || "x"}`;
    if (!map.has(key)) {
      map.set(key, item);
    }
  });
  return Array.from(map.values());
};

function DashboardContent() {
  const role = Cookies.get("role") || "";
  const isAuthor = role === "ROLE_AUTHOR";
  const isAdmin = role === "ROLE_ADMIN";

  const [songs, setSongs] = useState([]);
  const [likedSongsCount, setLikedSongsCount] = useState(0);
  const [globalStats, setGlobalStats] = useState({
    activeSongs: 0,
    songReportsAll: 0,
    commentReportsAll: 0,
    artistRequestsAll: 0,
    pendingSongReports: 0,
    pendingCommentReports: 0,
    pendingArtistRequests: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadAuthorDashboard = async () => {
      const [mySongs, likedRes] = await Promise.all([
        songApi.getMySongsWithStats(),
        likesApi.getMyLikedSongs(0, 1).catch(() => null),
      ]);

      const likedData = likedRes?.data?.data;
      const totalLiked = toNumber(
        likedData?.totalItems ?? likedData?.totalElements ?? likedData?.count ?? readList(likedRes).length
      );

      if (!cancelled) {
        setSongs(Array.isArray(mySongs) ? mySongs.map(normalizeSongStats) : []);
        setLikedSongsCount(totalLiked);
      }
    };

    const loadAdminDashboard = async () => {
      const [activeSongsRes, pendingSongReportsRes, pendingCommentReportsRes, pendingArtistRequestsRes] =
        await Promise.all([
          songApi.getActiveSongs(),
          moderationApi.getSongViolationReports("PENDING"),
          moderationApi.getCommentReports("PENDING"),
          moderationApi.getArtistRequests("PENDING"),
        ]);

      const [allSongReports, allCommentReports, allArtistRequests] = await Promise.all([
        loadAllStatuses((status) => moderationApi.getSongViolationReports(status)),
        loadAllStatuses((status) => moderationApi.getCommentReports(status)),
        loadAllStatuses((status) => moderationApi.getArtistRequests(status)),
      ]);

      if (!cancelled) {
        setGlobalStats({
          activeSongs: readList(activeSongsRes).length,
          songReportsAll: allSongReports.length,
          commentReportsAll: allCommentReports.length,
          artistRequestsAll: allArtistRequests.length,
          pendingSongReports: readList(pendingSongReportsRes).length,
          pendingCommentReports: readList(pendingCommentReportsRes).length,
          pendingArtistRequests: readList(pendingArtistRequestsRes).length,
        });
      }
    };

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        if (isAuthor) {
          await loadAuthorDashboard();
        } else if (isAdmin) {
          await loadAdminDashboard();
        }
      } catch (err) {
        if (!cancelled) {
          setError("Không tải được dữ liệu dashboard.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, isAuthor]);

  const authorTotals = useMemo(
    () =>
      songs.reduce(
        (acc, song) => ({
          songCount: acc.songCount + 1,
          likeCount: acc.likeCount + toNumber(song.likeCount),
          reportCount: acc.reportCount + toNumber(song.reportCount),
          commentCount: acc.commentCount + toNumber(song.commentCount),
          playCount: acc.playCount + toNumber(song.playCount),
        }),
        { songCount: 0, likeCount: 0, reportCount: 0, commentCount: 0, playCount: 0 }
      ),
    [songs]
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Dashboard
      </Typography>
      <Typography color="text.secondary" mb={2}>
        {isAuthor
          ? "Tác giả chỉ thấy dữ liệu của bản thân: tác phẩm, lượt thích, báo cáo và bình luận."
          : "Thống kê tổng quan toàn bộ hệ thống."}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading && (
        <Box py={4} display="flex" alignItems="center" justifyContent="center" gap={1}>
          <CircularProgress size={22} />
          <Typography>Đang tải dữ liệu...</Typography>
        </Box>
      )}

      {!loading && isAuthor && (
        <>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Số tác phẩm của tôi" value={authorTotals.songCount} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng lượt thích nhận được" value={authorTotals.likeCount} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng báo cáo liên quan" value={authorTotals.reportCount} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng bình luận" value={authorTotals.commentCount} />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Bài hát đã like" value={likedSongsCount} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng lượt nghe" value={authorTotals.playCount} />
            </Grid>
          </Grid>

          <Paper variant="outlined" sx={adminCardSx}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight={700}>
                Danh sách tác phẩm của tôi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng: {authorTotals.songCount}
              </Typography>
            </Stack>

            <TableContainer sx={{ overflowX: "auto" }}>
              <Table size="small" sx={{ ...adminTableSx, minWidth: 760 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell align="right">Like</TableCell>
                    <TableCell align="right">Report</TableCell>
                    <TableCell align="right">Comment</TableCell>
                    <TableCell align="right">Play</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {songs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 3, color: "text.secondary" }}>
                        Chưa có dữ liệu tác phẩm.
                      </TableCell>
                    </TableRow>
                  ) : (
                    songs.map((song) => (
                      <TableRow key={song.id || song.title} hover>
                        <TableCell>{song.id ?? "--"}</TableCell>
                        <TableCell>{song.title}</TableCell>
                        <TableCell align="right">{song.likeCount.toLocaleString("vi-VN")}</TableCell>
                        <TableCell align="right">{song.reportCount.toLocaleString("vi-VN")}</TableCell>
                        <TableCell align="right">{song.commentCount.toLocaleString("vi-VN")}</TableCell>
                        <TableCell align="right">{song.playCount.toLocaleString("vi-VN")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}

      {!loading && !isAuthor && (
        <>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng bài hát active" value={globalStats.activeSongs} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng song reports" value={globalStats.songReportsAll} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng comment reports" value={globalStats.commentReportsAll} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard label="Tổng artist requests" value={globalStats.artistRequestsAll} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard label="Song reports chờ duyệt" value={globalStats.pendingSongReports} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard label="Comment reports chờ duyệt" value={globalStats.pendingCommentReports} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard label="Artist requests chờ duyệt" value={globalStats.pendingArtistRequests} />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default DashboardContent;

