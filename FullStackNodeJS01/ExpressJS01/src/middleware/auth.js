require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = ["/", "/register", "/login"];
    // Nếu request url nằm trong danh sách trắng, bỏ qua xác thực token
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        next();
        return;
    }

    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                email: decoded.email,
                name: decoded.name
            }
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Token bị hết hạn hoặc không hợp lệ"
            })
        }
    } else {
        return res.status(401).json({
            message: "Bạn chưa truyền Access Token ở Header hoặc token không hợp lệ"
        })
    }
}

module.exports = auth;
