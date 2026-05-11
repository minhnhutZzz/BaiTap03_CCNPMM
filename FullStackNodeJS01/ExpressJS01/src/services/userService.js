require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// Hàm tạo người dùng mới (Đăng ký)
const createUserService = async (name, email, password, phone, address) => {
    try {
        // check user exist
        const user = await User.findOne({ email });
        if (user) {
            console.log(`>>> user exist, chọn 1 email khác: ${email}`);
            return null;
        }

        // hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
            address: address,
            role: "User"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

// Hàm xử lý đăng nhập
const loginService = async (email1, password) => {
    try {
        // fetch user by email
        const user = await User.findOne({ email: email1 });
        if (user) {
            // compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            } else {
                // create an access token
                const payload = {
                    email: user.email,
                    name: user.name
                }

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Hàm lấy danh sách tất cả người dùng (Có tìm kiếm)
const getUserService = async (search) => {
    try {
        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            };
        }
        let result = await User.find(query).select("-password").sort({ createdAt: -1 });
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

// Hàm cập nhật thông tin người dùng
const updateUserService = async (id, name, phone, address) => {
    try {
        let result = await User.findByIdAndUpdate(id, { name, phone, address }, { new: true });
        return { EC: 0, data: result, EM: "Cập nhật thành công" };
    } catch (error) {
        console.log(error);
        return { EC: 1, EM: error.message };
    }
}

// Hàm xóa người dùng
const deleteUserService = async (id) => {
    try {
        let result = await User.findByIdAndDelete(id);
        return { EC: 0, data: result, EM: "Xóa thành công" };
    } catch (error) {
        console.log(error);
        return { EC: 1, EM: error.message };
    }
}

module.exports = {
    createUserService,
    loginService,
    getUserService,
    updateUserService,
    deleteUserService
}