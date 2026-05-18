import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
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
  width: { xs: "94vw", sm: 640 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "#0f172a",
  border: "1px solid rgba(125, 211, 252, 0.28)",
  borderRadius: "16px",
  boxShadow: "0 24px 52px rgba(2, 6, 23, 0.65)",
  p: { xs: 2, sm: 3 },
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 56,
    fontSize: "1.08rem",
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    borderRadius: "7px",
    boxShadow: "0 1px 0 rgba(255, 255, 255, 0.06)",
    "& fieldset": {
      borderColor: "rgba(15, 23, 42, 0.18)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(14, 165, 233, 0.65)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0891b2",
      borderWidth: 2,
    },
  },
  "& .MuiInputBase-root": {
    fontSize: "1.08rem",
  },
  "& .MuiInputBase-input": {
    padding: "15px 16px",
    "&::placeholder": {
      color: "#64748b",
      opacity: 1,
    },
  },
  "& textarea.MuiInputBase-input": {
    minHeight: 96,
  },
};

const fieldLabelSx = {
  mb: 0.8,
  color: "#67e8f9",
  fontSize: "1.12rem",
  fontWeight: 800,
};

const fileInputStyle = {
  display: "block",
  width: "100%",
  minHeight: 56,
  padding: "15px 16px",
  borderRadius: 7,
  border: "1px solid rgba(15, 23, 42, 0.18)",
  background: "#f8fafc",
  color: "#1e293b",
  fontSize: "1.08rem",
  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.16)",
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
            <Typography mt={2} sx={{ color: "#e2e8f0" }}>Đang tải dữ liệu tham chiếu...</Typography>
          </Box>
        ) : (
          <>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 2.5,
                color: "#f8fafc",
                fontSize: "1.45rem",
                fontWeight: 900,
              }}
            >
              {isEdit ? `Chỉnh sửa ${type}` : `Tạo mới ${type}`}
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <Box display="flex" flexDirection="column" gap={2.1}>
                {fields.map((field) => {
                  const value = formData[field.name] ?? "";

                  if (field.type === "file") {
                    const currentValue = initialData?.[field.name];
                    return (
                      <Box key={field.name}>
                        <Typography sx={fieldLabelSx}>
                          {field.label} {field.required && "*"}
                        </Typography>
                        <input
                          type="file"
                          name={field.name}
                          accept={field.accept}
                          onChange={handleChange}
                          disabled={submitting}
                          style={fileInputStyle}
                        />
                        {typeof currentValue === "string" && currentValue && (
                          <Typography variant="caption" sx={{ color: "#cbd5e1" }} mt={1} display="block">
                            Hiện có: {currentValue.split("/").pop()}
                          </Typography>
                        )}
                      </Box>
                    );
                  }

                  if (field.type === "checkbox") {
                    return (
                      <Box key={field.name}>
                        <FormControlLabel
                          sx={{
                            m: 0,
                            px: 1.5,
                            py: 1,
                            width: "100%",
                            borderRadius: "7px",
                            color: "#075985",
                            backgroundColor: "#f8fafc",
                            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.16)",
                            border: "1px solid rgba(15, 23, 42, 0.18)",
                            "& .MuiFormControlLabel-label": {
                              fontWeight: 800,
                            },
                          }}
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
                      </Box>
                    );
                  }

                  if (field.type === "select" || field.name.endsWith(".id")) {
                    const options = field.optionsKey === "albums" ? albums : genres;
                    const labelKey = field.optionsKey === "albums" ? "title" : "name";

                    return (
                      <Box key={field.name}>
                        <Typography sx={fieldLabelSx}>
                          {field.label} {field.required && "*"}
                        </Typography>
                        <FormControl fullWidth required={field.required} sx={fieldSx}>
                          <Select
                            name={field.name}
                            value={value || ""}
                            onChange={handleChange}
                            disabled={submitting}
                            displayEmpty
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
                      </Box>
                    );
                  }

                  return (
                    <Box key={field.name}>
                      <Typography sx={fieldLabelSx}>
                        {field.label} {field.required && "*"}
                      </Typography>
                      <TextField
                        name={field.name}
                        type={field.type}
                        value={value}
                        placeholder={field.label}
                        onChange={handleChange}
                        fullWidth
                        multiline={field.multiline}
                        rows={field.multiline ? 4 : undefined}
                        required={field.required}
                        disabled={submitting}
                        InputLabelProps={field.type === "datetime-local" ? { shrink: true } : undefined}
                        sx={fieldSx}
                      />
                    </Box>
                  );
                })}
              </Box>

              <Box mt={3} display="flex" flexDirection="column" gap={1.5}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                  fullWidth
                  startIcon={
                    submitting ? <CircularProgress size={16} color="inherit" /> : <FontAwesomeIcon icon={faSave} />
                  }
                  sx={{
                    minHeight: 56,
                    borderRadius: "7px",
                    background: "linear-gradient(135deg, #0891b2, #0369a1)",
                    fontSize: "1.08rem",
                    fontWeight: 900,
                    textTransform: "none",
                    boxShadow: "0 8px 18px rgba(3, 105, 161, 0.28)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #0284c7, #075985)",
                    },
                  }}
                >
                  {submitting ? "Đang lưu..." : "Lưu"}
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onClose}
                  disabled={submitting}
                  fullWidth
                  startIcon={<FontAwesomeIcon icon={faTimes} />}
                  sx={{
                    minHeight: 56,
                    borderRadius: "7px",
                    color: "#075985",
                    borderColor: "rgba(7, 89, 133, 0.35)",
                    backgroundColor: "rgba(255, 255, 255, 0.65)",
                    fontWeight: 850,
                    textTransform: "none",
                  }}
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
