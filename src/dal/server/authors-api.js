import axios from "axios";
import { BASE_URL } from "./server-api";

export const getAllAuthors = async() => {
    return await axios.get(`${BASE_URL}/authors`);
}

export const getAuthors = async(authorId) => {
    return await axios.get(`${BASE_URL}/authors/${authorId}`);
}

export const createAuthors = async(name) => {
    return await axios.post(`${BASE_URL}/authors`, {name});
}

export const updateAuthors = async(authorId, name) => {
    return await axios.put(`${BASE_URL}/authors/${authorId}`, {name});
}

export const deleteAuthors = async(authorId) => {
    return await axios.delete(`${BASE_URL}/authors/${authorId}`);
}

export const addArticleToAuthor = async(authorId, id) => {
    return await axios.post(`${BASE_URL}/authors/${authorId}/article`, {id});
}

export const deleteArticleFromAuthor = async(authorId, id) => {
    return await axios.delete(`${BASE_URL}/authors/${authorId}/article`, {
      data: {id: id}
    });
}
