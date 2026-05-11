import axios from './axios.customize';

const createUserApi = (name, email, password, phone, address) => {
    const URL_API = "/v1/api/register";
    const data = {
        name, email, password, phone, address
    }
    return axios.post(URL_API, data)
}

const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email, password
    }
    return axios.post(URL_API, data)
}

const getUserApi = (search) => {
    let URL_API = "/v1/api/user";
    if (search) {
        URL_API += `?search=${search}`;
    }
    return axios.get(URL_API)
}

const updateUserApi = (id, name, phone, address) => {
    const URL_API = `/v1/api/user/${id}`;
    const data = {
        name, phone, address
    }
    return axios.put(URL_API, data)
}

const deleteUserApi = (id) => {
    const URL_API = `/v1/api/user/${id}`;
    return axios.delete(URL_API)
}

export {
    createUserApi, loginApi, getUserApi, updateUserApi, deleteUserApi
}