import React from "react";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

const settingRows = [
  { label: "Giao diện", value: "Dark admin theme" },
  { label: "Ngôn ngữ", value: "Tiếng Việt" },
  { label: "Múi giờ", value: "Asia/Ho_Chi_Minh" },
  { label: "Thông báo", value: "Bật" },
];

function SettingsContent() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Cài đặt hệ thống
      </Typography>
      <Typography color="text.secondary" mb={2}>
        Khu vực hiển thị thông số cấu hình và trạng thái vận hành của giao diện quản trị.
      </Typography>

      <Stack direction="row" spacing={1} mb={2}>
        <Chip label="UI v2" color="info" />
        <Chip label="Security mode" color="success" />
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1.2}>
          {settingRows.map((row) => (
            <Box key={row.label} display="flex" justifyContent="space-between" gap={1.5}>
              <Typography color="text.secondary">{row.label}</Typography>
              <Typography fontWeight={600}>{row.value}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default SettingsContent;

