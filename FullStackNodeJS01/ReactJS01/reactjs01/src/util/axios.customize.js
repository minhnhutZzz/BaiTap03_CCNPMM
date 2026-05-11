import axios from "axios";

// Thiết lập cấu hình mặc định khi tạo instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// Thay đổi các thiết lập mặc định sau khi instance đã được tạo
// Thêm một bộ đánh chặn request (Request Interceptor)
instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request được gửi đi
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return config;
}, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
});

// Thêm một bộ đánh chặn response (Response Interceptor)
instance.interceptors.response.use(function (response) {
    // Bất kỳ mã trạng thái nào nằm trong khoảng 2xx đều khiến hàm này được kích hoạt
    // Làm gì đó với dữ liệu response
    if (response && response.data) return response.data;
    return response;
}, function (error) {
    // Bất kỳ mã trạng thái nào nằm ngoài khoảng 2xx đều khiến hàm này được kích hoạt
    // Làm gì đó với lỗi response
    if (error?.response?.data) return error?.response?.data;
    return Promise.reject(error);
});

export default instance;