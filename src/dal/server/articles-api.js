import axiosInstance from "./server-api";

export const getAllArticles = () => {
    return axiosInstance.get('articles');
}

export const getArticle = (articleId) => {
    return axiosInstance.get(`articles/${articleId}`);
}

export const createArticle = (name, description, authorsId) => {
    return axiosInstance.post('articles', {description, name, authorsId});
}

export const updateArticle = (articleId, name, description, authorsId) => {
    return axiosInstance.put(`articles/${articleId}`, {description, name, authorsId});
}

export const deleteArticle = (articleId) => {
    return axiosInstance.delete(`articles/${articleId}`);
}