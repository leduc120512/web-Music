import React, { useCallback, useEffect, useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import moderationApi from "../../api/moderation";
import { adminActionButtonSx, adminCardSx, adminFilterBarSx, adminStatusChipSx } from "./adminUiTokens";

const STATUS_OPTIONS = ["PENDING", "RESOLVED", "REJECTED"];

const statusColorMap = {
  PENDING: "warning",
  RESOLVED: "success",
  REJECTED: "default",
};

const readRequests = (response) => {
  const data = moderationApi.unwrapData(response);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

const toDateDisplay = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("vi-VN");
};

function ArtistRequestsContent() {
  const [status, setStatus] = useState("PENDING");
  const [adminNote, setAdminNote] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actingId, setActingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const response = await moderationApi.getArtistRequests(status);
      const list = readRequests(response).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setRows(list);
    } catch (err) {
      // Keep a clear trace for network/API debugging in admin browser console.
      console.error("[ArtistRequests] loadRequests error", err?.response?.status, err?.response?.data || err);
      setRows([]);
      setError("Không tải được danh sách đăng ký tác giả.");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleReview = async (request, nextStatus) => {
    if (!request?.id) return;

    try {
      setActingId(request.id);
      setError("");
      setMessage("");

      const payload = {
        status: nextStatus,
      };
      const trimmed = adminNote.trim();
      if (trimmed) {
        payload.adminNote = trimmed;
      }

      await moderationApi.moderateArtistRequest(request.id, payload);
      setMessage(`Da cap nhat request #${request.id}.`);
      loadRequests();
    } catch (err) {
      console.error("[ArtistRequests] handleReview error", err?.response?.status, err?.response?.data || err);
      setError("Không thể duyệt yêu cầu tác giả. Vui lòng thử lại.");
    } finally {
      setActingId(null);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Duyet dang ky tac gia
      </Typography>
      <Typography color="text.secondary" mb={2}>
        Duyệt hoặc từ chối các yêu cầu nâng cấp quyền tác giả.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} sx={adminFilterBarSx}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="artist-request-status">Trạng thái</InputLabel>
          <Select
            labelId="artist-request-status"
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

        <Button variant="outlined" onClick={loadRequests} disabled={loading} sx={adminActionButtonSx}>
          {loading ? "Đang tải..." : "Tải lại"}
        </Button>
      </Stack>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Stack spacing={2}>
        {!loading && rows.length === 0 && (
          <Paper variant="outlined" sx={{ ...adminCardSx, p: 3 }}>
            <Typography color="text.secondary">Không có request trong bộ lọc hiện tại.</Typography>
          </Paper>
        )}

        {rows.map((request) => {
          const requestStatus = String(request.status || status || "PENDING").toUpperCase();
          const canReview = requestStatus === "PENDING";
          const isActing = actingId === request.id;

          return (
            <Paper key={request.id} variant="outlined" sx={adminCardSx}>
              <Box display="flex" justifyContent="space-between" gap={2} flexWrap="wrap">
                <Box>
                  <Typography fontWeight={700}>Request #{request.id}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    User: {request.username || request.requestedByUsername || "--"}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Lý do: {request.reason || "--"}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Portfolio: {request.portfolioUrl || "--"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    Tao luc: {toDateDisplay(request.createdAt)}
                  </Typography>
                </Box>

                <Stack alignItems={{ xs: "stretch", md: "flex-end" }} spacing={1}>
                  <Chip label={requestStatus} color={statusColorMap[requestStatus] || "default"} sx={adminStatusChipSx} />
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      disabled={!canReview || isActing}
                      onClick={() => handleReview(request, "RESOLVED")}
                      sx={adminActionButtonSx}
                    >
                      Duyệt
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={!canReview || isActing}
                      onClick={() => handleReview(request, "REJECTED")}
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

export default ArtistRequestsContent;

