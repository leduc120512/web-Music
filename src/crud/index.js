import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    Grid,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEdit,
    faSave,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

import { fetchLatestAlbums } from '../api/albums';
import bannerApi from '../api2/genreApi.js';

// Cache dữ liệu tham chiếu (chỉ fetch 1 lần cho toàn bộ ứng dụng)
const genreCache = { data: [], loaded: false };
const albumCache = { data: [], loaded: false };

// Lấy thông tin user từ cookie (nếu cần)
const userCookie = Cookies.get('user');
const currentUser = userCookie ? JSON.parse(userCookie) : null;

// Định nghĩa các field cho từng loại form
export const FORM_FIELDS = {
    song: [
        { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
        { name: 'description', label: 'Mô tả', type: 'text' },
        { name: 'coverImage', label: 'Ảnh bìa', type: 'file', accept: 'image/*' },
        { name: 'audioFile', label: 'File âm thanh', type: 'file', accept: 'audio/*' },
        { name: 'duration', label: 'Thời lượng (giây)', type: 'number' },
        { name: 'lyrics', label: 'Lời bài hát', type: 'textarea', multiline: true, rows: 4 },
        { name: 'genre.id', label: 'Thể loại', type: 'select', optionsKey: 'genres', required: true },
        { name: 'album.id', label: 'Album', type: 'select', optionsKey: 'albums' },
    ],

    album: [
        { name: 'title', label: 'Tiêu đề album', type: 'text', required: true },
        { name: 'description', label: 'Mô tả', type: 'text' },
        { name: 'coverImage', label: 'Ảnh bìa', type: 'file', accept: 'image/*' },
    ],

    // Có thể thêm các type khác ở đây...
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '92%', sm: 620, md: 720 },
    maxHeight: '92vh',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 2, sm: 4 },
    overflowY: 'auto',
};

export default function CrudModal({ api, type, onSuccess }) {
    const fields = FORM_FIELDS[type] || [];

    // State cho dữ liệu tham chiếu
    const [genres, setGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loadingRefs, setLoadingRefs] = useState(true);

    // State cho modal & form
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [formData, setFormData] = useState({});

    // Load dữ liệu tham chiếu (genres + albums) - chỉ 1 lần
    useEffect(() => {
        const loadReferenceData = async () => {
            setLoadingRefs(true);

            try {
                // Genres
                if (!genreCache.loaded && fields.some(f => f.optionsKey === 'genres' || f.name === 'genre.id')) {
                    const res = await bannerApi.fetchAllGenres();
                    const genreList = res.data?.data || res.data || res || [];
                    genreCache.data = genreList.map(g => ({
                        id: g.id,
                        name: g.name || g.genreName || g.title || 'Không có tên',
                    }));
                    genreCache.loaded = true;
                    setGenres(genreCache.data);
                } else if (genreCache.loaded) {
                    setGenres(genreCache.data);
                }

                // Albums
                if (!albumCache.loaded && fields.some(f => f.optionsKey === 'albums' || f.name === 'album.id')) {
                    const res = await fetchLatestAlbums(0, 100);
                    const albumList = res.data?.content || res.data || res || [];
                    albumCache.data = albumList;
                    albumCache.loaded = true;
                    setAlbums(albumCache.data);
                } else if (albumCache.loaded) {
                    setAlbums(albumCache.data);
                }
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu tham chiếu:', err);
            } finally {
                setLoadingRefs(false);
            }
        };

        if (fields.length > 0) {
            loadReferenceData();
        }
    }, []); // Chỉ chạy một lần khi component mount

    // Chuẩn bị dữ liệu form khi mở modal (thêm mới hoặc sửa)
    const openModal = (item = {}, editMode = false) => {
        const initialValues = fields.reduce((acc, field) => {
            let value = editMode ? item[field.name] : undefined;

            // Xử lý trường hợp nested object (genre, album)
            if (typeof value === 'object' && value !== null && 'id' in value) {
                value = value.id;
            }

            // Giá trị mặc định
            if (value === undefined || value === null) {
                if (field.type === 'checkbox') value = false;
                else if (field.type === 'number') value = 0;
                else value = '';
            }

            acc[field.name] = value;
            return acc;
        }, {});

        setFormData(initialValues);
        setCurrentItem(item);
        setIsEdit(editMode);
        setOpen(true);
    };

    // Các hàm điều khiển modal
    const handleAddNew = () => openModal({}, false);
    const handleEdit = (item) => openModal(item, true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value, type: inputType, files, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                inputType === 'file' ? (files?.[0] ?? null)
                    : inputType === 'checkbox' ? checked
                        : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const hasFile = fields.some((f) => f.type === 'file');
            const payload = hasFile ? new FormData() : {};

            Object.entries(formData).forEach(([key, val]) => {
                if (hasFile) {
                    payload.append(key, val ?? '');
                } else {
                    payload[key] = val;
                }
            });

            if (isEdit && currentItem.id) {
                await api.update(currentItem.id, payload);
                alert('Cập nhật thành công!');
            } else {
                await api.create(payload);
                alert('Thêm mới thành công!');
            }

            onSuccess?.();
            handleClose();
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Lỗi không xác định';
            alert('Lỗi: ' + msg);
            console.error(err);
        }
    };

    // ──────────────────────────────────────────────
    // Render
    // ──────────────────────────────────────────────

    return (
        <>
            {/* Nút mở modal thêm mới (có thể đặt ở đâu cũng được) */}
            <Box sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={handleAddNew}
                >
                    Thêm mới {type === 'song' ? 'bài hát' : type === 'album' ? 'album' : ''}
                </Button>
            </Box>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {isEdit ? 'Chỉnh sửa' : 'Thêm mới'}{' '}
                        {type === 'song' ? 'Bài hát' : type === 'album' ? 'Album' : ''}
                    </Typography>

                    {loadingRefs ? (
                        <Typography>Đang tải danh sách thể loại/album...</Typography>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2.5}>
                                {fields.map((field) => {
                                    const value = formData[field.name] ?? '';

                                    // Trường hợp file
                                    if (field.type === 'file') {
                                        return (
                                            <Grid item xs={12} key={field.name}>
                                                <Typography variant="body2" gutterBottom>
                                                    {field.label}
                                                </Typography>
                                                <input
                                                    type="file"
                                                    name={field.name}
                                                    accept={field.accept}
                                                    onChange={handleChange}
                                                    style={{ width: '100%', fontSize: '0.875rem' }}
                                                />
                                                {isEdit && typeof value === 'string' && value && (
                                                    <Typography variant="caption" color="text.secondary" mt={0.5} component="div">
                                                        File hiện tại: {value.split('/').pop()}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        );
                                    }

                                    // Trường hợp select (genre & album)
                                    if (field.type === 'select' || field.name.endsWith('.id')) {
                                        const options = field.optionsKey === 'genres' ? genres : albums;
                                        const labelKey = field.optionsKey === 'genres' ? 'name' : 'title';

                                        return (
                                            <Grid item xs={12} sm={6} key={field.name}>
                                                <FormControl fullWidth size="small" required={field.required}>
                                                    <InputLabel>{field.label}</InputLabel>
                                                    <Select
                                                        name={field.name}
                                                        value={value || ''}
                                                        label={field.label}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="">
                                                            <em>-- Chọn {field.label.toLowerCase()} --</em>
                                                        </MenuItem>
                                                        {options.map((opt) => (
                                                            <MenuItem key={opt.id} value={opt.id}>
                                                                {opt[labelKey] || 'Không có tên'}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        );
                                    }

                                    // Các field text, number, textarea...
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
                                                rows={field.rows}
                                                required={field.required}
                                                inputProps={{ style: { fontSize: '0.875rem' } }}
                                                InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<FontAwesomeIcon icon={faSave} />}
                                >
                                    Lưu
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                    startIcon={<FontAwesomeIcon icon={faTimes} />}
                                >
                                    Huỷ
                                </Button>
                            </Box>
                        </form>
                    )}
                </Box>
            </Modal>
        </>
    );
}