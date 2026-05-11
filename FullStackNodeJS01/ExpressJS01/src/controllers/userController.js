const { createUserService, loginService, getUserService, updateUserService, deleteUserService } = require("../services/userService");

const createUser = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const data = await createUserService(name, email, password, phone, address);
    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);

    return res.status(200).json(data)
}

const getUser = async (req, res) => {
    const search = req.query.search;
    const data = await getUserService(search);
    return res.status(200).json(data)
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, phone, address } = req.body;
    const data = await updateUserService(id, name, phone, address);
    return res.status(200).json(data);
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const data = await deleteUserService(id);
    return res.status(200).json(data);
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user)
}

module.exports = {
    createUser, handleLogin, getUser, getAccount, updateUser, deleteUser
}