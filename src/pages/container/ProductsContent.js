import React, { useEffect, useMemo, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    CircularProgress,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CrudForm from '../../crud/index'; // Đường dẫn đến CrudForm đã sửa (có modal bên trong)
const ASSET_BASE = 'http://localhost:8082';
// Components nhỏ
const Img = ({ src, alt, size = 50 }) =>
    src ? (
        <img
            src={`${ASSET_BASE}${src}`}
            alt={alt}
            style={{ width: size, height: size, objectFit: 'cover', borderRadius: 6 }}
        />
    ) : (
        'N/A'
    );

const Audio = ({ src, width = 220 }) => (
    <audio controls style={{ width }}>
        <source src={`${ASSET_BASE}${src}`} type="audio/mpeg" />
        Trình duyệt không hỗ trợ audio.
    </audio>
);

const EmptyRow = ({ colSpan, label = 'Không có dữ liệu' }) => (
    <TableRow>
        <TableCell colSpan={colSpan} sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
            {label}
        </TableCell>
    </TableRow>
);

const LoadingState = () => (
    <Box display="flex" alignItems="center" gap={1} py={3} justifyContent="center">
        <CircularProgress size={20} />
        <Typography variant="body2">Đang tải...</Typography>
    </Box>
);

// ──────────────────────────────────────────────
const EntityTable = ({ Api, type }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState('create'); // 'create' | 'edit'
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRefresh = () => setRefreshKey((prev) => prev + 1);

    const openCreateModal = () => {
        setCurrentAction('create');
        setSelectedItem(null);
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setCurrentAction('edit');
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleModalSuccess = () => {
        setModalOpen(false);
        handleRefresh();
    };

    // ──────────────────────────────────────────────
    // API mappings
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
                fetch: () =>
                    Api.getAll().then((res) => res?.data?.data || []),
                create: Api.create,
                update: Api.update,
                delete: Api.remove,
            },
            users: {
                fetch: () => Api.getAllUsers().then((res) => res?.data?.data || []),
                create: Api.signup,
                update: Api.updateMe,
                delete: Api.deleteMe,
            },
        }),
        [Api]
    );

    const currentApi = apiMap[type] || null;

    // ──────────────────────────────────────────────
    // Columns config
    const columnsConfig = useMemo(
        () => ({
            song: [
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Tiêu đề' },
                { key: 'description', label: 'Mô tả' },
                {
                    key: 'coverImage',
                    label: 'Ảnh bìa',
                    render: (r) => <Img src={r.coverImage} alt={r.title} />,
                },
                {
                    key: 'filePath',
                    label: 'Audio',
                    render: (r) => (r.filePath ? <Audio src={r.filePath} /> : 'N/A'),
                },
                { key: 'duration', label: 'Thời lượng' },
                { key: 'playCount', label: 'Lượt phát' },
                { key: 'genreName', label: 'Thể loại' },
                { key: 'albumTitle', label: 'Album' },
                { key: 'artistName', label: 'Nghệ sĩ' },
                {
                    key: '__actions',
                    label: 'Thao tác',
                    render: (r) => (
                        <Box display="flex" gap={1}>
                            <Tooltip title="Sửa">
                                <IconButton color="primary" size="small" onClick={() => openEditModal(r)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={async () => {
                                        if (window.confirm('Xác nhận xóa?')) {
                                            try {
                                                await currentApi.delete(r.id);
                                                handleRefresh();
                                            } catch (err) {
                                                alert('Xóa thất bại: ' + (err.message || 'Lỗi'));
                                            }
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ),
                },
            ],
            albums: [
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Tiêu đề' },
                { key: 'description', label: 'Mô tả' },
                { key: 'coverImage', label: 'Ảnh bìa', render: (r) => <Img src={r.coverImage} alt={r.title} /> },
                { key: 'releaseDate', label: 'Ngày phát hành' },
                { key: 'artistName', label: 'Nghệ sĩ' },
                { key: 'songCount', label: 'Số bài hát' },
                {
                    key: '__actions',
                    label: 'Thao tác',
                    render: (r) => (
                        <Box display="flex" gap={1}>
                            <Tooltip title="Sửa">
                                <IconButton color="primary" size="small" onClick={() => openEditModal(r)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={async () => {
                                        if (window.confirm('Xác nhận xóa?')) {
                                            try {
                                                await currentApi.delete(r.id);
                                                handleRefresh();
                                            } catch (err) {
                                                alert('Xóa thất bại: ' + (err.message || 'Lỗi'));
                                            }
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ),
                },
            ],
            banner: [
                { key: 'id', label: 'ID' },
                { key: 'note', label: 'Ghi chú' },
                { key: 'image', label: 'Ảnh', render: (r) => <Img src={r.image} alt={r.note} /> },
                {
                    key: '__actions',
                    label: 'Thao tác',
                    render: (r) => (
                        <Box display="flex" gap={1}>
                            <Tooltip title="Sửa">
                                <IconButton color="primary" size="small" onClick={() => openEditModal(r)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={async () => {
                                        if (window.confirm('Xác nhận xóa?')) {
                                            try {
                                                await currentApi.delete(r.id);
                                                handleRefresh();
                                            } catch (err) {
                                                alert('Xóa thất bại: ' + (err.message || 'Lỗi'));
                                            }
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ),
                },
            ],
            users: [
                { key: 'id', label: 'ID' },
                { key: 'username', label: 'Tên đăng nhập' },
                { key: 'email', label: 'Email' },
                { key: 'avatar', label: 'Ảnh đại diện', render: (r) => <Img src={r.avatar} alt={r.username} size={40} /> },
                { key: 'active', label: 'Trạng thái', render: (r) => (r.active ? 'Kích hoạt' : 'Khóa') },
                {
                    key: '__actions',
                    label: 'Thao tác',
                    render: (r) => (
                        <Box display="flex" gap={1}>
                            <Tooltip title="Sửa">
                                <IconButton color="primary" size="small" onClick={() => openEditModal(r)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={async () => {
                                        if (window.confirm('Xác nhận xóa người dùng?')) {
                                            try {
                                                await currentApi.delete(r.id);
                                                handleRefresh();
                                            } catch (err) {
                                                alert('Xóa thất bại: ' + (err.message || 'Lỗi'));
                                            }
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ),
                },
            ],
        }),
        [currentApi]
    );

    const columns = columnsConfig[type] || [];

    // ──────────────────────────────────────────────
    useEffect(() => {
        if (!currentApi) {
            setError(`Loại dữ liệu không hỗ trợ: ${type}`);
            setLoading(false);
            return;
        }

        let mounted = true;
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const list = await currentApi.fetch();
                if (mounted) setData(list);
            } catch (err) {
                if (mounted) setError(err.message || 'Lỗi tải dữ liệu');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchData();
        return () => {
            mounted = false;
        };
    }, [type, refreshKey, currentApi]);

    // ──────────────────────────────────────────────
    return (
        <Box p={2}>
            {/* Nút Thêm mới */}
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={openCreateModal}
                    disabled={loading || !currentApi?.create}
                >
                    Thêm mới {type === 'albums' ? 'Album' : type === 'users' ? 'Người dùng' : type === 'banner' ? 'Banner' : 'Bài hát'}
                </Button>
            </Box>

            {loading && <LoadingState />}
            {error && !loading && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {!loading && !error && (
                <TableContainer component={Paper} elevation={2}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell key={col.key} sx={{ fontWeight: 600, fontSize: 13 }}>
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
                                            <TableCell key={col.key} sx={{ fontSize: 13, verticalAlign: 'middle' }}>
                                                {col.render ? col.render(row) : (row[col.key] ?? 'N/A')}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Modal CRUD */}
            {currentApi && (
                <CrudForm
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    edit={currentAction === 'edit' ? 1 : 0}
                    api={{
                        create: currentApi.create,
                        update: currentApi.update,
                    }}
                    type={type === 'albums' ? 'album' : type} // map lại nếu cần (vì FORM_FIELDS dùng 'album')
                    initialData={selectedItem || {}}
                    onSuccess={handleModalSuccess}
                />
            )}
        </Box>
    );
};

export default EntityTable;