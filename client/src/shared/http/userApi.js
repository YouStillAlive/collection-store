import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
import localStorageKeys from '../constants/localStorageKeys.js';

export const registration = async (name, email, password) => {
    try {
        await $host.post('api/user/registration', { name, email, password });
    } catch (e) {
        console.log(e);
    }
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem(localStorageKeys.TOKEN, data.token);
    return jwt_decode(data.token);
}

export const check = async () => {
    try {
        if (localStorage.getItem(localStorageKeys.TOKEN) !== null) {
            const { data } = await $authHost.get('api/user/auth');
            localStorage.setItem(localStorageKeys.TOKEN, data.token);
            return jwt_decode(data.token);
        }
    } catch (e) {
        console.log(e);
    }
}

export const getUsers = async () => {
    const { data } = await $authHost.get('api/user/users');
    return data;
}

export const deleteUsers = async (id) => {
    try {
        await $authHost.post('api/user/delete', { id });
    } catch (e) {
        console.log(e);
    }
}

export const blockUsers = async (id, block) => {
    try {
        await $authHost.post('api/user/block', { id, block });
    } catch (e) {
        console.log(e);
    }
}

export const changeRole = async (id, role) => {
    try {
        await $authHost.post('api/user/role', { id, role });
    } catch (e) {
        console.log(e);
    }
}