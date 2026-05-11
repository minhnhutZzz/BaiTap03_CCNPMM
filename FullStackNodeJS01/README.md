# Hệ Thống Quản Lý Người Dùng (Fullstack MERN)

Dự án bài tập môn **Các Công Nghệ Phần Mềm Mới**, xây dựng một ứng dụng Full-stack hoàn chỉnh bao gồm Frontend (ReactJS) và Backend (Node.js/Express) với cơ sở dữ liệu MongoDB.

## 🚀 Các Tính Năng Nổi Bật (Features)

### 1. Authentication & Security (Bảo mật)
- **Đăng ký / Đăng nhập:** Hệ thống xác thực người dùng an toàn.
- **Mã hóa Mật khẩu:** Sử dụng `bcrypt` mã hóa mật khẩu một chiều trước khi lưu vào Database.
- **Bảo vệ API bằng JWT:** Các endpoint bảo mật yêu cầu phải có Access Token (JSON Web Token).
- **Axios Interceptor:** Tự động đính kèm Token vào Header của mọi request gửi đi từ Frontend.

### 2. Full-Stack CRUD & Quản Lý Dữ Liệu
- Đầy đủ các thao tác: Thêm (Register), Xem (Bảng danh sách), Sửa (Cập nhật thông tin), Xóa (Xóa tài khoản).
- Bổ sung chức năng **Tìm kiếm (Search)** dữ liệu bằng Regex trên MongoDB (tìm theo tên hoặc email).
- Hiển thị dữ liệu được phân trang (Pagination) mượt mà.

### 3. Giao diện Hiện Đại (UI/UX)
- Tích hợp **Bootstrap 5** cho Landing Page (Jumbotron, Grid Layout) trông cực kỳ chuyên nghiệp.
- Ứng dụng **Ant Design (antd)** cho các component (Table, Form, Modal, Popconfirm).
- Sử dụng hiệu ứng **Glassmorphism** (backdrop-filter) và **Custom CSS** ghi đè theme mặc định giúp giao diện nổi bật, mang lại cảm giác xịn sò như sản phẩm thương mại.
- **Context API:** Quản lý trạng thái đăng nhập toàn cục, giao diện Header tự động cập nhật ẩn/hiện nút Đăng nhập/Đăng xuất theo trạng thái.

---

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

**Frontend:**
- React (Vite - swc)
- React Router DOM
- Axios
- Ant Design & Bootstrap 5

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Bcrypt

---

## ⚙️ Hướng Dẫn Cài Đặt & Khởi Chạy

Dự án được chia làm 2 thư mục độc lập. Bạn cần mở **2 cửa sổ Terminal** để chạy song song.

### Bước 1: Khởi động Backend
Mở terminal và di chuyển vào thư mục Backend:
```bash
cd ExpressJS01
npm install
npm run dev
```
*(Backend sẽ khởi chạy tại `http://localhost:8080`)*

### Bước 2: Khởi động Frontend
Mở một terminal mới và di chuyển vào thư mục Frontend:
```bash
cd ReactJS01/reactjs01
npm install
npm run dev
```
*(Frontend sẽ khởi chạy tại `http://localhost:5173`)*

---

## 👥 Tài Khoản Test (Seeding Data)
Database đã được viết script tự động thêm sẵn 15 dữ liệu mẫu để test phân trang. Bạn có thể sử dụng thông tin sau để đăng nhập trải nghiệm ngay:
- **Email:** `test@test.com` (hoặc `user1@example.com` đến `user15@example.com`)
- **Mật khẩu:** `123` (hoặc `123456` với các user example)

> **Lưu ý:** Cần cấu hình file `.env` ở cả hai thư mục (ví dụ `MONGO_DB_URL`, `JWT_SECRET` ở Backend và `VITE_BACKEND_URL` ở Frontend) trước khi chạy.
