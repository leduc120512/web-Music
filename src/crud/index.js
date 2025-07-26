import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function Crud({ api, type = "user", initialData = {} }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        avatar: initialData.avatar || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await api(formData);
            alert("Cập nhật thành công!");
            handleClose();
        } catch (err) {
            alert("Lỗi: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="primary">Chỉnh sửa</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" mb={2}>Cập nhật {type}</Typography>

                    <TextField
                        label="Họ tên"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Avatar URL"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <Box mt={2} textAlign="right">
                        <Button onClick={handleSubmit} variant="contained" color="success">Lưu</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
