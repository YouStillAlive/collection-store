import { $authHost, $host } from "./index";

export const add = async (name, description, collectionId) => {
    await $authHost.post('api/item/add', { name, description, collectionId });
}

export const read = async (id) => {
    const { data } = await $host.get('api/item/read', { id });
    return data;
}

export const getAll = async () => {
    const { data } = await $host.get('api/item/items');
    return data;
}

export const deleteCollection = async (id) => {
    await $authHost.post('api/item/delete', { id });
}

export const update = async (id, name, description) => {
    await $authHost.post('api/item/update', { id, name, description });
}