# Profile/Admin UI Responsive Checklist

Mục tiêu: khóa UI trước khi commit, tránh vỡ cột khi đổi tab và giữ nền dark đồng nhất.

## Breakpoints cần test

- Desktop: >= 1200px
- Tablet: 900px - 1199px
- Mobile: <= 899px

## Checklist theo từng breakpoint

### 1) Desktop (>= 1200px)

- [ ] Trang `/Profile/*`: cột nội dung chính không nhỏ hơn `760px`.
- [ ] Trang `/Profile/*`: cột sidebar không nhỏ hơn `320px`.
- [ ] Trang `/admin/*`: bảng quản lý không bị out nền, nền dark nhất quán với panel.
- [ ] Trang `/admin/*`: header + chip role thẳng hàng, không tràn khung.
- [ ] Chuyển tab có animation nhẹ, không giật layout.

### 2) Tablet (900px - 1199px)

- [ ] Hai cột vẫn đọc tốt, không vỡ chữ hoặc tràn card.
- [ ] Tab/nav xuống dòng tự nhiên, không chồng nhau.
- [ ] Sidebar không ép nhỏ content khi đổi tab trong admin.
- [ ] Bảng admin có cuộn ngang khi thiếu chỗ, không co cột quá mức.

### 3) Mobile (<= 899px)

- [ ] Layout chuyển về 1 cột hợp lý, các panel có thể cuộn ngang an toàn.
- [ ] Nút/tab bấm dễ, không sát mép màn hình.
- [ ] Nội dung profile (tên, thông tin, card thống kê) không tràn màn.
- [ ] Các bảng admin giữ `min-width`, không bể typography tiếng Việt có dấu.

## Regression cần check nhanh

- [ ] Đổi qua lại: `Maiprofile`, `Contentt_Video`, `upload_proifle`, `Friend_live`.
- [ ] Đổi qua lại profile user và profile tác giả.
- [ ] Đổi qua lại các tab admin: `users`, `reports`, `artistRequests`, `permissions`.
- [ ] Reload trực tiếp từng tab, layout vẫn đúng.
- [ ] Chạy test: `npm run test -- --watchAll=false`.

