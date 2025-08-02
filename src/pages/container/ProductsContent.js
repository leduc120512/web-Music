import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box
} from '@mui/material';
import Crud from '../../crud';
import DeleteButton from '../../crud/btndelete/DeleteButton'; // nếu có file riêng

const SongTable = ({ Api, type }) => {
    const [data, setData] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => setRefreshKey((prev) => prev + 1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type === 'song') {
                    const response = await Api.getLatestSongs();
                    setData(response?.data?.data?.content || []);
                }
                // else if (type === 'user') { ... }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [refreshKey, type]);

    return (
        <Box p={2}>
            <Box mb={2}>
                <Crud
                    key="create"
                    edit={0}
                    api={{
                        create: async (data) => {
                            await Api.create(data);
                            handleRefresh(); // làm mới lại bảng sau khi tạo mới
                        }
                    }}
                    type={type}
                />

            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {type === 'song' &&
                                [
                                    'ID', 'Title', 'Description', 'Cover Image', 'Audio File',
                                    'Duration', 'Play Count', 'Lyrics', 'Artist', 'Album',
                                    'Genre', 'Created At', 'Liked', 'Actions'
                                ].map(title => (
                                    <TableCell key={title} sx={{ fontSize: 13 }}>{title}</TableCell>
                                ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {type === 'song' && data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell sx={{ fontSize: 13 }}>{item.id}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.title}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.description}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>
                                    {item.coverImage ? (
                                        <img
                                            src={`http://localhost:8082${item.coverImage}`}
                                            alt={item.title}
                                            style={{ width: '50px' }}
                                        />
                                    ) : 'N/A'}
                                </TableCell>
                                <TableCell sx={{ fontSize: 13 }}>
                                    {item.audioFile ? (
                                        <audio controls>
                                            <source src={`http://localhost:8082${item.audioFile}`} type="audio/mpeg" />
                                            Trình duyệt không hỗ trợ audio.
                                        </audio>
                                    ) : 'N/A'}
                                </TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.duration}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.playCount}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.lyrics || 'N/A'}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.artistName}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.albumTitle}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.genreName}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.createdAt}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{item.liked ? 'Yes' : 'No'}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>
                                    <Crud
                                        key={`edit-${item.id}`}
                                        edit={1}
                                        api={{
                                            update: async (id, data) => {
                                                await Api.update(id, data);
                                                handleRefresh();
                                            }
                                        }}
                                        type={type}
                                        initialData={item}
                                    />

                                    <Box mt={1}>
                                        <DeleteButton
                                            id={item.id}
                                            api={{
                                                delete: async (id) => {
                                                    await Api.delete(id);
                                                    handleRefresh();
                                                }
                                            }}
                                            label="Xoá"
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SongTable;
