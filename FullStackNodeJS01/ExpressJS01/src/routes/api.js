const express = require('express');
const { createUser, handleLogin, getUser,
    getAccount, updateUser, deleteUser
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

routerAPI.use(auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.put("/user/:id", updateUser);
routerAPI.delete("/user/:id", deleteUser);
routerAPI.get("/account", delay, getAccount);

module.exports = routerAPI; // export default