import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import moderationApi from "../../api/moderation";
import { adminActionButtonSx, adminCardSx, adminFilterBarSx, adminStatusChipSx } from "./adminUiTokens";

const STATUS_OPTIONS = ["PENDING", "RESOLVED", "REJECTED"];
const SOURCE_OPTIONS = [
  { value: "ALL", label: "Tat ca" },
  { value: "SONG", label: "Bai hat" },
  { value: "COMMENT", label: "Binh luan" },
];
const SONG_REPORT_STATUS = "PENDING";
const SONG_REPORT_TABS = [
  { value: "PRIORITY", label: "Can chu y" },
  { value: "NORMAL", label: "Bao cao khac" },
];

const statusColorMap = {
  PENDING: "warning",
  RESOLVED: "success",
  REJECTED: "default",
};

const readReportList = (response) => {
  const data = moderationApi.unwrapData(response);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

const toDisplayDate = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("vi-VN");
};

const normalizeSongReport = (item = {}) => ({
  id: item.id,
  source: "SONG",
  status: String(item.status || "PENDING").toUpperCase(),
  reason: item.type || item.reason || "OTHER",
  detail: item.description || item.detail || "--",
  target: item.songTitle || item.songName || `Song #${item.songId || "--"}`,
  reporter: item.reporterUsername || item.createdByUsername || "--",
  reporterRole: item.reporterRole || "--",
  songReportCount: Number(item.songReportCount || 0),
  authorReportCount: Number(item.authorReportCount || 0),
  priorityVisible: Boolean(item.priorityVisible),
  createdAt: item.createdAt || item.reportedAt || "",
  original: item,
});

const normalizeCommentReport = (item = {}) => ({
  id: item.id,
  source: "COMMENT",
  status: String(item.status || "PENDING").toUpperCase(),
  reason: item.reason || "OTHER",
  detail: item.detail || item.content || "--",
  target: item.commentContent || `Comment #${item.commentId || "--"}`,
  reporter: item.reporterUsername || item.createdByUsername || "--",
  createdAt: item.createdAt || item.reportedAt || "",
  original: item,
});

function ReportsContent() {
  const [source, setSource] = useState("ALL");
  const [status, setStatus] = useState("PENDING");
  const [songReportTab, setSongReportTab] = useState("PRIORITY");
  const [songSummary, setSongSummary] = useState({ priorityCount: 0, normalCount: 0 });
  const [adminNote, setAdminNote] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actingId, setActingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const requests = [];
      if (source === "ALL" || source === "SONG") {
        const isPriorityTab = songReportTab === "PRIORITY";
        requests.push(
          moderationApi.getSongViolationReports(SONG_REPORT_STATUS, songReportTab).then((res) =>
            readReportList(res)
              .map(normalizeSongReport)
              .filter((report) => {
                if (!isPriorityTab) return true;
                return report.priorityVisible && report.songReportCount > 15 && report.authorReportCount > 0;
              })
          )
        );
      }
      if (source === "ALL" || source === "COMMENT") {
        requests.push(moderationApi.getCommentReports(status).then((res) => readReportList(res).map(normalizeCommentReport)));
      }

      const chunks = await Promise.all(requests);
      const merged = chunks.flat().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setRows(merged);
    } catch (err) {
      console.error("[Reports] loadReports error", err?.response?.status, err?.response?.data || err);
      setRows([]);
      setError("Không tải được danh sách báo cáo moderation.");
    } finally {
      setLoading(false);
    }
  }, [source, status, songReportTab]);

  const loadSongSummary = useCallback(async () => {
    if (source === "COMMENT") {
      setSongSummary({ priorityCount: 0, normalCount: 0 });
      return;
    }

    try {
      const res = await moderationApi.getSongViolationReportSummary(SONG_REPORT_STATUS);
      const data = moderationApi.unwrapData(res) || {};
      setSongSummary({
        priorityCount: Number(data.priorityCount || 0),
        normalCount: Number(data.normalCount || 0),
      });
    } catch (err) {
      console.error("[Reports] loadSongSummary error", err?.response?.status, err?.response?.data || err);
      setSongSummary({ priorityCount: 0, normalCount: 0 });
    }
  }, [source]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  useEffect(() => {
    loadSongSummary();
  }, [loadSongSummary]);

  const counters = useMemo(
    () => ({
      total: rows.length,
      song: rows.filter((item) => item.source === "SONG").length,
      comment: rows.filter((item) => item.source === "COMMENT").length,
    }),
    [rows]
  );

  const handleReview = async (report, nextStatus, hideTarget) => {
    if (!report?.id) return;

    try {
      setActingId(report.id);
      setError("");
      setMessage("");

      const payload = {
        status: nextStatus,
      };

      const trimmedNote = adminNote.trim();
      if (trimmedNote) {
        payload.adminNote = trimmedNote;
      }

      if (report.source === "SONG") {
        payload.hideSong = Boolean(hideTarget);
        await moderationApi.moderateSongViolationReport(report.id, payload);
      } else {
        payload.hideComment = Boolean(hideTarget);
        await moderationApi.moderateCommentReport(report.id, payload);
      }

      setMessage(`Đã cập nhật báo cáo #${report.id}.`);
      loadReports();
    } catch (err) {
      console.error("[Reports] handleReview error", err?.response?.status, err?.response?.data || err);
      setError("Cập nhật moderation thất bại. Vui lòng thử lại.");
    } finally {
      setActingId(null);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Quan ly bao cao
      </Typography>
      <Typography color="text.secondary" mb={2}>
        Kết hợp báo cáo bài hát và bình luận. Lọc theo trạng thái và duyệt trực tiếp.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} sx={adminFilterBarSx}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="source-filter">Nguồn</InputLabel>
          <Select
            labelId="source-filter"
            variant="outlined"
            label="Nguồn"
            value={source}
            onChange={(event) => setSource(event.target.value)}
          >
            {SOURCE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="status-filter">Trạng thái</InputLabel>
          <Select
            labelId="status-filter"
            variant="outlined"
            label="Trạng thái"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {STATUS_OPTIONS.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Ghi chú admin mặc định"
          value={adminNote}
          onChange={(event) => setAdminNote(event.target.value)}
          sx={{ minWidth: 260 }}
        />

        <Button variant="outlined" onClick={loadReports} disabled={loading} sx={adminActionButtonSx}>
          {loading ? "Đang tải..." : "Tải lại"}
        </Button>
      </Stack>

      {(source === "ALL" || source === "SONG") && (
        <Paper variant="outlined" sx={{ ...adminCardSx, p: 1, mb: 2 }}>
          <Tabs
            value={songReportTab}
            onChange={(_, value) => setSongReportTab(value)}
            variant="scrollable"
            allowScrollButtonsMobile
          >
            {SONG_REPORT_TABS.map((tab) => {
              const count = tab.value === "PRIORITY" ? songSummary.priorityCount : songSummary.normalCount;
              return (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{tab.label}</span>
                      <Chip size="small" label={count} color={tab.value === "PRIORITY" ? "warning" : "default"} />
                    </Stack>
                  }
                />
              );
            })}
          </Tabs>
        </Paper>
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={1} mb={2}>
        <Chip label={`Tổng: ${counters.total}`} sx={adminStatusChipSx} />
        <Chip label={`Song report: ${counters.song}`} color="info" sx={adminStatusChipSx} />
        <Chip label={`Comment report: ${counters.comment}`} color="secondary" sx={adminStatusChipSx} />
      </Stack>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Stack spacing={2}>
        {!loading && rows.length === 0 && (
          <Paper variant="outlined" sx={{ ...adminCardSx, p: 3 }}>
            <Typography color="text.secondary">Không có báo cáo phù hợp bộ lọc hiện tại.</Typography>
          </Paper>
        )}

        {rows.map((item) => {
          const isActing = actingId === item.id;
          const canReview = item.status === "PENDING";

          return (
            <Paper key={`${item.source}-${item.id}`} variant="outlined" sx={adminCardSx}>
              <Box display="flex" justifyContent="space-between" gap={2} flexWrap="wrap" alignItems="flex-start">
                <Box>
                  <Typography fontWeight={700}>
                    #{item.id} - {item.source}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Đối tượng: {item.target}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Lý do: <strong>{item.reason}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Chi tiết: {item.detail}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    Reporter: {item.reporter} - {toDisplayDate(item.createdAt)}
                  </Typography>
                  {item.source === "SONG" && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                      <Chip size="small" label={`Song reports: ${item.songReportCount}`} sx={adminStatusChipSx} />
                      <Chip size="small" label={`Author reports: ${item.authorReportCount}`} sx={adminStatusChipSx} />
                      <Chip size="small" label={`Reporter role: ${item.reporterRole}`} sx={adminStatusChipSx} />
                    </Stack>
                  )}
                </Box>

                <Stack alignItems={{ xs: "stretch", md: "flex-end" }} spacing={1}>
                  <Chip
                    label={item.status}
                    color={statusColorMap[item.status] || "default"}
                    sx={{ ...adminStatusChipSx, textTransform: "capitalize" }}
                  />

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      disabled={!canReview || isActing}
                      onClick={() => handleReview(item, "RESOLVED", false)}
                      sx={adminActionButtonSx}
                    >
                      Duyệt
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      disabled={!canReview || isActing}
                      onClick={() => handleReview(item, "RESOLVED", true)}
                      sx={adminActionButtonSx}
                    >
                      Duyet + Hide
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      disabled={!canReview || isActing}
                      onClick={() => handleReview(item, "REJECTED", false)}
                      sx={adminActionButtonSx}
                    >
                      Từ chối
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}

export default ReportsContent;

