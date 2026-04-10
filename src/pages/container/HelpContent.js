import React from "react";
import { Alert, Box, Paper, Stack, Typography } from "@mui/material";

const helpItems = [
	{
		title: "Quản lý bài hát",
		content:
			"Vào mục Bài hát để tạo mới, chỉnh sửa metadata, cập nhật lyric và kiểm tra trạng thái hiển thị.",
	},
	{
		title: "Kiểm duyệt báo cáo",
		content:
			"Mục Báo cáo cho phép lọc theo trạng thái, duyệt hoặc từ chối report bài hát/bình luận.",
	},
	{
		title: "Duyệt tác giả",
		content:
			"Mục Duyệt tác giả xử lý các yêu cầu nâng cấp quyền từ người dùng thông thường lên tác giả.",
	},
];

function HelpContent() {
	return (
		<Box>
			<Typography variant="h4" fontWeight={700} mb={1}>
				Trợ giúp nhanh
			</Typography>
			<Typography color="text.secondary" mb={2}>
				Hướng dẫn thao tác các khu vực quan trọng trong trang quản trị.
			</Typography>

			<Alert severity="info" sx={{ mb: 2 }}>
				Nếu gặp lỗi API, hãy kiểm tra token đăng nhập và trạng thái backend
				trước khi thao tác lại.
			</Alert>

			<Stack spacing={1.5}>
				{helpItems.map((item) => (
					<Paper key={item.title} variant="outlined" sx={{ p: 2 }}>
						<Typography fontWeight={700}>{item.title}</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ mt: 0.5 }}
						>
							{item.content}
						</Typography>
					</Paper>
				))}
			</Stack>
		</Box>
	);
}

export default HelpContent;

