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
} from '@mui/material';
import Crud from '../../crud';
import DeleteButton from '../../crud/btndelete/DeleteButton';

const ASSET_BASE = 'http://localhost:8082';

const Img = ({ src, alt, size = 50 }) =>
    src ? (
        <img src={src} alt={alt} style={{ width: size, height: size, objectFit: 'cover', borderRadius: 6 }} />
    ) : (
        'N/A'
    );

const Audio = ({ src, width = 250 }) => (
    <audio controls style={{ width }}>
        <source src={src} type="audio/mpeg" />
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
    <Box display="flex" alignItems="center" gap={1} py={2}>
        <CircularProgress size={18} />
        <Typography variant="body2">Đang tải dữ liệu…</Typography>
    </Box>
);

const ErrorState = ({ message }) => (
    <Typography variant="body2" color="error" sx={{ py: 2 }}>
        Lỗi tải dữ liệu: {message}
    </Typography>
);

const SongTable = ({ Api, type }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => setRefreshKey((v) => v + 1);

    // Map CRUD create per type (dùng đúng hàm có sẵn)
    const createApiByType = useMemo(() => ({
        song: async (payload) => Api.create(payload),
        albums: async (payload) => Api.createAlbum(payload),
        banner: async (payload) => Api.create(payload),
        users: async (payload) => Api.signup(payload),
    }), [Api]);

    // Map CRUD update per type (giữ nguyên như code gốc)
    const updateApiByType = useMemo(() => ({
        song: async (id, payload) => Api.update(id, payload),
        albums: async (id, payload) => Api.update(id, payload),
        banner: async (id, payload) => Api.update(id, payload),
        users: async (id, payload) => Api.updateMe(id, payload),
    }), [Api]);

    // Map CRUD delete per type (đúng theo code gốc)
    const deleteApiByType = useMemo(() => ({
        song: async (id) => Api.delete(id),
        albums: async (id) => Api.deleteAlbum(id),
        banner: async (id) => Api.remove(id),
        users: async (id) => Api.deleteMe(id),
    }), [Api]);

    // Map fetch theo type (đúng như code gốc)
    const fetcherByType = useMemo(() => ({
        song: async () => {
            const res = await Api.getLatestSongs();
            return res?.data?.data?.content || [];
        },
        albums: async () => {
            const res = await Api.fetchLatestAlbums();
            return res?.data?.content || [];
        },
        banner: async () => {
            const res = await Api.getAll();
            return res?.data || [];
        },
        users: async () => {
            const res = await Api.getAllUsers();
            return res?.data?.data || [];
        },
    }), [Api]);

    useEffect(() => {
        let mounted = true;
        const run = async () => {
            setLoading(true);
            setError('');
            try {
                const fetcher = fetcherByType[type];
                if (!fetcher) throw new Error(`Unsupported type: ${type}`);
                const list = await fetcher();
                if (mounted) setData(list);
            } catch (e) {
                if (mounted) setError(e?.message || 'Không xác định');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        run();
        return () => {
            mounted = false;
        };
    }, [type, refreshKey, fetcherByType]);

    // Định nghĩa cột theo type
    const columns = useMemo(() => {
        if (type === 'song') {
            return [
                { key: 'id', label: 'ID', render: (r) => r.id },
                { key: 'title', label: 'Title', render: (r) => r.title },
                { key: 'description', label: 'Description', render: (r) => r.description },
                {
                    key: 'coverImage',
                    label: 'Cover Image',
                    render: (r) => <Img src={r.coverImage ? `${ASSET_BASE}${r.coverImage}` : ''} alt={r.title} />,
                },
                {
                    key: 'filePath',
                    label: 'Audio File',
                    render: (r) => (r.filePath ? <Audio src={`${ASSET_BASE}${r.filePath}`} /> : 'N/A'),
                },
                { key: 'duration', label: 'Duration', render: (r) => r.duration },
                { key: 'playCount', label: 'Play Count', render: (r) => r.playCount },
                { key: 'lyrics', label: 'Lyrics', render: (r) => r.lyrics || 'N/A' },
                { key: 'artistName', label: 'Artist', render: (r) => r.artistName },
                { key: 'albumTitle', label: 'Album', render: (r) => r.albumTitle },
                { key: 'genreName', label: 'Genre', render: (r) => r.genreName },
                { key: 'createdAt', label: 'Created At', render: (r) => r.createdAt },
                { key: 'liked', label: 'Liked', render: (r) => (r.liked ? 'Yes' : 'No') },
                {
                    key: '__actions',
                    label: 'Actions',
                    render: (r) => (
                        <Box>
                            <Crud
                                key={`edit-${r.id}`}
                                edit={1}
                                api={{
                                    update: async (id, payload) => {
                                        await updateApiByType.song(id, payload);
                                        handleRefresh();
                                    },
                                }}
                                type={type}
                                initialData={r}
                            />
                            <Box mt={1}>
                                <DeleteButton
                                    id={r.id}
                                    api={{
                                        delete: async (id) => {
                                            await deleteApiByType.song(id);
                                            handleRefresh();
                                        },
                                    }}
                                    label="Xoá"
                                />
                            </Box>
                        </Box>
                    ),
                },
            ];
        }

        if (type === 'albums') {
            return [
                { key: 'id', label: 'ID', render: (r) => r.id },
                { key: 'title', label: 'Title', render: (r) => r.title },
                { key: 'description', label: 'Description', render: (r) => r.description },
                {
                    key: 'coverImage',
                    label: 'Cover Image',
                    render: (r) => <Img src={r.coverImage ? `${ASSET_BASE}${r.coverImage}` : ''} alt={r.title} />,
                },
                { key: 'releaseDate', label: 'Release Date', render: (r) => r.releaseDate },
                { key: 'artistName', label: 'Artist', render: (r) => r.artistName },
                { key: 'createdAt', label: 'Created At', render: (r) => r.createdAt },
                { key: 'songCount', label: 'Song Count', render: (r) => r.songCount },
                {
                    key: '__actions',
                    label: 'Actions',
                    render: (r) => (
                        <Box>
                            <Crud
                                key={`edit-${r.id}`}
                                edit={1}
                                api={{
                                    update: async (id, payload) => {
                                        await updateApiByType.albums(id, payload);
                                        handleRefresh();
                                    },
                                }}
                                type="album"
                                initialData={r}
                            />
                            <Box mt={1}>
                                <DeleteButton
                                    id={r.id}
                                    api={{
                                        delete: async (id) => {
                                            await deleteApiByType.albums(id);
                                            handleRefresh();
                                        },
                                    }}
                                    label="Xoá"
                                />
                            </Box>
                        </Box>
                    ),
                },
            ];
        }

        if (type === 'banner') {
            return [
                { key: 'id', label: 'ID', render: (r) => r.id },
                { key: 'note', label: 'Note', render: (r) => r.note },
                {
                    key: 'image',
                    label: 'Image',
                    render: (r) => <Img src={r.image ? `${ASSET_BASE}${r.image}` : ''} alt={r.note} />,
                },
                {
                    key: '__actions',
                    label: 'Actions',
                    render: (r) => (
                        <Box>
                            <Crud
                                key={`edit-${r.id}`}
                                edit={1}
                                api={{
                                    update: async (id, payload) => {
                                        await updateApiByType.banner(id, payload);
                                        handleRefresh();
                                    },
                                }}
                                type="banner"
                                initialData={r}
                            />
                            <Box mt={1}>
                                <DeleteButton
                                    id={r.id}
                                    api={{
                                        delete: async (id) => {
                                            await deleteApiByType.banner(id);
                                            handleRefresh();
                                        },
                                    }}
                                    label="Xoá"
                                />
                            </Box>
                        </Box>
                    ),
                },
            ];
        }

        if (type === 'users') {
            return [
                { key: 'id', label: 'ID', render: (r) => r.id },
                { key: 'username', label: 'username', render: (r) => r.username },
                { key: 'email', label: 'email', render: (r) => r.email },
                {
                    key: 'avatar',
                    label: 'avatar',
                    render: (r) => <Img src={r.avatar} alt={r.username} />,
                },
                { key: 'active', label: 'active', render: (r) => String(r.active) },
                { key: 'createdAt', label: 'createdAt', render: (r) => r.createdAt },
                {
                    key: '__actions',
                    label: 'Actions',
                    render: (r) => (
                        <Box>
                            <Crud
                                key={`edit-${r.id}`}
                                edit={1}
                                api={{
                                    update: async (id, payload) => {
                                        await updateApiByType.users(id, payload);
                                        handleRefresh();
                                    },
                                }}
                                type="users"
                                initialData={r}
                            />
                            <Box mt={1}>
                                <DeleteButton
                                    id={r.id}
                                    api={{
                                        delete: async (id) => {
                                            await deleteApiByType.users(id);
                                            handleRefresh();
                                        },
                                    }}
                                    label="Xoá"
                                />
                            </Box>
                        </Box>
                    ),
                },
            ];
        }

        return [];
    }, [type, updateApiByType, deleteApiByType]);

    const createBar = (
        <Box mb={2}>
            {/* Chỉ hiển thị nút tạo đúng theo type như code gốc */}
            {type === 'song' && (
                <Crud
                    key="create-song"
                    edit={0}
                    api={{
                        create: async (payload) => {
                            await createApiByType.song(payload);
                            handleRefresh();
                        },
                    }}
                    type={type}
                />
            )}

            {type === 'albums' && (
                <Crud
                    key="create-album"
                    edit={0}
                    api={{
                        create: async (payload) => {
                            await createApiByType.albums(payload);
                            handleRefresh();
                        },
                    }}
                    type="album"
                />
            )}

            {type === 'banner' && (
                <Crud
                    key="create-banner"
                    edit={0}
                    api={{
                        create: async (payload) => {
                            await createApiByType.banner(payload);
                            handleRefresh();
                        },
                    }}
                    type="banner"
                />
            )}

            {type === 'users' && (
                <Crud
                    key="create-user"
                    edit={0}
                    api={{
                        create: async (payload) => {
                            await createApiByType.users(payload);
                            handleRefresh();
                        },
                    }}
                    type="users"
                />
            )}
        </Box>
    );

    return (
        <Box p={2}>
            {createBar}

            {loading && <LoadingState />}
            {error && !loading && <ErrorState message={error} />}

            <TableContainer component={Paper} elevation={2}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((c) => (
                                <TableCell key={c.key} sx={{ fontSize: 13, fontWeight: 600 }}>
                                    {c.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {!loading && data.length === 0 && <EmptyRow colSpan={columns.length} />}

                        {data.map((row) => (
                            <TableRow key={row.id} hover>
                                {columns.map((c) => (
                                    <TableCell key={c.key} sx={{ fontSize: 13, verticalAlign: 'top' }}>
                                        {c.render(row)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SongTable;
