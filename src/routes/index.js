const publicRoutes = [
  // CÁCH LIÊN KẾT CỦA NÓ CHỈ CẦN IMPORT VÀ QUA APP.JS MÌNH THÊM GIỮA CÁI  const Page = route.component;
  // return <Route key={index} path={route.path} element={<Page />}
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
// sau đó import defallayout này vào App.js chính
