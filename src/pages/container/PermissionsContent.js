import React from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { adminTableContainerSx, adminTableSx } from "./adminUiTokens";

const roleMatrix = [
  { role: "ROLE_ADMIN", reports: "Toàn quyền", artistRequests: "Toàn quyền", songs: "CRUD" },
  { role: "ROLE_AUTHOR", reports: "Xem", artistRequests: "Không", songs: "CRUD của mình" },
  { role: "ROLE_USER", reports: "Gửi báo cáo", artistRequests: "Gửi đăng ký", songs: "Không" },
];

function PermissionsContent() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Quyền và vai trò
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Ma trận quyền cơ bản cho hệ thống quản trị.
      </Typography>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={adminTableContainerSx}
      >
        <Table sx={{ ...adminTableSx, minWidth: 760 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Báo cáo</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Đăng ký tác giả</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Quản lý bài hát</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleMatrix.map((item) => (
              <TableRow key={item.role}>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.reports}</TableCell>
                <TableCell>{item.artistRequests}</TableCell>
                <TableCell>{item.songs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PermissionsContent;

