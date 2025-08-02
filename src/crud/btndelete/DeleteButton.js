import React from 'react';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * DeleteButton Component
 *
 * Props:
 * - id: ID của đối tượng cần xoá
 * - api: object chứa hàm delete(id)
 * - label: (tuỳ chọn) nội dung nút
 * - onDeleted: (tuỳ chọn) callback sau khi xoá thành công
 */
export default function DeleteButton({ id, api, label = 'Xoá', onDeleted }) {
    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá?')) return;

        try {
            await api.delete(id);
            alert('Xoá thành công!');
            if (onDeleted) onDeleted(); // callback nếu có
        } catch (err) {
            alert('Lỗi khi xoá: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            startIcon={<FontAwesomeIcon icon={faTrash} />}
            sx={{ fontSize: 13 }}
        >
            {label}
        </Button>
    );
}
