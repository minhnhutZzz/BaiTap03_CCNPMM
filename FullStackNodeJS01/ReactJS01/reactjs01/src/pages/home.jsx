import { CrownOutlined, SafetyCertificateOutlined, RocketOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container mt-5">
            {/* Jumbotron / Hero Section */}
            <div className="p-5 mb-4 bg-white rounded-4 shadow-sm border">
                <div className="container-fluid py-5 text-center">
                    <CrownOutlined style={{ fontSize: 60, color: '#667eea', marginBottom: 20 }} />
                    <h1 className="display-5 fw-bold text-dark">Hệ Thống Quản Lý Người Dùng</h1>
                    <p className="col-md-8 mx-auto fs-5 text-muted mt-3">
                        Dự án Fullstack hoàn chỉnh kết nối giữa ReactJS (Frontend) và Express.js (Backend).
                        Tích hợp đầy đủ tính năng xác thực bảo mật chuẩn JSON Web Token (JWT), quản lý dữ liệu với MongoDB.
                    </p>
                    <div className="mt-4">
                        <Link to="/login" className="btn btn-primary btn-lg px-4 me-3" style={{ background: '#667eea', border: 'none' }}>
                            Trải nghiệm ngay
                        </Link>
                        <a href="https://iotstar.vn" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-lg px-4">
                            Tìm hiểu thêm
                        </a>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="row align-items-md-stretch mt-4">
                <div className="col-md-6 mb-4">
                    <div className="h-100 p-5 text-white bg-dark rounded-4 shadow">
                        <h2><SafetyCertificateOutlined className="me-2" /> Bảo mật tuyệt đối</h2>
                        <p className="mt-3 text-light">
                            Hệ thống sử dụng cơ chế mã hóa mật khẩu một chiều bcrypt kết hợp với phân quyền bằng JWT (JSON Web Token). Mỗi phiên đăng nhập được bảo vệ và theo dõi chặt chẽ.
                        </p>
                        <button className="btn btn-outline-light mt-2" type="button">Xem kiến trúc</button>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="h-100 p-5 bg-white border rounded-4 shadow-sm">
                        <h2 className="text-dark"><RocketOutlined className="me-2 text-primary" /> Hiệu năng cao</h2>
                        <p className="mt-3 text-muted">
                            Giao diện được xây dựng bằng ReactJS kết hợp Vite mang lại tốc độ render siêu tốc. Cấu trúc component linh hoạt cùng Ant Design và Bootstrap chuẩn chuyên nghiệp.
                        </p>
                        <button className="btn btn-outline-primary mt-2" type="button" style={{ borderColor: '#667eea', color: '#667eea' }}>Khám phá source code</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;