import axios from "axios";
import { BASE_URL } from "./server-api";

export const getAllArticles = async() => {
    return await axios.get(`${BASE_URL}/articles`);
}

export const getArticle = async(articleId) => {
    return await axios.get(`${BASE_URL}/articles/${articleId}`);
}

export const createArticle = async(name, description, authorsId) => {
    return await axios.post(`${BASE_URL}/articles`, {description, name, authorsId});
}

export const updateArticle = async(articleId, name, description) => {
    return await axios.put(`${BASE_URL}/articles/${articleId}`, {description, name});
}

export const deleteArticle = async(articleId) => {
    return await axios.delete(`${BASE_URL}/articles/${articleId}`);
}