require("dotenv").config();
const mongoose = require('mongoose');
const User = require('./src/models/user');
const bcrypt = require('bcrypt');

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('Connected to MongoDB');

        const saltRounds = 10;
        const users = [];

        for (let i = 1; i <= 15; i++) {
            users.push({
                name: `Người dùng ${i}`,
                email: `user${i}@example.com`,
                password: await bcrypt.hash('123456', saltRounds),
                phone: `09012345${i < 10 ? '0' + i : i}`,
                address: `Số ${i} Đường ABC, TP. HCM`,
                role: "User"
            });
        }

        await User.insertMany(users);
        console.log('Đã thêm thành công 15 người dùng giả lập!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedUsers();
