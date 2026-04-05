import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Modal,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

// API imports
import { fetchLatestAlbums } from '../api/albums';
import {
    fetchAllGenres,
    // Nếu cần: createGenre, updateGenre, deleteGenre,...
} from '../api/genner'; // Đổi tên file nếu cần thành genreApi.js cho rõ nghĩa

// Global cache (fetch 1 lần cho toàn app)
let cachedAlbums = [];
let cachedGenres = [];

// User từ cookie (chỉ parse 1 lần)
const userCookie = Cookies.get('user');
const currentUser = userCookie ? JSON.parse(userCookie) : null;

// ──────────────────────────────────────────────
// Cấu hình fields theo type entity
export const FORM_FIELDS = {
    song: [
        { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
        { name: 'description', label: 'Mô tả', type: 'text' },
        { name: 'coverImage', label: 'Ảnh bìa', type: 'file', accept: 'image/*' },
        { name: 'audioFile', label: 'File âm thanh', type: 'file', accept: 'audio/*' },
        { name: 'duration', label: 'Thời lượng (giây)', type: 'number' },
        { name: 'playCount', label: 'Lượt phát', type: 'number' },
        { name: 'lyrics', label: 'Lời bài hát', type: 'textarea', multiline: true },
        { name: 'genre.id', label: 'Thể loại', type: 'select', optionsKey: 'genres' },
        { name: 'album.id', label: 'Album', type: 'select', optionsKey: 'albums' },
    ],
    users: [
        { name: 'username', label: 'Tên đăng nhập', type: 'text', required: true },
        { name: 'fullName', label: 'Họ tên', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'avatar', label: 'Ảnh đại diện', type: 'file', accept: 'image/*' },
        { name: 'active', label: 'Kích hoạt', type: 'checkbox' },
    ],
    album: [
        { name: 'title', label: 'Tiêu đề album', type: 'text', required: true },
        { name: 'description', label: 'Mô tả', type: 'text' },
        { name: 'coverImage', label: 'Ảnh bìa', type: 'file', accept: 'image/*' },
    ],
    banner: [
        { name: 'note', label: 'Ghi chú', type: 'text' },
        { name: 'image', label: 'Ảnh banner', type: 'file', accept: 'image/*' },
    ],
    // Thêm type khác nếu cần
};

// ──────────────────────────────────────────────
export default function CrudForm({
                                     open = false,           // Prop từ cha: modal có mở không
                                     onClose,                // Prop từ cha: hàm đóng modal
                                     edit = 0,               // 0 = create, 1 = edit
                                     api,                    // object api { create, update, ... }
                                     type,                   // 'song' | 'album' | 'users' | 'banner'
                                     initialData = {},       // dữ liệu khi edit
                                     onSuccess,              // callback khi thành công
                                 }) {
    const isEdit = edit === 1;
    const fields = FORM_FIELDS[type] || [];

    const [formData, setFormData] = useState({});
    const [albums, setAlbums] = useState(cachedAlbums);
    const [genres, setGenres] = useState(cachedGenres);
    const [loadingData, setLoadingData] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Load albums & genres chỉ 1 lần khi cần
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
                console.error('Lỗi tải albums/genres:', err);
            } finally {
                if (isMounted) setLoadingData(false);
            }
        };

        if (open && fields.some(f => f.optionsKey)) {
            loadReferenceData();
        } else if (!fields.some(f => f.optionsKey)) {
            setLoadingData(false);
        }

        return () => { isMounted = false; };
    }, [open, fields]);

    // Reset form khi modal mở hoặc initialData thay đổi
    useEffect(() => {
        if (!open) return;

        const defaults = fields.reduce((acc, field) => {
            let val = initialData[field.name];

            if (val === undefined || val === null) {
                if (field.type === 'checkbox') val = false;
                else if (field.type === 'number') val = 0;
                else if (field.type === 'file') val = null;
                else val = '';
            }

            acc[field.name] = val;
            return acc;
        }, {});

        setFormData(defaults);
    }, [open, initialData, fields]);

    const handleChange = useCallback((e) => {
        const { name, value, type: inputType, files, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                inputType === 'file' ? (files?.[0] ?? null)
                    : inputType === 'checkbox' ? checked
                        : value,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);

        try {
            const hasFiles = fields.some(f => f.type === 'file');
            const payload = hasFiles ? new FormData() : {};

            Object.entries(formData).forEach(([key, val]) => {
                if (val !== null && val !== undefined && val !== '') {
                    if (hasFiles) {
                        payload.append(key, val);
                    } else {
                        payload[key] = val;
                    }
                }
            });

            if (isEdit && initialData.id) {
                await api.update(initialData.id, payload);
            } else {
                await api.create(payload);
            }

            alert(`${isEdit ? 'Cập nhật' : 'Tạo mới'} thành công!`);
            if (onSuccess) onSuccess();
            onClose?.();
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Có lỗi xảy ra';
            alert(`Lỗi: ${msg}`);
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    // ──────────────────────────────────────────────
    // Render
    if (!open) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="crud-form-modal"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 700 },
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {loadingData && fields.some(f => f.optionsKey) ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <CircularProgress />
                        <Typography mt={2}>Đang tải dữ liệu tham chiếu...</Typography>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h6" component="h2" mb={3}>
                            {isEdit ? `Chỉnh sửa ${type}` : `Tạo mới ${type}`}
                        </Typography>

                        <form onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2.5}>
                                {fields.map(field => {
                                    const value = formData[field.name] ?? '';

                                    // File input
                                    if (field.type === 'file') {
                                        return (
                                            <Grid item xs={12} key={field.name}>
                                                <Typography variant="body2" gutterBottom>
                                                    {field.label} {field.required && '*'}
                                                </Typography>
                                                <input
                                                    type="file"
                                                    name={field.name}
                                                    accept={field.accept}
                                                    onChange={handleChange}
                                                    disabled={submitting}
                                                    style={{ display: 'block', marginTop: 8 }}
                                                />
                                                {typeof value === 'string' && value && (
                                                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                                        Hiện có: {value.split('/').pop()}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        );
                                    }

                                    // Checkbox
                                    if (field.type === 'checkbox') {
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

                                    // Select
                                    if (field.type === 'select' || field.name.endsWith('.id')) {
                                        const options = field.optionsKey === 'albums' ? albums : genres;
                                        const labelKey = field.optionsKey === 'albums' ? 'title' : 'name';

                                        return (
                                            <Grid item xs={12} sm={6} key={field.name}>
                                                <FormControl fullWidth size="small" required={field.required}>
                                                    <InputLabel>{field.label}</InputLabel>
                                                    <Select
                                                        name={field.name}
                                                        value={value || ''}
                                                        label={field.label}
                                                        onChange={handleChange}
                                                        disabled={submitting}
                                                    >
                                                        <MenuItem value="" disabled>
                                                            -- Chọn {field.label.toLowerCase()} --
                                                        </MenuItem>
                                                        {options.map(item => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item[labelKey]}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        );
                                    }

                                    // Text, number, textarea, email
                                    return (
                                        <Grid item xs={12} sm={6} key={field.name}>
                                            <TextField
                                                label={field.label}
                                                name={field.name}
                                                type={field.type}
                                                value={value}
                                                onChange={handleChange}
                                                fullWidth
                                                size="small"
                                                multiline={field.multiline}
                                                rows={field.multiline ? 4 : undefined}
                                                required={field.required}
                                                disabled={submitting}
                                                inputProps={{ style: { fontSize: '0.875rem' } }}
                                                InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>

                            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    disabled={submitting}
                                    startIcon={
                                        submitting ? <CircularProgress size={16} color="inherit" /> : <FontAwesomeIcon icon={faSave} size="sm" />
                                    }
                                >
                                    {submitting ? 'Đang lưu...' : 'Lưu'}
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="small"
                                    onClick={onClose}
                                    disabled={submitting}
                                    startIcon={<FontAwesomeIcon icon={faTimes} size="sm" />}
                                >
                                    Huỷ
                                </Button>
                            </Box>
                        </form>
                    </>
                )}
            </Box>
        </Modal>
    );
}