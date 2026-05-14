import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

import { fetchLatestAlbums } from "../api/albums";
import { fetchAllGenres } from "../api/genner";

let cachedAlbums = [];
let cachedGenres = [];

export const FORM_FIELDS = {
  song: [
    { name: "title", label: "Tiêu đề", type: "text", required: true },
    { name: "description", label: "Mô tả", type: "text" },
    { name: "coverImage", label: "Ảnh bìa", type: "file", accept: "image/*" },
    { name: "audioFile", label: "File âm thanh", type: "file", accept: "audio/*" },
    { name: "duration", label: "Thời lượng (giây)", type: "number" },
    { name: "playCount", label: "Lượt phát", type: "number" },
    { name: "lyrics", label: "Lời bài hát", type: "textarea", multiline: true },
    { name: "genre.id", label: "Thể loại", type: "select", optionsKey: "genres" },
    { name: "album.id", label: "Album", type: "select", optionsKey: "albums" },
  ],
  users: [
    { name: "username", label: "Tên đăng nhập", type: "text", required: true },
    { name: "fullName", label: "Họ tên", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "avatar", label: "Ảnh đại diện", type: "file", accept: "image/*" },
    { name: "active", label: "Kích hoạt", type: "checkbox" },
  ],
  album: [
    { name: "title", label: "Tiêu đề album", type: "text", required: true },
    { name: "description", label: "Mô tả", type: "text" },
    { name: "coverImage", label: "Ảnh bìa", type: "file", accept: "image/*" },
  ],
  banner: [
    { name: "note", label: "Ghi chú", type: "text" },
    { name: "image", label: "Ảnh banner", type: "file", accept: "image/*" },
  ],
  popupAds: [
    { name: "title", label: "Tiêu đề popup", type: "text", required: true },
    { name: "content", label: "Nội dung quảng cáo", type: "textarea", multiline: true },
    { name: "targetUrl", label: "Link chuyển đến", type: "url" },
    { name: "active", label: "Đang bật", type: "checkbox" },
    { name: "startAt", label: "Thời gian bắt đầu", type: "datetime-local" },
    { name: "endAt", label: "Thời gian kết thúc", type: "datetime-local" },
    { name: "image", label: "Ảnh popup", type: "file", accept: "image/*" },
  ],
};

const modalSx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "94vw", sm: 760 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "1px solid rgba(148, 163, 184, 0.24)",
  borderRadius: 2,
  boxShadow: "0 24px 52px rgba(2, 6, 23, 0.65)",
  p: { xs: 2, sm: 3 },
};

const fieldSx = {
  "& .MuiInputBase-root": {
    minHeight: 44,
    fontSize: "0.95rem",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.9rem",
  },
};

const getInitialFieldValue = (initialData, field) => {
  if (field.name === "genre.id") return initialData?.genre?.id || initialData?.genreId || "";
  if (field.name === "album.id") return initialData?.album?.id || initialData?.albumId || "";
  return initialData?.[field.name];
};

export default function CrudForm({
  open = false,
  onClose,
  edit = 0,
  api,
  type,
  initialData = {},
  onSuccess,
}) {
  const isEdit = edit === 1;
  const fields = useMemo(() => FORM_FIELDS[type] || [], [type]);

  const [formData, setFormData] = useState({});
  const [albums, setAlbums] = useState(cachedAlbums);
  const [genres, setGenres] = useState(cachedGenres);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadReferenceData = async () => {
      try {
        if (cachedAlbums.length === 0) {
          const res = await fetchLatestAlbums(0, 100);
          cachedAlbums = res.data?.content || res.data || [];
          if (isMounted) setAlbums(cachedAlbums);
        }

        if (cachedGenres.length === 0) {
          const res = await fetchAllGenres();
          cachedGenres = res.data || [];
          if (isMounted) setGenres(cachedGenres);
        }
      } catch (err) {
        console.error("Lỗi tải albums/genres:", err);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    };

    if (open && fields.some((field) => field.optionsKey)) {
      setLoadingData(true);
      loadReferenceData();
    } else {
      setLoadingData(false);
    }

    return () => {
      isMounted = false;
    };
  }, [open, fields]);

  useEffect(() => {
    if (!open) return;

    const defaults = fields.reduce((acc, field) => {
      let value = getInitialFieldValue(initialData, field);

      if (value === undefined || value === null) {
        if (field.type === "checkbox") value = false;
        else if (field.type === "number") value = "";
        else value = "";
      }

      if (field.type === "datetime-local" && typeof value === "string") {
        value = value.slice(0, 16);
      }

      if (field.type === "file") value = null;

      acc[field.name] = value;
      return acc;
    }, {});

    setFormData(defaults);
  }, [open, initialData, fields]);

  const handleChange = useCallback((event) => {
    const { name, value, type: inputType, files, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        inputType === "file"
          ? files?.[0] ?? null
          : inputType === "checkbox"
            ? checked
            : value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      const hasFiles = fields.some((field) => field.type === "file");
      const payload = hasFiles ? new FormData() : {};

      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") return;
        const field = fields.find((item) => item.name === key);
        const normalizedValue =
          field?.type === "datetime-local" && typeof value === "string" && value.length === 16
            ? `${value}:00`
            : value;

        if (hasFiles) {
          payload.append(key, normalizedValue);
        } else {
          payload[key] = normalizedValue;
        }
      });

      if (isEdit && initialData.id) {
        await api.update(initialData.id, payload);
      } else {
        await api.create(payload);
      }

      alert(`${isEdit ? "Cập nhật" : "Tạo mới"} thành công.`);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra";
      alert(`Lỗi: ${msg}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="crud-form-modal">
      <Box sx={modalSx}>
        {loadingData && fields.some((field) => field.optionsKey) ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress />
            <Typography mt={2}>Đang tải dữ liệu tham chiếu...</Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h6" component="h2" mb={3}>
              {isEdit ? `Chỉnh sửa ${type}` : `Tạo mới ${type}`}
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                {fields.map((field) => {
                  const value = formData[field.name] ?? "";

                  if (field.type === "file") {
                    const currentValue = initialData?.[field.name];
                    return (
                      <Grid item xs={12} key={field.name}>
                        <Typography variant="body2" gutterBottom fontWeight={700}>
                          {field.label} {field.required && "*"}
                        </Typography>
                        <input
                          type="file"
                          name={field.name}
                          accept={field.accept}
                          onChange={handleChange}
                          disabled={submitting}
                          style={{
                            display: "block",
                            width: "100%",
                            minHeight: 44,
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid rgba(148, 163, 184, 0.35)",
                            background: "rgba(2, 6, 23, 0.55)",
                            color: "#e2e8f0",
                            fontSize: "0.92rem",
                          }}
                        />
                        {typeof currentValue === "string" && currentValue && (
                          <Typography variant="caption" color="text.secondary" mt={1} display="block">
                            Hiện có: {currentValue.split("/").pop()}
                          </Typography>
                        )}
                      </Grid>
                    );
                  }

                  if (field.type === "checkbox") {
                    return (
                      <Grid item xs={12} key={field.name}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={field.name}
                              checked={!!value}
                              onChange={handleChange}
                              disabled={submitting}
                              size="small"
                            />
                          }
                          label={field.label}
                        />
                      </Grid>
                    );
                  }

                  if (field.type === "select" || field.name.endsWith(".id")) {
                    const options = field.optionsKey === "albums" ? albums : genres;
                    const labelKey = field.optionsKey === "albums" ? "title" : "name";

                    return (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <FormControl fullWidth required={field.required} sx={fieldSx}>
                          <InputLabel>{field.label}</InputLabel>
                          <Select
                            name={field.name}
                            value={value || ""}
                            label={field.label}
                            onChange={handleChange}
                            disabled={submitting}
                          >
                            <MenuItem value="" disabled>
                              Chọn {field.label.toLowerCase()}
                            </MenuItem>
                            {options.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item[labelKey]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  }

                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <TextField
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={value}
                        onChange={handleChange}
                        fullWidth
                        multiline={field.multiline}
                        rows={field.multiline ? 4 : undefined}
                        required={field.required}
                        disabled={submitting}
                        InputLabelProps={field.type === "datetime-local" ? { shrink: true } : undefined}
                        sx={fieldSx}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              <Box mt={4} display="flex" justifyContent="flex-end" gap={1.5}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                  startIcon={
                    submitting ? <CircularProgress size={16} color="inherit" /> : <FontAwesomeIcon icon={faSave} />
                  }
                >
                  {submitting ? "Đang lưu..." : "Lưu"}
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onClose}
                  disabled={submitting}
                  startIcon={<FontAwesomeIcon icon={faTimes} />}
                >
                  Hủy
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
}
