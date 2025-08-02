import React, { useState } from 'react';
import {
    Box, Button, Typography, Modal, TextField, Grid
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

export const FORM_FIELDS = {
    song: [
        { name: 'title', label: 'Tiêu đề', type: 'text' },
        { name: 'description', label: 'Mô tả', type: 'text' },
        { name: 'coverImage', label: 'Ảnh bìa', type: 'file', accept: 'image/*' },
        { name: 'audioFile', label: 'Đoạn ghi âm', type: 'file', accept: 'audio/*' },
        { name: 'duration', label: 'Thời lượng', type: 'number' },
        { name: 'playCount', label: 'Lượt phát', type: 'number' },
        { name: 'lyrics', label: 'Lời bài hát', type: 'text' },
        { name: 'genre.id', label: 'ID thể loại', type: 'number' },
        { name: 'album.id', label: 'ID album', type: 'number' },
    ],
    user: [
        { name: 'fullName', label: 'Họ tên', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'avatar', label: 'Avatar', type: 'file', accept: 'image/*' },
    ],
    product: [
        { name: 'name', label: 'Tên sản phẩm', type: 'text' },
        { name: 'price', label: 'Giá', type: 'number' },
        { name: 'description', label: 'Mô tả', type: 'text' },
    ],
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto',
    fontSize: 13
};

export default function Crud({ edit = 0, api, type, initialData = {} }) {
    const isEdit = edit === 1;
    const [open, setOpen] = useState(false);
    const fields = FORM_FIELDS[type] || [];

    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] || (field.type === 'checkbox' ? false : '');
            return acc;
        }, {})
    );

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData(
            fields.reduce((acc, field) => {
                acc[field.name] = initialData[field.name] || (field.type === 'checkbox' ? false : '');
                return acc;
            }, {})
        );
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value, type: inputType, files, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: inputType === 'file' ? files[0] : inputType === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const hasFile = fields.some(f => f.type === 'file');
            const dataToSend = hasFile ? new FormData() : {};

            for (const key in formData) {
                const value = formData[key];
                if (hasFile) {
                    dataToSend.append(key, value ?? '');
                } else {
                    dataToSend[key] = value;
                }
            }

            if (isEdit && initialData.id) {
                await api.update(initialData.id, dataToSend);
            } else {
                await api.create(dataToSend);
            }

            alert(`${isEdit ? 'Cập nhật' : 'Tạo mới'} thành công!`);
            handleClose();
        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                color={isEdit ? 'warning' : 'primary'}
                startIcon={<FontAwesomeIcon icon={isEdit ? faEdit : faPlus} />}
                size="small"
                sx={{ fontSize: 13, textTransform: 'none' }}
            >
                {isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" fontSize={15} mb={2}>
                        {isEdit ? 'Chỉnh sửa' : 'Tạo mới'} {type}
                    </Typography>

                    <Grid container spacing={2}>
                        {fields.map((field) => (
                            <Grid item xs={12} key={field.name}>
                                {field.type === 'file' ? (
                                    <>
                                        <Typography fontSize={13} mb={0.5}>{field.label}</Typography>
                                        <input
                                            type="file"
                                            name={field.name}
                                            accept={field.accept}
                                            onChange={handleChange}
                                            style={{ fontSize: 13 }}
                                        />
                                        {typeof formData[field.name] === 'string' && (
                                            <Typography variant="caption" fontSize={12} color="textSecondary">
                                                Hiện có: {formData[field.name]}
                                            </Typography>
                                        )}
                                    </>
                                ) : field.type === 'checkbox' ? (
                                    <label style={{ fontSize: 13 }}>
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            checked={!!formData[field.name]}
                                            onChange={handleChange}
                                        />{' '}
                                        {field.label}
                                    </label>
                                ) : (
                                    <TextField
                                        label={field.label}
                                        name={field.name}
                                        type={field.type}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                        InputLabelProps={field.type === 'datetime-local' ? { shrink: true } : {}}
                                        InputProps={{ style: { fontSize: 13 } }}
                                        InputLabelProps={{ style: { fontSize: 13 } }}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>

                    <Box mt={4} display="flex" justifyContent="flex-end" gap={1}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            startIcon={<FontAwesomeIcon icon={faTimes} />}
                            size="small"
                            sx={{ fontSize: 13, textTransform: 'none' }}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            startIcon={<FontAwesomeIcon icon={faSave} />}
                            color="success"
                            size="small"
                            sx={{ fontSize: 13, textTransform: 'none' }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
