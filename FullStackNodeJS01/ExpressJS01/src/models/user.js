const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
}, {
    timestamps: true, // tự động tạo createdAt và updatedAt
});

// document
const User = mongoose.model('user', userSchema);

module.exports = User;