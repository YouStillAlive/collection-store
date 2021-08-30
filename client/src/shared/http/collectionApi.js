import { $authHost, $host } from "./index";

export const add = async (name, description, userId) => {
    await $authHost.post('api/collection/add', { name, description, userId });
}

export const read = async (id) => {
    const { data } = await $host.post('api/collection/read', { id });
    return data;
}

export const userCollection = async (id) => {
    const { data } = await $host.post('api/collection/usercollection', { id });
    return data;
}

export const getAll = async () => {
    const { data } = await $host.get('api/collection/collections');
    return data;
}

export const deleteCollection = async (id) => {
    await $authHost.post('api/collection/delete', { id });
}

export const update = async (id, name, description) => {
    await $authHost.post('api/collection/update', { id, name, description });
}