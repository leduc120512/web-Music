import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CrudForm from "../../crud/index";
import {
  adminActionButtonSx,
  adminTableContainerSx,
  adminTableSx,
  stickyCellSx,
  stickyHeadCellSx,
} from "./adminUiTokens";

const ASSET_BASE = "http://localhost:8082";

const buildAssetUrl = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `${ASSET_BASE}${src.startsWith("/") ? "" : "/"}${src}`;
};

const Img = ({ src, alt, size = 46 }) =>
  src ? (
    <img
      src={buildAssetUrl(src)}
      alt={alt || "Ảnh"}
      style={{
        width: size,
        height: size,
        objectFit: "cover",
        borderRadius: 8,
        border: "1px solid rgba(148, 163, 184, 0.25)",
        display: "block",
      }}
    />
  ) : (
    "N/A"
  );

const Audio = ({ src }) =>
  src ? (
    <audio controls style={{ width: 210, display: "block" }}>
      <source src={buildAssetUrl(src)} type="audio/mpeg" />
      Trình duyệt không hỗ trợ audio.
    </audio>
  ) : (
    "N/A"
  );

const EmptyRow = ({ colSpan, label = "Không có dữ liệu" }) => (
  <TableRow>
    <TableCell colSpan={colSpan} sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
      {label}
    </TableCell>
  </TableRow>
);

const LoadingState = () => (
  <Box display="flex" alignItems="center" gap={1} py={3} justifyContent="center">
    <CircularProgress size={20} />
    <Typography variant="body2">Đang tải dữ liệu...</Typography>
  </Box>
);

const getEntityLabel = (type) => {
  if (type === "albums") return "Album";
  if (type === "users") return "Người dùng";
  if (type === "banner") return "Banner";
  if (type === "popupAds") return "Popup quảng cáo";
  return "Bài hát";
};

const getStickySx = (col, head = false) => {
  if (col.sticky === "id") return head ? stickyHeadCellSx("left", 0, 8) : stickyCellSx("left", 0, 5);
  if (col.sticky === "main") return head ? stickyHeadCellSx("left", 72, 8) : stickyCellSx("left", 72, 5);
  if (col.sticky === "actions") return head ? stickyHeadCellSx("right", 0, 9) : stickyCellSx("right", 0, 6);
  return undefined;
};

function EntityTable({ Api, type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRefresh = useCallback(() => setRefreshKey((prev) => prev + 1), []);

  const openCreateModal = useCallback(() => {
    setCurrentAction("create");
    setSelectedItem(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((item) => {
    setCurrentAction("edit");
    setSelectedItem(item);
    setModalOpen(true);
  }, []);

  const handleModalSuccess = useCallback(() => {
    setModalOpen(false);
    handleRefresh();
  }, [handleRefresh]);

  const apiMap = useMemo(
    () => ({
      song: {
        fetch: () => Api.getLatestSongs().then((res) => res?.data?.data?.content || []),
        create: Api.create,
        update: Api.update,
        delete: Api.delete,
      },
      albums: {
        fetch: () => Api.fetchLatestAlbums().then((res) => res?.data?.content || []),
        create: Api.createAlbum,
        update: Api.update,
        delete: Api.deleteAlbum,
      },
      banner: {
        fetch: () => Api.getAll().then((res) => res?.data?.data || []),
        create: Api.create,
        update: Api.update,
        delete: Api.remove,
      },
      popupAds: {
        fetch: () =>
          Api.getAll().then((res) => {
            const data = res?.data?.data ?? res?.data ?? [];
            if (Array.isArray(data)) return data;
            if (Array.isArray(data?.content)) return data.content;
            return data ? [data] : [];
          }),
        create: Api.create,
        update: Api.update,
        delete: Api.remove,
      },
      users: {
        fetch: () => Api.getAllUsers().then((res) => res?.data?.data || []),
        create: Api.signup,
        update: Api.updateUserById,
        delete: Api.deleteUserById,
      },
    }),
    [Api]
  );

  const currentApi = apiMap[type] || null;

  const deleteRow = useCallback(async (row) => {
    if (!currentApi?.delete || !row?.id) return;
    if (!window.confirm("Xác nhận xóa?")) return;

    try {
      await currentApi.delete(row.id);
      handleRefresh();
    } catch (err) {
      alert(`Xóa thất bại: ${err?.response?.data?.message || err.message || "Lỗi"}`);
    }
  }, [currentApi, handleRefresh]);

  const actionColumn = useMemo(
    () => ({
      key: "__actions",
      label: "Thao tác",
      sticky: "actions",
      width: 116,
      render: (row) => (
        <Box display="flex" gap={0.75} justifyContent="flex-end">
          <Tooltip title="Sửa">
            <IconButton color="primary" size="small" onClick={() => openEditModal(row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton color="error" size="small" onClick={() => deleteRow(row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    }),
    [deleteRow, openEditModal]
  );

  const columnsConfig = useMemo(
    () => ({
      song: [
        { key: "id", label: "ID", sticky: "id", width: 72 },
        { key: "title", label: "Tiêu đề", sticky: "main", minWidth: 220 },
        { key: "description", label: "Mô tả", minWidth: 260 },
        { key: "coverImage", label: "Ảnh bìa", render: (row) => <Img src={row.coverImage} alt={row.title} /> },
        { key: "filePath", label: "Audio", minWidth: 230, render: (row) => <Audio src={row.filePath} /> },
        { key: "duration", label: "Thời lượng" },
        { key: "playCount", label: "Lượt phát" },
        { key: "genreName", label: "Thể loại" },
        { key: "albumTitle", label: "Album" },
        { key: "artistName", label: "Nghệ sĩ" },
        actionColumn,
      ],
      albums: [
        { key: "id", label: "ID", sticky: "id", width: 72 },
        { key: "title", label: "Tiêu đề", sticky: "main", minWidth: 220 },
        { key: "description", label: "Mô tả", minWidth: 280 },
        { key: "coverImage", label: "Ảnh bìa", render: (row) => <Img src={row.coverImage} alt={row.title} /> },
        { key: "releaseDate", label: "Ngày phát hành" },
        { key: "artistName", label: "Nghệ sĩ" },
        { key: "songCount", label: "Số bài hát" },
        actionColumn,
      ],
      banner: [
        { key: "id", label: "ID", sticky: "id", width: 72 },
        { key: "note", label: "Ghi chú", sticky: "main", minWidth: 260 },
        { key: "image", label: "Ảnh", render: (row) => <Img src={row.image} alt={row.note} size={64} /> },
        actionColumn,
      ],
      popupAds: [
        { key: "id", label: "ID", sticky: "id", width: 72 },
        { key: "title", label: "Tiêu đề", sticky: "main", minWidth: 220 },
        { key: "content", label: "Nội dung", minWidth: 260 },
        { key: "targetUrl", label: "Link", minWidth: 240 },
        { key: "active", label: "Hiển thị", render: (row) => (row.active ? "Bật" : "Tắt") },
        { key: "startAt", label: "Bắt đầu", minWidth: 160 },
        { key: "endAt", label: "Kết thúc", minWidth: 160 },
        {
          key: "image",
          label: "Ảnh",
          render: (row) => (
            <Img src={row.image || row.imageUrl || row.imagePath || row.filePath} alt={row.title} size={64} />
          ),
        },
        actionColumn,
      ],
      users: [
        { key: "id", label: "ID", sticky: "id", width: 72 },
        { key: "username", label: "Tên đăng nhập", sticky: "main", minWidth: 190 },
        { key: "fullName", label: "Họ tên", minWidth: 190 },
        { key: "email", label: "Email", minWidth: 240 },
        { key: "avatar", label: "Ảnh đại diện", render: (row) => <Img src={row.avatar} alt={row.username} size={42} /> },
        { key: "role", label: "Vai trò" },
        { key: "active", label: "Trạng thái", render: (row) => (row.active ? "Kích hoạt" : "Khóa") },
        actionColumn,
      ],
    }),
    [actionColumn]
  );

  const columns = columnsConfig[type] || [];

  useEffect(() => {
    if (!currentApi) {
      setError(`Loại dữ liệu không hỗ trợ: ${type}`);
      setLoading(false);
      return undefined;
    }

    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const list = await currentApi.fetch();
        if (mounted) setData(Array.isArray(list) ? list : []);
      } catch (err) {
        if (mounted) setError(err?.response?.data?.message || err.message || "Lỗi tải dữ liệu");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [type, refreshKey, currentApi]);

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, minWidth: 0 }}>
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" gap={1} flexWrap="wrap">
        <Typography variant="h6" fontWeight={800}>
          Quản lý {getEntityLabel(type)}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateModal}
          disabled={loading || !currentApi?.create}
          sx={adminActionButtonSx}
        >
          Thêm mới
        </Button>
      </Box>

      {loading && <LoadingState />}
      {error && !loading && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <TableContainer component={Paper} elevation={0} sx={adminTableContainerSx}>
          <Table size="small" stickyHeader sx={adminTableSx}>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      ...getStickySx(col, true),
                      width: col.width,
                      minWidth: col.minWidth,
                      maxWidth: col.maxWidth,
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <EmptyRow colSpan={columns.length} />
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        sx={{
                          ...getStickySx(col, false),
                          width: col.width,
                          minWidth: col.minWidth,
                          maxWidth: col.maxWidth,
                        }}
                      >
                        {col.render ? col.render(row) : row[col.key] ?? "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {currentApi && (
        <CrudForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          edit={currentAction === "edit" ? 1 : 0}
          api={{
            create: currentApi.create,
            update: currentApi.update,
          }}
          type={type === "albums" ? "album" : type}
          initialData={selectedItem || {}}
          onSuccess={handleModalSuccess}
        />
      )}
    </Box>
  );
}

export default EntityTable;
